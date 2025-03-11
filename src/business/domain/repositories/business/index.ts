import { Business } from '../../entities/Business'

export interface BusinessRepository {
  searchByTermAndLocation(term: string, location: string): Promise<Array<Business>>
}
