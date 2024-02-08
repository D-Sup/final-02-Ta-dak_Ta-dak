import { axiosAuth } from './settingAxios';

export const doFollowing = async (accountname: string): Promise<boolean> => {
  const reqUrl = `/profile/${accountname}/follow`;

  try {
    const { status } = await axiosAuth.post(reqUrl);
    return status >= 200 && status < 300;
  } catch (error) {
    throw error;
  }
};

export const doUnfollowing = async (accountname: string): Promise<boolean> => {
  const reqUrl = `/profile/${accountname}/unfollow`;

  try {
    const { status } = await axiosAuth.delete(reqUrl);
    return status >= 200 && status < 300;
  } catch (error) {
    throw error;
  }
};
