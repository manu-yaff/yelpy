export const DEFAULT_USER_PROFILE_URL =
  'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'

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
