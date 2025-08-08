import { Outlet } from "react-router-dom";
import Header from "./client/header";
import Footer from "./client/footer";
import '@/assets/css/client/style.scss';

const ClientLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default ClientLayout;