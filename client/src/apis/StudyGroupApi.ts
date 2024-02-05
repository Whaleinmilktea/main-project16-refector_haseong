import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { CreatePostInterface } from "../types/post";
import { v4 as uuidv4 } from 'uuid';

export const createStudyGroup = async (data : CreatePostInterface) => {
  const user = auth.currentUser
  if (!user) throw new Error("User not found");
  const newGroupId = uuidv4();
  await setDoc(doc(db, "studygroups", newGroupId), {
    ...data,
    leader: user.displayName,
    members: [user.displayName],
    likes: 0,
    createdAt: new Date(),
  });
  await setDoc(doc(db, "users", user.uid), {
    master: [newGroupId],
  });
}

export const getStudyGroupList = async () => {};

export const getStudyGroupInfo = async () => {};

export const updateLikeStatus = async () => {};

export const applyStudy = async () => {};

export const getLeaderRoleStduies = async () => {};

export const getMemberRoleStduies = async () => {};

export const getWaitingStudyGroupList = async () => {};

export const cancelStudyGroupApplication = async () => {};

export const updateStudyGroup = () => {};

export const updateStudyGroupContentsInfo = async () => {};

export const deleteStudyGroupInfo = () => {};

export const updateStudyGroupRecruitmentStatus = async () => {
  // Logic removed
};

export const getCandidateMembers = async () => {
  // Logic removed
};

export const getGroupMembers = async () => {
  // Logic removed
};

export const approveStudyGroupApplication = async () => {
  // Logic removed
};

export const rejectStudyGroupApplication = async () => {
  // Logic removed
};

export const forceKickStudyGroup = async () => {
  // Logic removed
};

export const ChangeStudyGroupLeader = async () => {
  // Logic removed
};

export const exitStudyGroup = async () => {
  // Logic removed
};

export const changeStudyGroupRecruitmentStatus = async () => {
  // Logic removed
};

export const getStudyListOrder = async () => {
  // Logic removed
};
