import { DEFAULT_USER_PROFILE_URL, UserType } from '../../User'

export function getMockUserData(user?: Partial<UserType>): UserType {
  return {
    name: user?.name ?? 'Jonh doe',
    profileUrl: user?.name ?? DEFAULT_USER_PROFILE_URL,
  }
}
