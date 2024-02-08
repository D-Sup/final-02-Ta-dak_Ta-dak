import { axiosAuth } from './settingAxios';

export const getFollowingList = async (accountname: string, loadFollowSeq: number): Promise<Author> => {
  const reqUrl = `/profile/${accountname}/following?limit=20&skip=${loadFollowSeq}`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data
  } catch (error) {
    console.error('Request error', error);
    throw error;
  }
};

export const getFollowerList = async (accountname: string, loadFollowSeq: number): Promise<Author> => {
  const reqUrl = `/profile/${accountname}/follower/?limit=20&skip=${loadFollowSeq}`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data
  } catch (error) {
    throw error;
  }
};

export const getRecFollowingList = async (accountname: string): Promise<Author> => {
  const reqUrl = `/profile/${accountname}/following?limit=100`;
  try {
    const { data } = await axiosAuth.get(reqUrl);
    return data
  } catch (error) {
    throw error;
  }
};