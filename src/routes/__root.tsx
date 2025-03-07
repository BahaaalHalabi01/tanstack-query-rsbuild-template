import { Spinner } from '@/components/spinner'
import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'

type RootContext = {
	queryClient: QueryClient
	title: string
}

export const Route = createRootRouteWithContext<RootContext>()({
	component: RootComponent,
})

function RootComponent() {
	return (
		<React.Fragment>
			<div className='text-3xl'>
				<RouterSpinner />
			</div>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</React.Fragment>
	)
}

function RouterSpinner() {
	const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
	return <Spinner show={isLoading} />
}
