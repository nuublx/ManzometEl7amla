import { beneficiariesService } from '../../services'
import { createMasterDataSlice } from '../masterData/createMasterDataSlice'

const { slice, thunks } = createMasterDataSlice({ name: 'beneficiaries', service: beneficiariesService })

export const beneficiariesActions = { ...slice.actions, ...thunks }
export default slice.reducer
