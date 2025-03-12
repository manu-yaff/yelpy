export const defaultProfileUrl = 'default image url'

export type UserType = {
  name: string
  profileUrl: string | null
}

export class User {
  constructor(private readonly data: UserType) {}

  public name(): string {
    return this.data.name
  }

  public profileUrl(): string {
    if (this.data.profileUrl === null || this.data.profileUrl.length === 0) return defaultProfileUrl

    return this.data.profileUrl
  }
}
