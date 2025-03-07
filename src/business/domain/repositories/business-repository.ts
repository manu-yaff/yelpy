import { Business } from '../entities/business'

export interface BusinessRepository {
  searchByTermAndLocation(term: string, location: string): Promise<Array<Business>>
}
