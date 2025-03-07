import type { Posts } from '@/types'
import { queryOptions } from '@tanstack/react-query'

type Key = 'posts'
const gen = (key: Key, params: Record<string, string>) => [key, params]

const base = 'https://jsonplaceholder.typicode.com'

async function getPosts() {
	return await fetch(`${base}/posts`).then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok')
		}

		return res.json() as Promise<Posts[]>
	})
}

const postsListQueryOptions = () =>
	queryOptions({
		queryKey: gen('posts', {}),
		queryFn: () => getPosts(),
	})
