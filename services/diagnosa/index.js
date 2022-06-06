import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function create(data) {
  const url = `${ROOT_API}/${API}/diagnosa/create`;
  return CallApi({ url, method: "POST", token: true, data });
}
