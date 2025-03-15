import { User, UserType } from '../../User'

export function getMockUser(user?: Partial<UserType>): User {
  return new User({
    name: user?.name ?? 'Jonh doe',
    profileUrl: user?.name ?? 'https://example.com/johndoe',
  })
}
