import Head from "next/head";

export default function Header({ title }) {
  return (
    <Head>
      <title>{title} - Sistem Pakar Diagnosa Hama/Penyakit Tanaman Kopi</title>
      <meta
        name="description"
        content="Sistem Pakar Diagnosa Hama/Penyakit Tanaman Kopi"
      />
      <meta
        property="og:title"
        content="Sistem Pakar Diagnosa Hama/Penyakit Tanaman Kopi"
      />
      <meta
        property="og:description"
        content="Sistem Pakar Diagnosa Hama/Penyakit Tanaman Kopi"
      />
    </Head>
  );
}
