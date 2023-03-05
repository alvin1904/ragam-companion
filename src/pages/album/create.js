import Head from "next/head";
import CreateAlbum from "@/components/Album/CreateAlbum";

export default function Create() {
  return (
    <>
      <Head>
        <title>Create an album!</title>
      </Head>
      <CreateAlbum />
    </>
  );
}
