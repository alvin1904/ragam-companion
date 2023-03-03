import Albums from "./Albums";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <Albums />
    </div>
  );
}
