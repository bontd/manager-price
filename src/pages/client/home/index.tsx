import Banner from "@/pages/client/home/section/banner";
import Leading from "@/pages/client/home/section/leading";
import Services from "@/pages/client/home/section/services";
import PeopleWorking from "@/pages/client/home/section/peopleWorking";
import WhyCustomerLove from "@/pages/client/home/section/whyCustomerLove";
import OurRecent from "@/pages/client/home/section/ourRecent";
import WayBuilding from "@/pages/client/home/section/wayBuilding";
import OurDesign from "@/pages/client/home/section/ourDesign";
import OurTech from "@/pages/client/home/section/ourTech";
import Development from "@/pages/client/home/section/development";
import Featured from "@/pages/client/home/section/featured";

const Home = () => {
    return (
        <>
            <Banner />
            <Services />
            <Leading />
            <PeopleWorking />
            <WhyCustomerLove />
            <OurRecent />
            <WayBuilding />
            <OurDesign />
            <OurTech />
            <Development />
            <Featured />
        </>
    )
}

export default Home;