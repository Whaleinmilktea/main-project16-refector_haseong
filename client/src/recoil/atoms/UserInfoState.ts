import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserInfoState = atom({
  key: "userInfoState",
  default: {
    nickName : "",
    photoUrl : "",
  },
  effects_UNSTABLE: [persistAtom],
});