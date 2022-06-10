import { Business, BusinessState, SaveBusinessAction, SeeBusinessAction } from "../../types/Business";

const initialList: BusinessState  = {
  currentSearch: [],
  seenBusinesses: [{
    id: "123456789",
    photos: "string",
    name: "Tacos Pampas",
    location: {},
    review_count: 100,
    display_phone: "string",
    hasBeenSeen: false
  }]
}

export const businessSaveReducer = (state: BusinessState = initialList, action: SaveBusinessAction): BusinessState => {
  switch (action.type) {
    case "save-business-list":
      return {
        currentSearch: action.payload,
        seenBusinesses: []
      };
    default:
      return state
  }
}


export const businessSeenReducer = (state: BusinessState = initialList, action: SeeBusinessAction): BusinessState => {
  switch (action.type) {
    case "visit-business":
      return {
        currentSearch: [],
        seenBusinesses: [...state.seenBusinesses, action.payload]
      };
    default:
      return state
      
  }
}
