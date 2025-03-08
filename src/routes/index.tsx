import { PostCard } from '@/components/post-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { searchPostsSchema } from '@/lib/search'
import { postsListQueryOptions } from '@/server/posts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { Suspense } from 'react'
import { cleanEmptyParams } from '@/lib/search'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchPostsSchema),
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    //use prefetch if data is not needed immediately
    //otherwise, use ensureQuery
    context.queryClient.prefetchQuery(postsListQueryOptions({ ...deps }))

    return {}
  },
})

function RouteComponent() {
  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl pb-4'> Template RsBuild-React-Query-Tanstack </h1>
      <p>
        such code is what i would use to build a frontend atm if it HAS to be a
        react app
      </p>
      <p>use tanstack-start for the full stack experience</p>

      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </div>
  )
}

function PostsList() {
  const search = useSearch({ from: Route.fullPath })
  const { data } = useSuspenseQuery(postsListQueryOptions({ ...search }))
  const navigate = useNavigate({ from: Route.fullPath })

  function handlePageSizeChange(v: string) {
    navigate({
      search: (s) =>
        cleanEmptyParams({
          ...s,
          limit: Number(v),
        }),
    })
  }

  function handlePageChange(v: string) {
    navigate({
      search: (s) =>
        cleanEmptyParams({
          ...s,
          page: Number(v),
        }),
    })
  }

  return (
    <div className='py-6 space-y-4'>
      <h2 className='text-2xl'> Data Fetched from JSON Placeholder</h2>
      <div>
        <Select onValueChange={handlePageSizeChange}>
          <SelectTrigger>
            <SelectValue placeholder='Select a page size' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='25'>25</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
