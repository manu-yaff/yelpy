import { Business } from '../Business'
import { OperatingHour } from '../OperatingHour'
import { Review } from '../Review'

export enum OpeningStatus {
  Open = 'open',
  Closed = 'closed',
}

export type BusinessDetailType = {
  business: Business
  isOpen: boolean | null
  hours: Array<OperatingHour>
  reviews: Array<Review>
}

export const hoursNotProvided = 'The business has not defined their operating hours'

export class BusinessDetail {
  constructor(private readonly data: BusinessDetailType) {}

  public business(): Business {
    return this.data.business
  }

  public isOpen(): OpeningStatus | string {
    if (this.data.isOpen === null) return hoursNotProvided

    if (this.data.isOpen) return OpeningStatus.Open

    return OpeningStatus.Closed
  }

  public hours(): Array<OperatingHour> {
    return [...this.data.hours]
  }

  public reviews(): Array<Review> {
    return [...this.data.reviews]
  }
}
