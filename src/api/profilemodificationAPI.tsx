import { axiosAuth } from "./settingAxios";

export const profilemodificationReq = async (username: string, accountname: string, intro: string, image: string): Promise<Author> => {
  const reqUrl = '/user';
  const body = {
    user: {
      username,
      accountname,
      intro,
      image
    }
  };
  try {
    const { data } = await axiosAuth.put(reqUrl, body)
    return data
  } catch (error) {
    throw error
  }
}