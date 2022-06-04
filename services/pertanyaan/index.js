import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getAll(page, limit) {
  const url = `${ROOT_API}/${API}/pertanyaan/get-all?page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getOne(id, token) {
  const url = `${ROOT_API}/${API}/pertanyaan/get-one/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/pertanyaan/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function update(id, data) {
  const url = `${ROOT_API}/${API}/pertanyaan/update/${id}`;
  return CallApi({ url, method: "PUT", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/pertanyaan/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
