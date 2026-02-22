export type MasterDataItem = {
  id: number
  code: string
  name: string
  secondary?: string
}

type SavePayload = Omit<MasterDataItem, 'id'> & { id?: number }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const loadItems = (storageKey: string): MasterDataItem[] => {
  const raw = localStorage.getItem(storageKey)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as MasterDataItem[]
    return parsed.sort((a, b) => a.code.localeCompare(b.code, 'ar'))
  } catch {
    return []
  }
}

const storeItems = (storageKey: string, items: MasterDataItem[]) => {
  localStorage.setItem(storageKey, JSON.stringify(items))
}

export const createLocalStorageCrudService = (storageKey: string) => ({
  async list() {
    await wait(100)
    return loadItems(storageKey)
  },
  async save(payload: SavePayload) {
    await wait(100)
    const items = loadItems(storageKey)

    const newItem: MasterDataItem = {
      id: payload.id ?? Date.now(),
      code: payload.code.trim(),
      name: payload.name.trim(),
      secondary: payload.secondary?.trim() || undefined,
    }

    const existingIndex = items.findIndex((item) => item.id === newItem.id || item.code === newItem.code)
    if (existingIndex >= 0) {
      items[existingIndex] = newItem
    } else {
      items.push(newItem)
    }

    const sorted = items.sort((a, b) => a.code.localeCompare(b.code, 'ar'))
    storeItems(storageKey, sorted)
    return sorted
  },
})
