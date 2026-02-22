import { MasterDataPage } from './MasterDataPage'
import { cargoTypesActions } from '../../store/cargoTypes/cargoTypesSlice'
import type { RootState } from '../../store/store'

export const CargoTypesPage = () => (
  <MasterDataPage
    title="بيانات نوع الحمولة"
    entityTitle="أنواع الحمولات"
    codeLabel="كود النوع"
    nameLabel="نوع الحمولة"
    selector={(state: RootState) => state.cargoTypes}
    actions={cargoTypesActions}
  />
)
