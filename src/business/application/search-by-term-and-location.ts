import { Business } from '../domain/entities/business'
import { BusinessRepository } from '../domain/repositories/business-repository'

export class SearchByTermAndLocationUseCase {
  private repository: BusinessRepository

  constructor(repository: BusinessRepository) {
    this.repository = repository
  }

  public execute(term: string, location: string): Promise<Array<Business>> {
    return this.repository.searchByTermAndLocation(term, location)
  }
}
