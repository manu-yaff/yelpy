import { describe, expect, it } from 'vitest'
import { defaultProfileUrl, User, UserType } from '.'

describe(User.name, () => {
  describe(User.prototype.name.name, () => {
    it('should return user name', () => {
      // Arrange
      const mockUser: UserType = {
        name: 'Sam',
        profileUrl: 'https://example.com/image.jpg',
      }

      // Act
      const user = new User(mockUser)

      // Assert
      expect(user.name()).toBe(mockUser.name)
    })
  })

  describe(User.prototype.profileUrl.name, () => {
    it('should return default profile url when user does not have one', () => {
      // Arrange
      const mockUser: UserType = {
        name: 'Sam',
        profileUrl: '',
      }

      // Act
      const user = new User(mockUser)

      // Assert
      expect(user.profileUrl()).toBe(defaultProfileUrl)
    })

    it('should return user profile url when present', () => {
      // Arrange
      const mockUser: UserType = {
        name: 'Sam',
        profileUrl: 'https://example.com/image.jpg',
      }

      // Act
      const user = new User(mockUser)

      // Assert
      expect(user.profileUrl()).toBe(mockUser.profileUrl)
    })
  })
})
