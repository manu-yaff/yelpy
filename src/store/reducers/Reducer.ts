import { Business } from "../../types/Business";
const initialState = 0;

export interface Action {
  type: string;
  payload: number;
}

export const reducer = (state: number = initialState, action: Action) => {
  switch (action.type) {
    case "deposit":
      return state + action.payload;
    case "withdraw":
      return state - action.payload;
    default:
      return state;

  }
}


//////// The real state managment //////

interface BusinessState {
  currentSearch: Business[],
  seenBusinesses: Business[]
}


export interface BusinessAction {
  type: string;
  payload: Business;
}

const initialList: Business[] = [
  {
    id: "123456789",
    photos: "string",
    name: "Tacos Pampas",
    location: {},
    review_count: 100,
    display_phone: "string",
    hasBeenSeen: false
  }
];

export const visitedBusinessReducer = (state: Business[] = initialList, action: BusinessAction): Business[] => {
  switch (action.type) {
    case "visit-business":
      return [...state, action.payload];
    default:
      return state;
  }
}
