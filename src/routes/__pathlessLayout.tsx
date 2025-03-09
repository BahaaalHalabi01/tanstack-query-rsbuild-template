import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__pathlessLayout')({
	component: RouteComponent,
	loader: async ({ context }) => {
		console.log('aoeaeo')

		return {}
	},
})

function RouteComponent() {
	return <div>Hello "/__layout"!</div>
}
