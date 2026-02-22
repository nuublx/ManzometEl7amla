import { MasterDataPage } from './MasterDataPage'
import { campaignTypesActions } from '../../store/campaignTypes/campaignTypesSlice'
import type { RootState } from '../../store/store'

export const CampaignTypesPage = () => (
  <MasterDataPage
    title="بيانات نوع الحملة"
    entityTitle="أنواع الحملة"
    codeLabel="كود النوع"
    nameLabel="نوع الحملة"
    selector={(state: RootState) => state.campaignTypes}
    actions={campaignTypesActions}
  />
)
