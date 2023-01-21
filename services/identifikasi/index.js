import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getGejala(page, limit) {
  const url = `${ROOT_API}/${API}/identifikasi/get-gejala?page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getHistory(token) {
  const url = `${ROOT_API}/${API}/identifikasi/get`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getOneHistory(id, token) {
  const url = `${ROOT_API}/${API}/identifikasi/get-one/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/identifikasi/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/identifikasi/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
