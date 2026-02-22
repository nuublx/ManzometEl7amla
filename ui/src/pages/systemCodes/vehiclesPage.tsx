import { MasterDataPage } from './MasterDataPage'
import { vehiclesActions } from '../../store/vehicles/vehiclesSlice'
import type { RootState } from '../../store/store'

export const VehiclesPage = () => (
  <MasterDataPage
    title="بيانات العربات"
    entityTitle="بيانات العربات - الناقلات - المعدات"
    codeLabel="كود العربة"
    nameLabel="اسم العربة"
    secondaryLabel="نوع المعدة"
    selector={(state: RootState) => state.vehicles}
    actions={vehiclesActions}
  />
)
