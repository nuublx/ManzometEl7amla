import { campaignTypesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'campaignTypes', service: campaignTypesService })

export const campaignTypesActions = { ...slice.actions, ...thunks }
export default slice.reducer
