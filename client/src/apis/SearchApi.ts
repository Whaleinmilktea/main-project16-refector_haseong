import tokenRequestApi from "./TokenRequestApi"
import { encodedUrl } from "../pages/utils/EncodeUrl"
import { Study } from "../types/StudyGroupApiInterfaces"

export const searchRequest = async (tagSearch : string) => {
  const response = await tokenRequestApi.get<Study[]>(`/study/search?t=${encodedUrl(tagSearch)}`)
  return response.data
}