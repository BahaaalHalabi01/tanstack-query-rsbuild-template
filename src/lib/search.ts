import { z } from 'zod'

export const DEFAULT_PAGE_SIZE = 25
export const DEFAULT_PAGE_INDEX = 0

const cleanEmptyParams = <T extends Record<string, unknown>>(search: T): T => {
	const newSearch: T & { page?: number; limit?: number } = { ...search }
	for (const key of Object.keys(newSearch)) {
		const value = newSearch[key]
		if (
			value === undefined ||
			value === '' ||
			(typeof value === 'number' && Number.isNaN(value))
		)
			delete newSearch[key]
	}

	if (search.page === DEFAULT_PAGE_INDEX) newSearch.page = undefined
	if (search.limit === DEFAULT_PAGE_SIZE) newSearch.limit = undefined

	return newSearch
}

const searchPostsSchema = z.object({
	q: z.string().optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
})

type SearchPosts = z.infer<typeof searchPostsSchema>

export { searchPostsSchema, cleanEmptyParams }
export type { SearchPosts }
