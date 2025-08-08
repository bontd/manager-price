import { Button, Col, Row, Typography } from "antd";
import BannerImage from '@/assets/images/banner.png';

const Banner = () => {
    return (
        <div className="w-full bg-[#ffffff] px-[15px] pt-[30px] md:pt-[70px] md:pb-[100px] relative overflow-hidden z-[1]">
            <div className="w-full max-w-[1200px] mx-auto">
                <Row gutter={24} className="flex items-center">
                    <Col xs={24} sm={24} md={12}>
                        <Typography.Title level={1} className="">
                            <span className="flex gap-[10px] font-[100] text-[35px] sm:text-[45px] md:text-[55px]">
                                Great 
                                <span className="
                                    bg-gradient-to-b 
                                    from-[#DE4396] 
                                    to-[#0D1C9F] 
                                    bg-clip-text 
                                    text-transparent
                                    !font-[700]
                                ">
                                    Product
                                </span> 
                                is
                            </span>
                            <span className="flex gap-[10px] font-[700] text-[35px] sm:text-[45px] md:text-[53px]">
                                built by great 
                                <span className="
                                    bg-gradient-to-b 
                                    from-[#DE4396] 
                                    to-[#0D1C9F] 
                                    bg-clip-text 
                                    text-transparent
                                    !font-[700]
                                ">
                                        teams
                                </span>
                            </span>
                        </Typography.Title>
                        <Typography.Paragraph className="text-[18px] text-[#4A5568] font-[400]">
                            We help build and manage a team of world-class developers to bring your vision to life
                        </Typography.Paragraph>
                        <Button type="primary" className="
                            !border-none
                            !bg-gradient-to-r
                            !from-[#6675F7]
                            !to-[#57007B]
                            !text-[#fff]
                            !p-[20px]
                            !font-bold
                            hover:!from-[#57007B]
                            hover:!to-[#6675F7]
                            !transition-all
                        ">
                            Let’s get started!
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <img src={BannerImage} alt="banner" className="w-full" />
                    </Col>
                </Row>
            </div>
            <div className="
                absolute 
                bottom-[-30px] 
                left-[40%] 
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
    );
};

export default Banner;