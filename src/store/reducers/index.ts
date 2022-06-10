import { combineReducers } from "redux";
import {reducer, visitedBusinessReducer } from './Reducer'

const reducers = combineReducers({
  bank: reducer,
  visitBusiness: visitedBusinessReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>