import { purposesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'purposes', service: purposesService })

export const purposesActions = { ...slice.actions, ...thunks }
export default slice.reducer
