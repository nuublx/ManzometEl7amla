import { missionsService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'missions', service: missionsService })

export const missionsActions = { ...slice.actions, ...thunks }
export default slice.reducer
