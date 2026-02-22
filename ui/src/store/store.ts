import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import cargoTypesReducer from './cargoTypes/cargoTypesSlice'
import campaignTypesReducer from './campaignTypes/campaignTypesSlice'
import vehiclesReducer from './vehicles/vehiclesSlice'
import armedForcesEntitiesReducer from './armedForcesEntities/armedForcesEntitiesSlice'
import beneficiariesReducer from './beneficiaries/beneficiariesSlice'
import transportUnitsReducer from './transportUnits/transportUnitsSlice'
import purposesReducer from './purposes/purposesSlice'
import missionsReducer from './missions/missionsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cargoTypes: cargoTypesReducer,
    campaignTypes: campaignTypesReducer,
    vehicles: vehiclesReducer,
    armedForcesEntities: armedForcesEntitiesReducer,
    beneficiaries: beneficiariesReducer,
    transportUnits: transportUnitsReducer,
    purposes: purposesReducer,
    missions: missionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
