import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getAll(keyword, page, limit) {
  const url = `${ROOT_API}/${API}/hama-penyakit/get-all?keyword=${keyword}&page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getOne(id) {
  const url = `${ROOT_API}/${API}/hama-penyakit/get-one/${id}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function update(id, data) {
  const url = `${ROOT_API}/${API}/hama-penyakit/update/${id}`;
  return CallApi({ url, method: "PUT", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/hama-penyakit/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
