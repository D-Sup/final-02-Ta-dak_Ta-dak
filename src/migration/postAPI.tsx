// export default async function getFollowingFeed(loadPostSeq) {
//   const response = await fetch(`https://api.mandarin.weniv.co.kr/post/feed/?limit=5&skip=${loadPostSeq}`,
//     {
//       method: 'GET',
//       headers: {
//         'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjRlMmQ2YjJjYjIwNTY2M2UxZGVhYSIsImV4cCI6MTY5MTk0NDExMywiaWF0IjoxNjg2NzYwMTEzfQ.qCt33Jo9cze-DHI8HbKPNI5LTQ5MTOHCRxRKjPmHXZo`,
//         'Content-type' : 'application/json'
//       },
//     })
//   const json = await response.json()
//   console.log(json);
//   return json.posts
// }

// @ts-expect-error TS(2307): Cannot find module './settingAxios' or its corresp... Remove this comment to see the full error message
import { axiosAuth } from "./settingAxios";

export const getPost = async (loadPostSeq: any) => {
  const reqUrl = `/post/feed/?limit=5&skip=${loadPostSeq}`;
  try {
    const response = await axiosAuth.get(reqUrl)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Request error', error)
    throw error
  }
}

export const getPostAll = async (loadPostSeq: any) => {
  const reqUrl = `/post/?limit=5&skip=${loadPostSeq}`;
  try {
    const response = await axiosAuth.get(reqUrl)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Request error', error)
    throw error
  }
}

export const getPostDetail = async (postId: any) => {
  const reqUrl = `/post/${postId}`;
  try {
    const response = await axiosAuth.get(reqUrl)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Request error', error)
    throw error
  }
}

export const deletePost = async (postId: any) => {
  const reqUrl = `/post/${postId}`;
  try {
    const response = await axiosAuth.delete(reqUrl)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Request error', error)
    // throw error
  }
}

export const reportPost = async (postId: any) => {
  const reqUrl = `/post/${postId}/report`;
  try {
    const response = await axiosAuth.post(reqUrl)
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error('Request error', error)
    // throw error
  }
}

export const editPost = async (postId: any, content: any, image: any) => {
  const reqUrl = `/post/${postId}`;
  const body = {
    "post": {
      content,
      image
		}
  }
  try {
    const response = await axiosAuth.put(reqUrl, body)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Request error', error)
    throw error
  }
}