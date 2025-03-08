import type { Posts } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function PostCard({ post }: { post: Posts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.body}</CardDescription>
      </CardContent>
    </Card>
  )
}
