import { MasterDataPage } from './MasterDataPage'
import { transportUnitsActions } from '../../store/transportUnits/transportUnitsSlice'
import type { RootState } from '../../store/store'

export const TransportUnitsPage = () => (
  <MasterDataPage
    title="وحدات إدارة النقل"
    entityTitle="وحدات إدارة النقل"
    codeLabel="كود الوحدة"
    nameLabel="الوحدة"
    selector={(state: RootState) => state.transportUnits}
    actions={transportUnitsActions}
  />
)
