import './systemCodes.css'
import { useState, type ReactElement } from 'react'
import { CargoTypesPage } from './cargoTypesPage'
import { CampaignTypesPage } from './campaignTypesPage'
import { VehiclesPage } from './vehiclesPage'
import { ArmedForcesEntitiesPage } from './armedForcesEntitiesPage'
import { BeneficiariesPage } from './beneficiariesPage'
import { TransportUnitsPage } from './transportUnitsPage'
import { PurposesPage } from './purposesPage'
import { MissionsPage } from './missionsPage'
import { useNavigate } from 'react-router-dom'

type Screen = {
  id: string
  label: string
  component: ReactElement
}

const screens: Screen[] = [
  { id: 'cargo', label: 'نوع الحمولة', component: <CargoTypesPage /> },
  { id: 'campaign', label: 'نوع الحملة', component: <CampaignTypesPage /> },
  { id: 'vehicles', label: 'أكواد العربات', component: <VehiclesPage /> },
  { id: 'armedForces', label: 'أكواد جهات القوات المسلحة', component: <ArmedForcesEntitiesPage /> },
  { id: 'beneficiaries', label: 'الجهات المستفيدة', component: <BeneficiariesPage /> },
  { id: 'units', label: 'وحدات إدارة النقل', component: <TransportUnitsPage /> },
  { id: 'purposes', label: 'الأغراض', component: <PurposesPage /> },
  { id: 'missions', label: 'المأموريات', component: <MissionsPage /> },
]

export const SystemCodesPage = () => {
  const navigate = useNavigate();
  const [activeScreenId, setActiveScreenId] = useState(screens[0].id)
  const activeScreen = screens.find((screen) => screen.id === activeScreenId) ?? screens[0]

  return (
    <main className="system-codes-layout" dir="rtl">
      <aside className="system-codes-sidebar">
        <h1>أكواد النظام</h1>
        {screens.map((screen) => (
          <button
            key={screen.id}
            className={screen.id === activeScreen.id ? 'active' : ''}
            onClick={() => setActiveScreenId(screen.id)}
          >
            {screen.label}
          </button>
        ))}
        <button
          key={'home-page'}
          className={activeScreen.id === 'home-page' ? 'active' : ''}
          onClick={() => navigate('/Home')}
        >
          الصفحة الرئيسية 
        </button>
      </aside>
      <div>{activeScreen.component}</div>
    </main>
  )
}
