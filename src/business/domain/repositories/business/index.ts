import { Business } from '../../entities/Business'
import { BusinessDetail } from '../../entities/BusinessDetail'

export interface BusinessRepository {
  searchByTermAndLocation(term: string, location: string): Promise<Array<Business>>

  getBusinessDetail(id: string): Promise<BusinessDetail>
}
