import { axiosAuth } from "./settingAxios";

export const upload = async (content: string, image: string): Promise<GetPostResponse> => {
  const reqUrl = '/post';
  const body = {
    post: {
      content,
      image
    }
  };
  try {
    const { data } = await axiosAuth.post(reqUrl, body)
    console.log(data);

    return data
  } catch (error) {
    throw error
  }
}

export const postImgFile = async (value: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', value);
  const reqUrl = '/image/uploadfile';
  const body = formData;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const { data } = await axiosAuth.post(reqUrl, body, config)
    return `https://api.mandarin.weniv.co.kr/${data.filename}`;
  } catch (error) {
    throw error
  }
}