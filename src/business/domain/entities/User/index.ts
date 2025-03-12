export const DEFAULT_USER_PROFILE_URL = 'default image url'

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
    if (this.data.profileUrl === null || this.data.profileUrl.length === 0)
      return DEFAULT_USER_PROFILE_URL

    return this.data.profileUrl
  }
}
