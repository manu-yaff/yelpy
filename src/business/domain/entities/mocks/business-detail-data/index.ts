import { Business } from '../../Business'
import { BusinessDetailType } from '../../BusinessDetail'
import { OperatingHour } from '../../OperatingHour'
import { Review } from '../../Review'
import { getMockBusinessData } from '../business-data'
import { getMockReviewData } from '../business-review'

export function getMockBusinessDetailData(data?: Partial<BusinessDetailType>): BusinessDetailType {
  return {
    business: data?.business ?? new Business(getMockBusinessData()),
    isOpen: data?.isOpen !== undefined ? data.isOpen : true,
    reviews: data?.reviews ?? [new Review(getMockReviewData())],
    hours: data?.hours ?? [
      new OperatingHour({
        start: '0800',
        end: '1700',
        day: 1,
      }),
    ],
  }
}
