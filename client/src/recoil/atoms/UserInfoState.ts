import { RecoilState, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserInfoState: RecoilState<{
  nickName: string;
  photoUrl: string;
}> = atom({
  key: "userInfoState",
  default: {
    nickName: "",
    photoUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});
