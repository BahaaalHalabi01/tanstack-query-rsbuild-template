//one file for all types untill it becomes a problem
//

type Posts = {
	id: number
	title: string
	body: string
	userId: number
}

type Comments = {
	id: number
	body: string
	postId: number
	name: string
	email: number
}

type Users = {
	id: number
	name: string
	email: string
	username: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone: string
	website: string
	company: {
		name: string
		catchPhrase: string
		bs: string
	}
}

export type { Posts, Comments, Users }
