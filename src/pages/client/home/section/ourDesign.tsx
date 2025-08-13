import { Col, Row, Typography } from "antd";
import TypographyTitle from "@/pages/client/component/typographyTitle";
import Ico1 from "@/assets/images/home/our-design/ico-01.svg";
import Ico2 from "@/assets/images/home/our-design/ico-02.svg";
import Ico3 from "@/assets/images/home/our-design/ico-03.svg";
import Ico4 from "@/assets/images/home/our-design/ico-04.svg";
import Ico5 from "@/assets/images/home/our-design/ico-05.svg";
import Ico6 from "@/assets/images/home/our-design/ico-06.svg";

const OurDesign = () => {

    const data = [
        {
            icon: Ico1,
            title: "UX Driven Engineering",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #29272E 0%, #27272E 100%)",
        },
        {
            icon: Ico2,
            title: "Developing Shared Understanding",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #68DBF2 0%, #509CF5 100%)",
        },
        {
            icon: Ico3,
            title: "Proven Experience and Expertise",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #FF92AE 3%, #FF3D9A 100%)",
        },
        {
            icon: Ico4,
            title: "Security & Intellectual Property (IP)",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #67E9F1 0%, #24E795 100%)",
        },
        {
            icon: Ico5,
            title: "Code Reviews",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #FFEF5E 0%, #F7936F 100%)",
        },
        {
            icon: Ico6,
            title: "Quality Assurance & Testing",
            description: "Unlike other companies, we are a UX first development company. Projects are driven by designers and they make sure design and experiences translate to code.",
            gradient: "linear-gradient(200deg, #F76680 0%, #57007B 100%)",
        },
    ]

    return (
        <div className="w-full bg-[#F7F7FA] px-[15px] py-[60px] md:py-[80px] border-t border-b border-[#E5E5E5] overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto">
                <Row gutter={24}>
                    <Col xs={24}>
                        <TypographyTitle level={2} className="
                            relative
                            mt-[20px]
                            !mb-[30px]
                            md:!mb-[60px]
                            text-center
                            after:top-[-20px]
                            after:left-[50%]
                            after:translate-x-[-50%]
                        ">
                            Our design and
                            <span className="flex justify-center !font-[700]">
                                development approach
                            </span>
                        </TypographyTitle>
                    </Col>
                </Row>
                <Row gutter={24} className="flex flex-wrap gap-y-[24px]">
                    {data.map((item, index) => (
                        <Col xs={24} md={12} key={index} className="flex">
                            <div className="w-full flex bg-[#fff] px-[34px] py-[50px] rounded-[10px] gap-x-[20px]">
                                <div className={`w-[60px] h-[60px] flex items-center justify-center rounded-[10px]`} style={{ background: item.gradient }}>
                                    <img src={item.icon} alt={item.title} className="w-[30px] h-[30px]" />
                                </div>
                                <div className="w-full flex-1 flex flex-col">
                                    <Typography.Title level={3} className="!text-[20px] !font-[600] !mb-[10px]">
                                        {item.title}
                                    </Typography.Title>
                                    <Typography.Paragraph className="md:!text-[14px] !mb-[0]">
                                        {item.description}
                                    </Typography.Paragraph>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default OurDesign;