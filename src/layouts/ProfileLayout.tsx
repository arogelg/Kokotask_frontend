import Tabs from "@/components/Profile/tabs";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
  <>
    <Tabs/>
    <Outlet/>
  </>
  )
}
