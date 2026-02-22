import { armedForcesEntitiesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'armedForcesEntities', service: armedForcesEntitiesService })

export const armedForcesEntitiesActions = { ...slice.actions, ...thunks }
export default slice.reducer
