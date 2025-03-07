import { z } from 'zod'

const postsListParams = z.object({
	page: z.number().optional(),
	limit: z.number().optional(),
})
