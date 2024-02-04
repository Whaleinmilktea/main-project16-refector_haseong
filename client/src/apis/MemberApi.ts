import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
// * recoil에서 전역 LogInState를 가져와서 isLogin 변수에 할당

export const updateMemberProfileImage = async () => {};

export const checkMemberPassword = async () => {};

export const checkOauth2Member = async () => {};

// refector 이후 코드
export const updateUserNickname = async () => {};

export const updateUserPassword = async () => {};

export const updateMemberDetail = async () => {};

export const leaveMembership = async () => {};

export const getOtherMemberInfo = async () => {};

export const getReference = async (
  docRef: DocumentReference<DocumentData, DocumentData>
) => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else
    (error: any) => {
      console.log(error);
    };
};
