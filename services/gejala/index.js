import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getForSelect(token) {
  const url = `${ROOT_API}/${API}/gejala/get-for-select`;
  return CallApi({ url, method: "GET", serverToken: token });
}
