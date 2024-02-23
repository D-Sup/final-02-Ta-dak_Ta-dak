interface GetCommentResponse {
  comments: Comment[]
}

interface Comment {
    id: string,
    content: string,
    createdAt: string,
    author: CommentAuthor
}

interface CommentAuthor {
  _id: string,
  username: string,
  accountname: string,
  intro: string,
  image: string,
  isfollow: boolean,
  following: string[],
  follower: string[],
  followerCount: number,
  followingCount: number
}