import Logo from "@/components/logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
  return (
<>
    <div className="bg-gradient-to-br from-customPink to-customPurple min-h-screen">
        <div className="py-1 lg:py-10 mx-auto w-[150px]">
            <Logo size="w-[100px]"/>
        </div>
        <div className="mt-1 lg:py-20 mx-auto w-[450px]">
            <Outlet />
        </div>
    </div>
    <ToastContainer

    pauseOnFocusLoss={false}
    pauseOnHover={false}

    />
</>
  )
}
