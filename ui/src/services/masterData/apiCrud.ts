import { apiClient } from '../apiClient'

export type MasterDataItem = {
  id: number
  code: string
  name: string
  secondary?: string
}

type SavePayload = Omit<MasterDataItem, 'id'> & { id?: number }

type NamedEntityResponse = {
  id: number
  name: string
}

type VehicleResponse = {
  id: number
  name: string
  type: string
}

type CampaignThingResponse = {
  id: number
  name: string
  campaignId: number
}

const normalizeError = async (response: Response) => {
  try {
    const data = await response.json()
    return data?.message ?? 'Operation failed'
  } catch {
    return 'Operation failed'
  }
}

const sortByCode = (items: MasterDataItem[]) =>
  [...items].sort((a, b) => a.code.localeCompare(b.code, 'ar'))

export const createNamedEntityApiService = (endpoint: string) => {
  const list = async (): Promise<MasterDataItem[]> => {
    const response = await apiClient(endpoint)
    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    const data = (await response.json()) as NamedEntityResponse[]
    return sortByCode(
      data.map((item) => ({
        id: item.id,
        code: String(item.id),
        name: item.name,
      })),
    )
  }

  const save = async (payload: SavePayload): Promise<MasterDataItem[]> => {
    const body = { name: payload.name.trim() }
    const isUpdate = typeof payload.id === 'number'

    const response = await apiClient(
      isUpdate ? `${endpoint}/${payload.id}` : endpoint,
      body,
      { method: isUpdate ? 'PUT' : 'POST' },
    )

    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    return list()
  }

  return { list, save }
}

export const createVehicleApiService = (endpoint: string) => {
  const list = async (): Promise<MasterDataItem[]> => {
    const response = await apiClient(endpoint)
    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    const data = (await response.json()) as VehicleResponse[]
    return sortByCode(
      data.map((item) => ({
        id: item.id,
        code: String(item.id),
        name: item.name,
        secondary: item.type,
      })),
    )
  }

  const save = async (payload: SavePayload): Promise<MasterDataItem[]> => {
    const body = {
      name: payload.name.trim(),
      type: payload.secondary?.trim() ?? '',
    }
    const isUpdate = typeof payload.id === 'number'

    const response = await apiClient(
      isUpdate ? `${endpoint}/${payload.id}` : endpoint,
      body,
      { method: isUpdate ? 'PUT' : 'POST' },
    )

    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    return list()
  }

  return { list, save }
}

export const createCampaignThingsApiService = (endpoint: string) => {
  const list = async (): Promise<MasterDataItem[]> => {
    const response = await apiClient(endpoint)
    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    const data = (await response.json()) as CampaignThingResponse[]
    return sortByCode(
      data.map((item) => ({
        id: item.id,
        code: String(item.id),
        name: item.name,
        secondary: String(item.campaignId),
      })),
    )
  }

  const save = async (payload: SavePayload): Promise<MasterDataItem[]> => {
    const campaignId = Number(payload.secondary)
    if (!Number.isInteger(campaignId) || campaignId <= 0) {
      throw new Error('يرجى إدخال كود نوع الحملة كرقم صحيح أكبر من صفر')
    }

    const body = {
      name: payload.name.trim(),
      campaignId,
    }
    const isUpdate = typeof payload.id === 'number'

    const response = await apiClient(
      isUpdate ? `${endpoint}/${payload.id}` : endpoint,
      body,
      { method: isUpdate ? 'PUT' : 'POST' },
    )

    if (!response.ok) {
      throw new Error(await normalizeError(response))
    }

    return list()
  }

  return { list, save }
}
