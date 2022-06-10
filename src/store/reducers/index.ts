import { combineReducers } from "redux";
import { businessSeenReducer, businessSaveReducer } from './businessReducer'

const reducers = combineReducers({
  saveBusinessList: businessSaveReducer,
  seenBusiness: businessSeenReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>