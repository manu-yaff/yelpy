type BusinessProps = {
  id: string
  name: string
  phone: string
  address: string
  reviewCount: number
  photos: Array<string>
}

export const defaultPhoneMessage = 'Phone not provided'
export const defaultImageUrlMessage = 'default image url'

export class Business {
  private readonly _id: string
  private readonly _name: string
  private readonly _phone: string
  private readonly _address: string
  private readonly _reviewCount: number
  private readonly _photos: string[]

  constructor(business: BusinessProps) {
    this._id = business.id
    this._name = business.name
    this._phone = business.phone
    this._address = business.address
    this._reviewCount = business.reviewCount
    this._photos = business.photos
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get phone(): string {
    if (this._phone.length === 0) return defaultPhoneMessage

    return this._phone
  }

  get address(): string {
    return this._address
  }

  get reviewCount(): number {
    return this._reviewCount
  }

  get imageUrl(): string {
    if (this._photos.length === 0) return defaultImageUrlMessage

    return this._photos[0]
  }
}
