import { MasterDataPage } from './MasterDataPage'
import { missionsActions } from '../../store/missions/missionsSlice'
import type { RootState } from '../../store/store'

export const MissionsPage = () => (
  <MasterDataPage
    title="المأموريات"
    entityTitle="المأموريات"
    codeLabel="كود المأمورية"
    nameLabel="المأمورية"
    selector={(state: RootState) => state.missions}
    actions={missionsActions}
  />
)
