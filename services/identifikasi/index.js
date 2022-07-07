import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function create(data) {
  const url = `${ROOT_API}/${API}/identifikasi/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/identifikasi/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
