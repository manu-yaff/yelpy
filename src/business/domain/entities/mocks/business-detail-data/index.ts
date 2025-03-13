import { Business } from '../../Business'
import { BusinessDetailType } from '../../BusinessDetail'
import { OperatingHour } from '../../OperatingHour'
import { Review } from '../../Review'
import { User } from '../../User'
import { getMockBusinessData } from '../business-data'

export function getMockBusinessDetailData(data?: Partial<BusinessDetailType>): BusinessDetailType {
  return {
    business: data?.business ?? new Business(getMockBusinessData()),
    isOpen: data?.isOpen !== undefined ? data.isOpen : true,
    reviews: data?.reviews ?? [
      new Review({
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }),
    ],
    hours: data?.hours ?? [
      new OperatingHour({
        start: '0800',
        end: '1700',
        day: 1,
      }),
    ],
  }
}
