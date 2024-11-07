import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function LayOut(){
    return (
        <main>

        <Header/>
        <Outlet />
        </main>
    )

}