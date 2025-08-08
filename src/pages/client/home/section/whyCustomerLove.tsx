import { Col, Row, Typography } from "antd";
import Slider from "react-slick";
import { useRef, useEffect, useState } from "react";
import ImgCustomer01 from "@/assets/images/home/why/avatar-01.png";
import ImgCustomer02 from "@/assets/images/home/why/avatar-02.png";
import ImgCustomer03 from "@/assets/images/home/why/avatar-03.png";
import ImgCustomer04 from "@/assets/images/home/why/avatar-04.png";
import ImgCustomer05 from "@/assets/images/home/why/avatar-05.png";
import IconStar from "@/assets/images/home/why/ico-star.svg";
import IconQuoteLeft from "@/assets/images/ico-quote-left.svg";
import IconQuoteRight from "@/assets/images/ico-quote-right.svg";
import TypographyTitle from "@/pages/client/component/typographyTitle";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const WhyCustomerLove = () => {
    const mainSliderRef = useRef<Slider>(null);
    const navSliderRef = useRef<Slider>(null);
    const [sliderSettings, setSliderSettings] = useState({
        main: {
            className: "why-main-slider",
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <button className="bg-red-500 w-[30px] h-[30px]"><ArrowLeftOutlined /></button>,
            nextArrow: <button className="bg-red-500 w-[30px] h-[30px]"><ArrowRightOutlined /></button>,
        },
        nav: {
            className: "why-nav-slider",
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        }
    });
    
    const data = [
        {
            name: "Imran Khan",
            position: "Software Engineer",
            image: ImgCustomer01,
            content: "Without any doubt I recommend Alcaline Solutions as one of the best web design and digital marketing agencies. One of the best agencies I’ve came across so far. Wouldn’t be hesitated to introduce their work to someone else.",
            star: 5,
        },
        {
            name: "Romeena De Silva",
            position: "Janet Cosmetics",
            image: ImgCustomer02,
            content: "We are a custom software development company that guarantees the successful delivery of your project.",
            star: 5,
        },
        {
            name: "Romeena De Silva",
            position: "Janet Cosmetics",
            image: ImgCustomer03,
            content: "We are a custom software development company that guarantees the successful delivery of your project.",
            star: 5,
        },
        {
            name: "Romeena De Silva",
            position: "Janet Cosmetics",
            image: ImgCustomer04,
            content: "We are a custom software development company that guarantees the successful delivery of your project.",
            star: 5,
        },
        {
            name: "Romeena De Silva",
            position: "Janet Cosmetics",
            image: ImgCustomer05,
            content: "We are a custom software development company that guarantees the successful delivery of your project.",
            star: 5,
        }
    ]

    useEffect(() => {
        if (mainSliderRef.current && navSliderRef.current) {
            setSliderSettings(prev => ({
                main: {
                    ...prev.main,
                    asNavFor: navSliderRef.current
                },
                nav: {
                    ...prev.nav,
                    asNavFor: mainSliderRef.current
                }
            }));
        }
    }, []);

    const handleNavClick = (index: number) => {
        if (mainSliderRef.current) {
            mainSliderRef.current.slickGoTo(index);
        }
    };

    return (
        <div className="w-full bg-[#fff] py-[30px] md:pt-[60px] md:pb-[100px] overflow-hidden px-[15px]">
            <div className="w-full max-w-[1200px] mx-auto">
                <Row gutter={24}>
                    <Col xs={24} sm={24}>
                        <TypographyTitle level={2} className="
                            relative
                            text-center
                            mt-[20px]
                            !mb-[30px]
                            md:!mb-[60px]
                            after:top-[-20px]
                            after:left-[50%]
                            after:translate-x-[-50%]
                        ">
                            Why cutomers love
                            <span className="flex justify-center !font-[700]">
                                working with us
                            </span>
                        </TypographyTitle>
                    </Col>
                    <Col xs={24} className="mb-[30px] md:mb-[60px]">
                        <Slider ref={mainSliderRef} {...sliderSettings.main}>
                            {data.map((item, index) => (
                                <div key={index} className="mx-auto relative">
                                    <div className="relative w-full max-w-[85%] md:max-w-[535px] mx-auto">
                                        <img src={IconQuoteLeft} alt="quote" className="w-[20px] h-[20px] absolute top-[0] left-[-20px] md:left-[-50px]" />
                                        <div className="px-4">
                                            <p className="text-lg text-[700] mb-[0] text-[18px] text-[#718096] leading-[2] text-center">
                                                {item.content}
                                            </p>
                                        </div>
                                        <img src={IconQuoteRight} alt="quote" className="w-[20px] h-[20px] absolute bottom-[0] right-[-20px] md:right-[-50px]" />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </Col>
                        
                    <Col xs={24}  className="mx-auto">
                        <Slider ref={navSliderRef} {...sliderSettings.nav}>
                            {data.map((item, index) => (
                                <div key={index} className="px-2">
                                    <div 
                                        className="
                                            flex flex-col items-center 
                                            p-4 rounded-lg cursor-pointer
                                            transition-all duration-300
                                            hover:bg-gray-50
                                            border-2 border-transparent
                                            hover:border-blue-300
                                        "
                                        onClick={() => handleNavClick(index)}
                                    >
                                        <div className="thumbnail flex items-center justify-center w-[85px] h-[85px] rounded-[50%] overflow-hidden mb-[10px]">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="flex justify-center mb-[5px]">
                                                {[...Array(item.star)].map((_, i) => (
                                                    <img key={i} src={IconStar} alt="star" className="w-[25px] h-[25px]" />
                                                ))}
                                            </div>
                                            <Typography.Title level={5} className="title-customer !mb-[0] !text-[18px] !font-[700]">
                                                {item.name}
                                            </Typography.Title>
                                            <Typography.Text className="!text-[14px] !font-[400] !text-[#718096]">
                                                {item.position}
                                            </Typography.Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default WhyCustomerLove;