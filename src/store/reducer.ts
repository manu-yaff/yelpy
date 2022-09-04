import { Action } from "../types/Action";
import { BUSINESS_ADDED } from "./actions";

export interface State {
  visitedBusiness: string[],
}

const initialState: State = {
  visitedBusiness: []
}

export const businessHasBeenSeen = (id: string, arr: string[]) => {
  return arr.find((item) => item === id);
}

export const businessReducer = (state: State = initialState, action: Action): State => {
  if (action.type === BUSINESS_ADDED) {
    const result = businessHasBeenSeen(action.payload, state.visitedBusiness);
    if (!result) {
      return { visitedBusiness: [...state.visitedBusiness, action.payload] }
    }
  }
  return state;
}