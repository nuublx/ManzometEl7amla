import { vehiclesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'vehicles', service: vehiclesService })

export const vehiclesActions = { ...slice.actions, ...thunks }
export default slice.reducer
