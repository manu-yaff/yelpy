import { BusinessType } from '../../Business'

export function getMockBusinessData(data?: Partial<BusinessType>): BusinessType {
  return {
    id: data?.id ?? 'ZnKai8lxiVC_yhQysNZIIZ',
    name: data?.name ?? 'Test business name',
    phone: data?.phone ?? '+52 34 3826 3333',
    address: data?.address ?? 'Av. Chapultepec Norte 361',
    reviewCount: data?.reviewCount ?? 50,
    photos: data?.photos ?? [
      'https://s3-media2.fl.yelpcdn.com/bphoto/pZENAOOXaovUUPWqE8enGw/o.jpg',
    ],
  }
}
