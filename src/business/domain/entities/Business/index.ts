export const defaultPhoneMessage = 'Phone not provided'
export const defaultBusinessImageUrl = 'default image url'

export type BusinessType = {
  id: string
  name: string
  phone: string
  address: string
  reviewCount: number
  photos: Array<string>
}

export class Business {
  constructor(private readonly data: BusinessType) {}

  public id(): string {
    return this.data.id
  }

  public name(): string {
    return this.data.name
  }

  public phone(): string {
    return this.data.phone.length === 0 ? defaultPhoneMessage : this.data.phone
  }

  public address(): string {
    return this.data.address
  }

  public reviewCount(): number {
    return this.data.reviewCount
  }

  public imageUrl(): string {
    return this.data.photos.length === 0 ? defaultBusinessImageUrl : this.data.photos[0]
  }
}
