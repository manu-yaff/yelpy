import { User } from '../User'

export type ReviewType = {
  id: string
  rating: number
  text: string
  timeCreated: string
  user: User
}

export class Review {
  constructor(private readonly data: ReviewType) {}

  public id(): string {
    return this.data.id
  }

  public rating(): number {
    return this.data.rating
  }

  public text(): string {
    return this.data.text
  }

  public user(): User {
    return this.data.user
  }

  public timeCreated(): string {
    const date = new Date(this.data.timeCreated)
    const formattedDate = date.toISOString().split('T')[0]

    return formattedDate
  }
}
