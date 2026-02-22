import { cargoTypesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'cargoTypes', service: cargoTypesService })

export const cargoTypesActions = { ...slice.actions, ...thunks }
export default slice.reducer
