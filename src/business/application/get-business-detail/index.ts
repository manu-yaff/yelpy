import { BusinessDetail } from '../../domain/entities/BusinessDetail'
import { BusinessRepository } from '../../domain/repositories/business'

export class GetBusinessDetailUseCase {
  constructor(private readonly repository: BusinessRepository) {}

  public execute(id: string): Promise<BusinessDetail> {
    return this.repository.getBusinessDetail(id)
  }
}
