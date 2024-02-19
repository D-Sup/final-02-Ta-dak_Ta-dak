import { axiosAuth } from "./settingAxios";

export const getProfile = async (accountname: string): Promise<Author> => {
  const reqUrl = `/profile/${accountname}`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data.profile;
  } catch (error) {
    throw error;
  }
};

export const getProfilePost = async (accountname: string): Promise<GetPostResponse> => {
  const reqUrl = `/post/${accountname}/userpost`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSaleItem = async (accountname: string): Promise<GetSaleItemResponse> => {
  const reqUrl = `/product/${accountname}`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data;
  } catch (error) {
    throw error;
  }
};