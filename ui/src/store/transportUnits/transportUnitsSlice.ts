import { transportUnitsService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'transportUnits', service: transportUnitsService })

export const transportUnitsActions = { ...slice.actions, ...thunks }
export default slice.reducer
