import { BusinessState, SaveBusinessAction, SeeBusinessAction } from "../../types/Business";

const initialList: BusinessState = {
  currentSearch: [],
  seenBusinesses: []
}

export const businessSaveReducer = (state: BusinessState = initialList, action: SaveBusinessAction): BusinessState => {
  switch (action.type) {
    case "save-business-list":
      return {
        currentSearch: action.payload,
        seenBusinesses: state.seenBusinesses
      };
    default:
      return state;
  }
}

export const businessSeenReducer = (state: BusinessState = initialList, action: SeeBusinessAction): BusinessState => {
  switch (action.type) {
    case "visit-business":
      return {
        currentSearch: [],
        seenBusinesses: [...state.seenBusinesses, { ...action.payload, hasBeenSeen: true }]
      }
    default:
      return state;      
  }
}
