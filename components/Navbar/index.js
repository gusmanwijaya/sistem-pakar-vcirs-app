/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div
      className="navbar bg-gray-900 text-gray-300 hover:text-white',
    'block px-3 py-2 text-base font-medium"
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Sistem Pakar</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/dashboard">
              <button className="btn btn-active btn-ghost capitalize">
                Dashboard
              </button>
            </Link>
          </li>
          <li tabIndex="0">
            <button className="btn btn-active btn-ghost capitalize">
              Data Master
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </button>
            <ul className="p-2 bg-base-100 text-gray-600">
              <li>
                <Link href="/hama-penyakit">
                  <button className="btn btn-ghost capitalize">
                    Hama/Penyakit
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/gejala">
                  <button className="btn btn-ghost capitalize">Gejala</button>
                </Link>
              </li>
              <li>
                <Link href="/solusi">
                  <button className="btn btn-ghost capitalize">Solusi</button>
                </Link>
              </li>
              <li>
                <Link href="/pertanyaan">
                  <button className="btn btn-ghost capitalize">
                    Pertanyaan
                  </button>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/basis-pengetahuan">
              <button className="btn btn-active btn-ghost capitalize">
                Basis Pengetahuan
              </button>
            </Link>
          </li>
          <li>
            <Link href="/diagnosa">
              <button className="btn btn-active btn-ghost capitalize">
                Diagnosa
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-active btn-ghost capitalize"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
