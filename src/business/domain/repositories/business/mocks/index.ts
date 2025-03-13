import { vi } from 'vitest'
import { BusinessRepository } from '..'

export function getMockBusinessRepository(): BusinessRepository {
  return {
    getBusinessDetail: vi.fn(),
    searchByTermAndLocation: vi.fn(),
  }
}
