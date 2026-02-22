import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MasterDataItem } from '../../services/masterData/localStorageCrud'

type CrudService = {
  list: () => Promise<MasterDataItem[]>
  save: (payload: Omit<MasterDataItem, 'id'> & { id?: number }) => Promise<MasterDataItem[]>
}

export type MasterDataState = {
  items: MasterDataItem[]
  selectedIndex: number
  draft: {
    code: string
    name: string
    secondary: string
  }
  loading: boolean
  error?: string
}

const initialState: MasterDataState = {
  items: [],
  selectedIndex: -1,
  draft: { code: '', name: '', secondary: '' },
  loading: false,
}

type FactoryArgs = {
  name: string
  service: CrudService
}

export const createMasterDataSlice = ({ name, service }: FactoryArgs) => {
  const load = createAsyncThunk(`${name}/load`, async () => service.list())
  const save = createAsyncThunk(`${name}/save`, async (_, thunkApi) => {
    const state = thunkApi.getState() as { [key: string]: MasterDataState }
    const feature = state[name]

    if (!feature.draft.code.trim() || !feature.draft.name.trim()) {
      throw new Error('يرجى إدخال الكود والاسم')
    }

    return service.save({
      id: feature.items[feature.selectedIndex]?.id,
      code: feature.draft.code,
      name: feature.draft.name,
      secondary: feature.draft.secondary,
    })
  })

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setDraftField: (state, action: PayloadAction<{ field: 'code' | 'name' | 'secondary'; value: string }>) => {
        state.draft[action.payload.field] = action.payload.value
      },
      newRecord: (state) => {
        state.selectedIndex = -1
        state.draft = { code: '', name: '', secondary: '' }
      },
      nextRecord: (state) => {
        if (!state.items.length) return
        const nextIndex = state.selectedIndex + 1 >= state.items.length ? 0 : state.selectedIndex + 1
        state.selectedIndex = nextIndex
        state.draft = {
          code: state.items[nextIndex].code,
          name: state.items[nextIndex].name,
          secondary: state.items[nextIndex].secondary ?? '',
        }
      },
      prevRecord: (state) => {
        if (!state.items.length) return
        const prevIndex = state.selectedIndex <= 0 ? state.items.length - 1 : state.selectedIndex - 1
        state.selectedIndex = prevIndex
        state.draft = {
          code: state.items[prevIndex].code,
          name: state.items[prevIndex].name,
          secondary: state.items[prevIndex].secondary ?? '',
        }
      },
      searchByCode: (state, action: PayloadAction<string>) => {
        const code = action.payload.trim()
        const index = state.items.findIndex((item) => item.code === code)
        if (index >= 0) {
          state.selectedIndex = index
          state.draft = {
            code: state.items[index].code,
            name: state.items[index].name,
            secondary: state.items[index].secondary ?? '',
          }
          state.error = undefined
        } else {
          state.error = 'لم يتم العثور على السجل'
        }
      },
      clearError: (state) => {
        state.error = undefined
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(load.pending, (state) => {
          state.loading = true
          state.error = undefined
        })
        .addCase(load.fulfilled, (state, action) => {
          state.loading = false
          state.items = action.payload
          if (action.payload.length > 0 && state.selectedIndex === -1) {
            state.selectedIndex = 0
            state.draft = {
              code: action.payload[0].code,
              name: action.payload[0].name,
              secondary: action.payload[0].secondary ?? '',
            }
          }
        })
        .addCase(load.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message
        })
        .addCase(save.pending, (state) => {
          state.loading = true
          state.error = undefined
        })
        .addCase(save.fulfilled, (state, action) => {
          state.loading = false
          state.items = action.payload
          const index = state.items.findIndex((item) => item.code === state.draft.code)
          state.selectedIndex = index
        })
        .addCase(save.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message
        })
    },
  })

  return {
    slice,
    thunks: { load, save },
  }
}
