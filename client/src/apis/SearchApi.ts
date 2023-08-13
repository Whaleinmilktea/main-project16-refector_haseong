import { encodedUrl } from "../pages/utils/EncodeUrl"
import { Study } from "../types/StudyGroupApiInterfaces"
import tokenRequestApi from "./TokenRequestApi"

export const SearchRequest = async (searchTxt : string) => {
  const res = await tokenRequestApi.get<{ study: Study[] }>(`study/search?t=${encodedUrl(searchTxt)}`)
  return res.data.study
}