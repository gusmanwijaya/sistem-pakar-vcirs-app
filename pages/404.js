import Image from "next/image";
import Header from "../components/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 5000);
  }, [router]);

  return (
    <>
      <Header title="Error 404 Not Found" />
      <section className="h-screen flex flex-col items-center justify-center">
        <Image
          src="/img/404.svg"
          width={450}
          height={450}
          alt="404 - Not Found"
        />
        <h1 className="text-xl lg:text-3xl text-gray-900 text-center">
          Opps! Kami kehilangan kamu. <br />{" "}
          <span className="text-base lg:text-xl text-gray-400 font-light">
            Halaman tidak ditemukan.
          </span>{" "}
        </h1>
      </section>
    </>
  );
}
