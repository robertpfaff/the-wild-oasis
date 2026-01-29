
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";


function Dashboard() {
  useEffect(() => {
    if (!localStorage.getItem("wild_oasis_guest_toast_shown")) {
      toast(
        "This project includes an authentication component to create an account with username and password. As a guest, we redirected you to the dashboard.",
        { icon: "👋", duration: 7000 }
      );
      localStorage.setItem("wild_oasis_guest_toast_shown", "1");
    }
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
