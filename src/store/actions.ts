export const BUSINESS_ADDED = "BUSINESS_ADDED";

export function addBusiness (businessId: string) {
  return {
    type: BUSINESS_ADDED,
    payload: businessId
  }
}
