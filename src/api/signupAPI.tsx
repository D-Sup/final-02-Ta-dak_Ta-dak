import { axiosUnauth } from "./settingAxios";
import { AxiosError } from 'axios';

export const postEmailValid = async (email: string): Promise<string> => {
  const reqUrl = '/user/emailvalid';
  const body = {
    user: {
      email
    }
  };
  try {
    const { data } = await axiosUnauth.post(reqUrl, body)
    return data.message;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseMessage>;
    if (axiosError.response) {
      return axiosError.response.data.message;
    } else {
      throw error
    }
  }
}

export const postAccountValid = async (accountname: string): Promise<string> => {
  const reqUrl = '/user/accountnamevalid';
  const body = {
    user: {
      accountname
    }
  };
  try {
    const response = await axiosUnauth.post(reqUrl, body)
    return response.data.message;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseMessage>;
    if (axiosError.response) {
      return axiosError.response.data.message;
    } else {
      throw error
    }
  }
}

export const postSignUp = async (user: SignUpInfo): Promise<boolean> => {
  const reqUrl = '/user';
  const body = {
    user
  };
  try {
    const { status } = await axiosUnauth.post(reqUrl, body)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}