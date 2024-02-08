import { axiosUnauth } from "./settingAxios";

export const loginReq = async (email: string, password: string): Promise<LoginSuccessResponse | LoginFailureResponse> => {
  const reqUrl = '/user/login';
  const body = {
    user: {
      email,
      password
    }
  };
  try {
    const { data } = await axiosUnauth.post(reqUrl, body)
    return data
  } catch (error) {
    throw error
  }
}