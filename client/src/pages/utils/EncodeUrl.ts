import { Base64 } from "js-base64";

export const encodedUrl = (el: string | number | boolean) => {
  if (typeof el === "string") return Base64.encode(el);
  if (typeof el === "boolean") return Base64.encode(`${el}`);
  else return Base64.encode(el.toString());
};