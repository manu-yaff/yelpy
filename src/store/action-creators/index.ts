import { Dispatch } from "redux"
import { Business } from "../../types/Business";
import { Action, BusinessAction } from '../reducers/Reducer'

export const deposit = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "deposit",
      payload: amount
    })
  }
};

export const withdraw = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "withdraw",
      payload: amount
    })
  }
};

export const visitBusiness = (business: Business) => {
  return (dispatch: Dispatch<BusinessAction>) => {
    dispatch({
      type: "visit-business",
      payload: business
    });
  };
};