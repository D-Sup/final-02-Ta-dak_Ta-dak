interface LoginSuccessResponse {
  user: {
      _id: string,
      username: string,
      email: string,
      accountname: string,
      image: string,
      token: string,
      refreshToken: string
  }
}

interface LoginFailureResponse {
  message: string,
  status: number
}