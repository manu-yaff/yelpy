import { ReviewType } from '../../Review'
import { getMockUser } from '../business-user'

export function getMockReviewData(review?: Partial<ReviewType>): ReviewType {
  return {
    id: review?.id ?? '1',
    timeCreated: review?.timeCreated ?? '2024-03-12',
    rating: review?.rating ?? 5,
    text: review?.text ?? 'Test Review',
    user: getMockUser(),
  }
}
