import { Col, Row, Typography } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IcoCode from '@/assets/images/home/services/ico-code.svg';
import IcoDashboard from '@/assets/images/home/services/ico-dashboard.svg';
import IcoMobile from '@/assets/images/home/services/ico-mobile.svg';

const Services = () => {
    const settings = {
        className: "slider variable-width slide-services",
        dots: true,
        arrows: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const services = [
        {
            title: 'Web Design & Development',
            description: 'A Website is an extension of yourself and we can help you to express it properly. Your website is your number one marketing asset because we live in a digital age.',
            icon: IcoCode
        },
        {
            title: 'Software Testing Service',
            description: 'A Website is an extension of yourself and we can help you to express it properly. Your website is your number one marketing asset because we live in a digital age.',
            icon: IcoDashboard
        },
        {
            title: 'Software Testing Service',
            description: 'A Website is an extension of yourself and we can help you to express it properly. Your website is your number one marketing asset because we live in a digital age.',
            icon: IcoMobile
        },
        {
            title: 'Mobile App Development',
            description: 'A Website is an extension of yourself and we can help you to express it properly. Your website is your number one marketing asset because we live in a digital age.',
            icon: IcoMobile
        },
        {
            title: 'Web Design & Development',
            description: 'A Website is an extension of yourself and we can help you to express it properly. Your website is your number one marketing asset because we live in a digital age.',
            icon: IcoCode
        }
    ]

    return (
        <div className="w-full bg-[#F9F9FF] pt-[45px] pb-[60px] border-t border-b border-[#E7DAED] overflow-hidden">
            <Row gutter={24}>
                <Col span={24}>
                    <Typography.Title level={2} 
                        className="
                            text-center 
                            !text-[24px]
                            md:!text-[35px] 
                            !font-[700] 
                            after:content-[''] 
                            after:block 
                            after:w-[100px] 
                            after:h-[2px] 
                            after:bg-[#E7DAED] 
                            after:mt-[10px] 
                            after:mb-[40px]
                            after:mx-auto
                        ">
                        Services we offer
                    </Typography.Title>
                    <Slider {...settings}>
                        {services.map((service, index) => (
                            <div key={index} className="!w-[270px] md:!w-[333px] px-[10px]">
                                <div className="
                                    item-service 
                                    bg-[#fff] 
                                    px-[16px] 
                                    py-[15px]
                                    md:py-[35px] 
                                    rounded-[10px]
                                    shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]
                                    transition-all duration-300
                                ">
                                    <div className="
                                        w-[58px] 
                                        h-[58px] 
                                        rounded-[50%] 
                                        p-[1px] 
                                        bg-gradient-to-r 
                                        from-[#F76680] 
                                        to-[#0D1C9F]
                                        overflow-hidden
                                    ">
                                        <div className="bg-[#fff] rounded-[50%] w-[56px] h-[56px] flex items-center justify-center overflow-hidden">
                                            <img src={service.icon} alt={service.title} />
                                        </div>
                                    </div>
                                    <h3 
                                        className="
                                            title-service
                                            text-[16px]
                                            md:!text-[20px] 
                                            font-[700] 
                                            mt-[15px]
                                            mb-[20px]
                                        "
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="leading-[1.5] text-[#4A5568] font-[400] mb-[0]">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    )
}

export default Services;