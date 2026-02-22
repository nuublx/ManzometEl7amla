import { MasterDataPage } from './MasterDataPage'
import { beneficiariesActions } from '../../store/beneficiaries/beneficiariesSlice'
import type { RootState } from '../../store/store'

export const BeneficiariesPage = () => (
  <MasterDataPage
    title="الجهات المستفيدة"
    entityTitle="الجهات المستفيدة"
    codeLabel="كود الجهة"
    nameLabel="الجهة"
    selector={(state: RootState) => state.beneficiaries}
    actions={beneficiariesActions}
  />
)
