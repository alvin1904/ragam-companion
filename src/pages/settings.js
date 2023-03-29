import SettingsTop from "@/components/Settings/Settings_Top";
import Head from "next/head";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="settings_page">
      <SettingsTop />
      </div>
    </>
  );
}
