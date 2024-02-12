interface GetPostResponse {
  data?: number,
  posts: Posts[] | []
}

interface Posts {
  _id?: string,
  id?: string,
  content: string,
  image: string,
  createdAt: string,
  updatedAt: string,
  heartCount: number,
  hearted?: boolean,
  comments: string[],
  commentCount?: number,
  author: Author,
  __v?: number
}