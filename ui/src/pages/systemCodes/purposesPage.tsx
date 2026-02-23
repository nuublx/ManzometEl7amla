import { MasterDataPage } from './MasterDataPage'
import { purposesActions } from '../../store/purposes/purposesSlice'
import type { RootState } from '../../store/store'

export const PurposesPage = () => (
  <MasterDataPage
    title="الأغراض"
    entityTitle="أغراض الحملة"
    codeLabel="كود الغرض"
    nameLabel="الغرض"
    secondaryLabel="كود نوع الحملة"
    selector={(state: RootState) => state.purposes}
    actions={purposesActions}
  />
)
