interface GetSaleItemResponse {
  product: Product
}

interface Product {
  id: string,
  itemName: string,
  price: number,
  link: string,
  itemImage: string,
  author: Author
}

interface Author {
  _id: string,
  username: string,
  accountname: string,
  following: string[],
  follower: string[],
  intro?: string,
  image?: string,
  isfollow?: boolean, 
  followerCount?: number,
  followingCount?: number,
  hearts?: string[],
  email?: string,
  salt?: string,
  hash?: string,
  __v?: number
  createdAt?: string,
  updatedAt?: string,
}