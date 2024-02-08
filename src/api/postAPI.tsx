import { axiosAuth } from "./settingAxios";

export const getPost = async (loadPostSeq: string): Promise<GetPostResponse> => {
  const reqUrl = `/post/feed/?limit=5&skip=${loadPostSeq}`;
  try {
    const { data } = await axiosAuth.get(reqUrl)
    return data
  } catch (error) {
    throw error
  }
}

export const getPostAll = async (loadPostSeq: string): Promise<GetPostResponse> => {
  const reqUrl = `/post/?limit=5&skip=${loadPostSeq}`;
  try {
    const { data } = await axiosAuth.get(reqUrl)
    return data
  } catch (error) {
    throw error
  }
}

export const getPostDetail = async (postId: string): Promise<GetPostResponse> => {
  const reqUrl = `/post/${postId}`;
  try {
    const { data } = await axiosAuth.get(reqUrl)
    return data
  } catch (error) {
    throw error
  }
}

export const deletePost = async (postId: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}`;
  try {
    const { status } = await axiosAuth.delete(reqUrl)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const reportPost = async (postId: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}/report`;
  try {
    const { status } = await axiosAuth.post(reqUrl)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const editPost = async (postId: string, content: string, image: string): Promise<boolean> => {
  const reqUrl = `/post/${postId}`;
  const body = {
    post: {
      content,
      image
    }
  }
  try {
    const { status } = await axiosAuth.put(reqUrl, body)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}