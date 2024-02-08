import { axiosAuth } from "./settingAxios";

export const getSearch = async (value: string): Promise<Author> => {
  const reqUrl = `/user/searchuser/?keyword=${value}`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data;
  } catch (error) {
    throw error;
  }
};