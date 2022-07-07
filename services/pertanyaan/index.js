import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getAll(page, limit) {
  const url = `${ROOT_API}/${API}/pertanyaan/get-all?page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}
