import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/lib/search'
import type { PostsList } from '@/schemas/posts'
import type { Posts } from '@/types'
import { queryOptions } from '@tanstack/react-query'

type Key = 'posts'
const gen = (key: Key, params?: Record<string, unknown>) => [key, params]

const base = 'https://jsonplaceholder.typicode.com'

async function getPosts(params?: PostsList) {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	const res = await fetch(`${base}/posts`)
	//some error handling would be good
	if (!res.ok) {
		throw new Error('Network response was not ok')
	}

	const json = (await res.json()) as Posts[]
	const start = params?.page ?? DEFAULT_PAGE_INDEX
	const limit = params?.limit ?? DEFAULT_PAGE_SIZE

	console.log(start)

	const x = json.slice(start * limit, (start + 1) * limit)
	console.log(x)
	return x

	//mock pagination,idk if json placeholder has it, looks like it doesn't
}

const postsListQueryOptions = (params?: PostsList) =>
	queryOptions({
		queryKey: gen('posts', params),
		queryFn: () => getPosts(params),
	})

export { postsListQueryOptions }
