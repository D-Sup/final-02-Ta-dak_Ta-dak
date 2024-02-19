import { useState, useEffect } from "react";
import { UserAtom } from "recoil/AtomUserState";
import { useRecoilValue } from "recoil";
import { UserAtomType } from "recoil/AtomUserState";

const useUserInfo = () => {
  const myInfo = useRecoilValue(UserAtom);
  const [userInfo, setUserInfo] = useState<UserAtomType>({
    id: '',
    username: '',
    accountname: '',
    token: '',
    refreshToken: '',
    image: '',
    following: [],
    follower: [],
  });

  useEffect(() => {
    setUserInfo(myInfo)
  }, [myInfo])
  const id = userInfo.id;
  const token = userInfo.token;
  const accountname = userInfo.accountname;
  return { id, token, accountname }
}

export default useUserInfo