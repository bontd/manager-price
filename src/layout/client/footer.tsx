import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ImgLogo from "@/assets/images/logo.svg";
import dayjs from "dayjs";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <div className="w-full bg-[#fff] px-[15px]">
            <div className="w-full max-w-[1200px] mx-auto py-[60px]">
                <Row gutter={24}>
                    <Col xs={24} sm={8}>
                        <div className="w-full flex flex-col mb-5">
                            <img src={ImgLogo} alt="Logo" className="w-[100px]" />
                        </div>
                        <Typography.Paragraph className="text-[18px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        </Typography.Paragraph>
                    </Col>
                    <Col xs={24} sm={16} className="flex gap-[30px]">
                        <Row gutter={24}>
                            <Col xs={24} sm={6}>
                                <Typography.Title level={5} className="!mb-5 !font-[700]">Links</Typography.Title>
                                <ul className="flex flex-col gap-[10px]">
                                    <li>
                                        <Link to="/">About Us</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Services</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Case Studies</Link>
                                    </li>
                                    <li>
                                        <Link to="/">How it works</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Careers</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Areas We Serve</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={24} sm={10}>
                                <Typography.Title level={5} className="!mb-5 !font-[700]">Contact Us</Typography.Title>
                                <Typography.Paragraph className="text-[18px]">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                </Typography.Paragraph>
                                <Typography.Paragraph className="text-[18px]">
                                    +84 0963 551 594
                                </Typography.Paragraph>
                            </Col>
                            <Col xs={24} sm={8} className="flex items-end">
                                <div className="w-full flex gap-[10px] text-[14px]">
                                    <Link to="https://www.facebook.com/bontran25" target="_blank" className="w-[34px] h-[34px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-[50%] p-[5px] flex items-center justify-center">
                                        <FacebookOutlined />
                                    </Link>
                                    <Link to="https://www.instagram.com/bond_25" target="_blank" className="w-[34px] h-[34px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-[50%] p-[5px] flex items-center justify-center">
                                        <InstagramOutlined />
                                    </Link>
                                    <Link to="/" target="_blank" className="w-[34px] h-[34px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-[50%] p-[5px] flex items-center justify-center">
                                        <TwitterOutlined />
                                    </Link>
                                    <Link to="/" target="_blank" className="w-[34px] h-[34px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-[50%] p-[5px] flex items-center justify-center">
                                        <YoutubeOutlined />
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Typography.Paragraph className="text-[12px] text-center border-t border-[#E7DAED] py-5">
                © {dayjs().year()} Copyright by Bond Developers. All rights reserved.
            </Typography.Paragraph>
        </div>
    )
}
export default Footer;