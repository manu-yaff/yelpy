import { Dispatch } from "redux"
import { Business, SaveBusinessAction, SeeBusinessAction } from "../../types/Business";

export const saveBusinessList = (businesses: Business[]) => {
  return (dispatch: Dispatch<SaveBusinessAction>) => {
    dispatch({
      type: "save-business-list",
      payload: businesses
    });
  };
};

export const visitBusiness = (business: Business) => {
  return (dispatch: Dispatch<SeeBusinessAction>) => {
    dispatch({
      type: "visit-business",
      payload: business
    });
  };
};