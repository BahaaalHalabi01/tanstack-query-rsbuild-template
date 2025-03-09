import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import './styles.css'
import { DefaultCatchBoundary } from '@/components/catch-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotFound } from './components/not-found'
import { Spinner } from './components/spinner'

// i do not like the 0 stale time,seem overkill idk
const staleTime = 100_000

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime,
		},
	},
})

const router = createRouter({
	routeTree,
	context: {
		queryClient,
		title: 'Home Page',
	},
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultErrorComponent: DefaultCatchBoundary,
	defaultNotFoundComponent: () => <NotFound />,
	defaultPendingComponent: () => (
		<div className='p-2 text-2xl'>
			<Spinner />
		</div>
	),
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
