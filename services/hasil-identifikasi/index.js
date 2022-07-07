import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getHighest(user, tanggal) {
  const url = `${ROOT_API}/${API}/hasil-identifikasi/get-highest?user=${user}&tanggal=${tanggal}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getForUser(token) {
  const url = `${ROOT_API}/${API}/hasil-identifikasi/get-for-user`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getForDetail(id, token) {
  const url = `${ROOT_API}/${API}/hasil-identifikasi/get-for-detail/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getAll(token) {
  const url = `${ROOT_API}/${API}/hasil-identifikasi/get-all`;
  return CallApi({ url, method: "GET", serverToken: token });
}
