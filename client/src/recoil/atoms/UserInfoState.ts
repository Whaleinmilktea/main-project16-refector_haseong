import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserInfoState = atom({
  key: "userInfo",
  default: {
    nickName : "",
    photoUrl : "",
  },
  effects_UNSTABLE: [persistAtom],
});

console.log(UserInfoState);