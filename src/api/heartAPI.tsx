import { axiosAuth } from "./settingAxios";

export const postLike = async (postId: string): Promise<void> => {
  const reqUrl = `/post/${postId}/heart`;
  try {
    await axiosAuth.post(reqUrl)
  } catch (error) {
    throw error
  }
}

export const deleteLike = async (postId: string): Promise<void> => {
  const reqUrl = `/post/${postId}/unheart`;
  try {
    await axiosAuth.delete(reqUrl)
  } catch (error) {
    throw error
  }
}