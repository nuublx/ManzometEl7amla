import { MasterDataPage } from './MasterDataPage'
import { armedForcesEntitiesActions } from '../../store/armedForcesEntities/armedForcesEntitiesSlice'
import type { RootState } from '../../store/store'

export const ArmedForcesEntitiesPage = () => (
  <MasterDataPage
    title="جهات القوات المسلحة"
    entityTitle="جهات القوات المسلحة"
    codeLabel="كود الجهة"
    nameLabel="الجهة"
    selector={(state: RootState) => state.armedForcesEntities}
    actions={armedForcesEntitiesActions}
  />
)
