import { z } from 'zod'

const postsListParams = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
})
type PostsList = z.infer<typeof postsListParams>

export { postsListParams }

export type { PostsList }
