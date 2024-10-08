import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";


export default function Root() {
    return (
        <>
        <div className="container">
        <Navigation />
        <Outlet />
        </div>
        </>
    );
}