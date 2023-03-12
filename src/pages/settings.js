import SettingsTop from "@/components/Settings/Settings_Top";
import SettingsBottom from "@/components/Settings/Settings_Bottom";
import Head from "next/head";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <SettingsTop />
      <SettingsBottom />
    </>
  );
}
