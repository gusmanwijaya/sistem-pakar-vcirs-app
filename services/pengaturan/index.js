import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function ubahPassword(id, data) {
  const url = `${ROOT_API}/${API}/pengaturan/ubah-password/${id}`;
  return CallApi({ url, method: "PATCH", data, token: true });
}
