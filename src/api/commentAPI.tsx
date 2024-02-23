import { axiosAuth } from "./settingAxios";

export const getComment = async (postId: string): Promise<GetCommentResponse> => {
  const reqUrl = `/post/${postId}/comments`;
  try {
    const { data } = await axiosAuth.get(reqUrl)
    return data
  } catch (error) {
    throw error
  }
}

export const writeComment = async (postId: string, content: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}/comments`;
  const body = {
    comment: {
      content
    }
  }
  try {
    const { status } = await axiosAuth.post(reqUrl, body)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const deleteComment = async (postId: string, commentId: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}/comments/${commentId}`;
  try {
    const { status } = await axiosAuth.delete(reqUrl)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const reportComment = async (postId: string, commentId: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}/comments/${commentId}/report`;
  try {
    const { status } = await axiosAuth.post(reqUrl)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}