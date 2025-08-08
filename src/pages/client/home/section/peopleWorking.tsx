import { Col, Row, Typography } from "antd";
import Slider from "react-slick";
import ImgLogo01 from "@/assets/images/home/people/logo-01.png";
import ImgLogo02 from "@/assets/images/home/people/logo-02.png";
import ImgLogo03 from "@/assets/images/home/people/logo-03.png";
import ImgLogo04 from "@/assets/images/home/people/logo-04.png";
import ImgLogo05 from "@/assets/images/home/people/logo-05.png";
import ImgLogo06 from "@/assets/images/home/people/logo-06.png";
import ImgLogo07 from "@/assets/images/home/people/logo-07.png";
import ImgLogo08 from "@/assets/images/home/people/logo-08.png";
import Link from "antd/es/typography/Link";
import TypographyTitle from "../../component/typographyTitle";

const PeopleWorking = () => {

    const logos = [
        {
            image: ImgLogo01,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo02,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo03,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo04,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo05,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo06,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo07,
            url: "https://www.google.com"
        },
        {
            image: ImgLogo08,
            url: "https://www.google.com"
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        variableWidth: true,
    };
    return (
        <div className="w-full bg-[#fff] pb-[30px] md:pb-[60px] overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-[15px] relative overflow-hidden z-[1]">
                <Row gutter={24}>
                    <Col xs={24} sm={24}>
                        <TypographyTitle level={2} className="
                            relative
                            mt-[20px]
                            !mb-[30px]
                            md:!mb-[60px]
                            after:top-[-20px]
                            after:left-[0]
                        ">
                            Meet the People     
                            <span className="flex !font-[700]">We are Working With</span>
                        </TypographyTitle>
                    </Col>
                </Row>
                <div className="
                    absolute 
                    bottom-[-30px] 
                    left-[60%] 
                    translate-x-[-50%]
                    w-[60px] 
                    h-[60px] 
                    bg-gradient-to-bl
                    from-[#F76680]
                    to-[#57007B]
                    rounded-[50%] 
                    z-[-1]
                "></div>
            </div>
            <div className="bg-[#F7F7FA] py-[10px] md:py-[40px] border-t border-b border-[#E7DAED]">
                <Slider {...settings}>
                    {logos.map((logo, index) => (
                        <div key={index} className=" px-[10px]">
                            <Link href={logo.url} target="_blank" rel="noopener noreferrer">
                                <img src={logo.image} alt="People Working" className="mx-auto" />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default PeopleWorking;