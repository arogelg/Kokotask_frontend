import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1
        className=" mt-10 font-black text-center text-4xl text-white"
        >404 - Page Not Found</h1>
        <p className="mt-10 text-center text-white">
            You may want to go back to 
            <Link className ="text-fuchsia-500" to='/'> projects</Link>
        </p>
    </>
  )
}
