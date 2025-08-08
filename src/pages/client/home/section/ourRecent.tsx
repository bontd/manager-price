import { Button, Col, Row, Typography } from "antd";
import TypographyTitle from "@/pages/client/component/typographyTitle";
import { Link } from "react-router-dom";
import Image1 from "@/assets/images/home/our/img-01.png";
import Image2 from "@/assets/images/home/our/img-02.png";
import Image3 from "@/assets/images/home/our/img-03.png";
import { RightOutlined } from "@ant-design/icons";
import ImgDecoTop from "@/assets/images/img-arrow-top.png";
import ImgDecoBottom from "@/assets/images/img-arrow-bottom.png";


const OurRecent = () => {
    return (
        <Row className="py-[30px] md:py-[90px] bg-[#F7F7FA] border-t border-b border-[#E7DAED] px-[25px]">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[35px] relative z-[1]">
                <div className="absolute top-[0px] left-[200px] w-[18px] h-[18px] bg-gradient-to-bl from-[#F76680] to-[#57007B] rounded-[50%]  z-[-1]"></div>
                <div className="absolute top-[-200px] left-[-100px] w-[251px] h-[220px] z-[-1]">
                    <img src={ImgDecoTop} alt="Deco Top" />
                </div>
                <div className="absolute top-[-200px] right-[-100px] w-[214px] h-[295px] z-[-1]">
                    <img src={ImgDecoBottom} alt="Deco Bottom" />
                </div>
                <TypographyTitle level={2} className="
                    text-center
                    relative
                    mt-[20px]
                    after:top-[-20px]
                    after:left-[50%]
                    after:translate-x-[-50%]
                ">
                    Our recent
                    <span className="flex justify-center !font-[700]">
                        Case studies
                    </span>
                </TypographyTitle>
                <Row gutter={24} className="bg-[#F1F2FF] rounded-[20px] border border-[#E7DAED] overflow-hidden">
                    <Col xs={24} md={12} className="!p-[0]">
                        <img src={Image1} alt="Our Recent" />
                    </Col>
                    <Col xs={24} md={12} className="p-[15px] md:!p-[40px] flex flex-col justify-center">
                        <Typography.Title level={3}>Website Design for SCFC Canada</Typography.Title>
                        <Typography.Paragraph>
                            Born out of a vision, a single-minded objective that puts service before anything else, Swift Clearance and Forwarding Corp. surging forth to deliver the best services in the shipping and logistics scenario. Its meteoric rise stems out of a solid foundation. The management boasts of over 20 years of rich and varied experience in the shipping and freight forwarding industry.
                        </Typography.Paragraph>
                        <div className="flex justify-end">
                            <Link to="/contact" className="
                                !text-[14px] 
                                !font-[500] 
                                flex
                                items-center
                                gap-[5px]
                                text-gradient
                            ">
                                Raed more
                                <span className="!text-[10px] !text-[#57007B]"><RightOutlined/></span>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} className="bg-[#F0FFF7] rounded-[20px] border border-[#E7DAED] overflow-hidden">
                    <Col xs={24} md={12} className="!p-[0]">
                        <img src={Image2} alt="Our Recent" />
                    </Col>
                    <Col xs={24} md={12} className="p-[15px] md:!p-[40px] flex flex-col justify-center">
                        <Typography.Title level={3}>Website Design for SCFC Canada</Typography.Title>
                        <Typography.Paragraph>
                            Born out of a vision, a single-minded objective that puts service before anything else, Swift Clearance and Forwarding Corp. surging forth to deliver the best services in the shipping and logistics scenario. Its meteoric rise stems out of a solid foundation. The management boasts of over 20 years of rich and varied experience in the shipping and freight forwarding industry.
                        </Typography.Paragraph>
                        <div className="flex justify-end">
                            <Link to="/contact" className="
                                !text-[14px] 
                                !font-[500] 
                                flex
                                items-center
                                gap-[5px]
                                text-gradient
                            ">
                                Raed more
                                <span className="!text-[10px] !text-[#57007B]"><RightOutlined/></span>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} className="bg-[#FFF4F4] rounded-[20px] border border-[#E7DAED] overflow-hidden">
                    <Col xs={24} md={12} className="!p-[0]">
                        <img src={Image3} alt="Our Recent" />
                    </Col>
                    <Col xs={24} md={12} className="p-[15px] md:!p-[40px] flex flex-col justify-center">
                        <Typography.Title level={3}>Website Design for SCFC Canada</Typography.Title>
                        <Typography.Paragraph>
                            Born out of a vision, a single-minded objective that puts service before anything else, Swift Clearance and Forwarding Corp. surging forth to deliver the best services in the shipping and logistics scenario. Its meteoric rise stems out of a solid foundation. The management boasts of over 20 years of rich and varied experience in the shipping and freight forwarding industry.
                        </Typography.Paragraph>
                        <div className="flex justify-end">
                            <Link to="/contact" className="
                                !text-[14px] 
                                !font-[500] 
                                flex
                                items-center
                                gap-[5px]
                                text-gradient
                            ">
                                Raed more
                                <span className="!text-[10px] !text-[#57007B]"><RightOutlined/></span>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <div className="flex justify-end">
                    <Link to="/case-study" className="
                        !text-[20px] 
                        !font-[500] 
                        flex
                        items-center
                        gap-[5px]
                        text-gradient
                    ">
                        Read more case studies
                        <span className="!text-[14px] !text-[#57007B]"><RightOutlined/></span>
                    </Link>
                </div>
            </div>
        </Row>
    )
}
export default OurRecent;