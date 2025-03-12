import { BusinessRepository } from '../../domain/repositories/business'

export class GetBusinessDetailUseCase {
  constructor(private readonly repository: BusinessRepository) {}

  public async execute(id: string) {
    return this.repository.getBusinessDetail(id)
  }
}
