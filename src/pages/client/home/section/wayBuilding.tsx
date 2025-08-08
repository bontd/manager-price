import { Avatar, Col, Row, Typography } from "antd";
import TypographyTitle from "@/pages/client/component/typographyTitle";
import ImgCustomer01 from "@/assets/images/home/why/avatar-01.png";
import Image01 from "@/assets/images/home/waybuilding/img-01.png";
import Image02 from "@/assets/images/home/waybuilding/img-02.png";
import Image03 from "@/assets/images/home/waybuilding/img-03.png";

const WayBuilding = () => {
    return (
        <div className="w-full bg-[#fff] px-[15px] py-[60px] md:py-[80px] overflow-hidden">
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
                            Way of building
                            <span className="flex justify-center !font-[700]">Great Software</span>
                        </TypographyTitle>
                    </Col>
                </Row>
                <Row gutter={24} className="mb-[60px]">
                    <Col xs={24} md={12} className="md:!pr-[100px] flex flex-col justify-center order-2 md:order-1">
                        <div className="w-full">
                            <Typography.Title level={3}>
                                Build the right team to scale
                            </Typography.Title>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Finding the right talent is not easy. We help you find the talent that suits your needs, follows your processes, and sticks with you long term (not the case with freelancers).
                            </Typography.Paragraph>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Our <span className="bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent">delivery model</span> helps you cut costs and deliver within budget.
                            </Typography.Paragraph>
                            <Typography.Paragraph className="
                                relative
                                w-[80%]
                                pl-[15px]
                                mt-[20px]
                                md:mt-[30px]
                                md:text-[16px]
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent
                                before:content-['']
                                before:absolute
                                before:left-0
                                before:top-0
                                before:w-[3px]
                                before:h-[100%]
                                before:bg-gradient-to-bl
                                before:from-[#F76680]
                                before:to-[#57007B]
                            ">
                                "Simform is quick to identify larger problem with the Software so we decided to expand our scope to build new modules"
                            </Typography.Paragraph>
                            <div className="flex items-center gap-[10px] mt-[20px]">
                                <Avatar src={ImgCustomer01} size={40} />
                                <div className="flex flex-col flex-1">
                                    <Typography.Paragraph className="!mb-[0] !text-[16px] !font-[700]">Jeewa markram</Typography.Paragraph>
                                    <Typography.Paragraph className="!mb-[0] !text-[14px]">CEO</Typography.Paragraph>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="mb-[30px] md:!mb-[0] md:!pl-[30px] order-1 md:order-2">
                        <div className="w-full bg-[#F7F7FA] rounded-[20px] relative z-[1]">
                            <img src={Image01} alt="Image 01" className="w-full h-full object-cover" />
                            <div className="
                                absolute 
                                top-[-20px] 
                                left-[-20px] 
                                w-[60px] 
                                h-[60px] 
                                bg-gradient-to-bl
                                from-[#FFEF5E]
                                to-[#F7936F]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                            <div className="
                                absolute 
                                bottom-[-10px] 
                                left-[50%] 
                                translate-x-[-50%]
                                w-[30px] 
                                h-[30px] 
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} className="mb-[60px]">
                    <Col xs={24} md={12} className="mb-[30px] md:!mb-[0] md:!pr-[50px]">
                        <div className="w-full bg-[#F7F7FA] rounded-[20px] relative z-[1]">
                            <img src={Image02} alt="Image 01" className="w-full h-full object-cover" />
                            <div className="
                                absolute 
                                bottom-[-30px] 
                                left-[80px] 
                                w-[60px] 
                                h-[60px] 
                                bg-gradient-to-bl
                                from-[#FFEF5E]
                                to-[#F7936F]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                            <div className="
                                absolute 
                                top-[-10px] 
                                right-[-10px] 
                                w-[30px] 
                                h-[30px] 
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="md:!pl-[70px] flex flex-col justify-center">
                        <div className="w-full">
                            <Typography.Title level={3}>
                                Build the right team to scale
                            </Typography.Title>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Finding the right talent is not easy. We help you find the talent that suits your needs, follows your processes, and sticks with you long term (not the case with freelancers).
                            </Typography.Paragraph>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Our <span className="bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent">delivery model</span> helps you cut costs and deliver within budget.
                            </Typography.Paragraph>
                            <Typography.Paragraph className="
                                relative
                                w-[80%]
                                pl-[15px]
                                mt-[20px]
                                md:mt-[30px]
                                md:text-[16px]
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent
                                before:content-['']
                                before:absolute
                                before:left-0
                                before:top-0
                                before:w-[3px]
                                before:h-[100%]
                                before:bg-gradient-to-bl
                                before:from-[#F76680]
                                before:to-[#57007B]
                            ">
                                "Simform is quick to identify larger problem with the Software so we decided to expand our scope to build new modules"
                            </Typography.Paragraph>
                            <div className="flex items-center gap-[10px] mt-[20px]">
                                <Avatar src={ImgCustomer01} size={40} />
                                <div className="flex flex-col flex-1">
                                    <Typography.Paragraph className="!mb-[0] !text-[16px] !font-[700]">Jeewa markram</Typography.Paragraph>
                                    <Typography.Paragraph className="!mb-[0] !text-[14px]">CEO</Typography.Paragraph>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xs={24} md={12} className="md:!pr-[100px] flex flex-col justify-center order-2 md:order-1">
                        <div className="w-full">
                            <Typography.Title level={3}>
                                Build the right team to scale
                            </Typography.Title>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Finding the right talent is not easy. We help you find the talent that suits your needs, follows your processes, and sticks with you long term (not the case with freelancers).
                            </Typography.Paragraph>
                            <Typography.Paragraph className="md:!text-[16px]">
                                Our <span className="bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent">delivery model</span> helps you cut costs and deliver within budget.
                            </Typography.Paragraph>
                            <Typography.Paragraph className="
                                relative
                                w-[80%]
                                pl-[15px]
                                mt-[20px]
                                md:mt-[30px]
                                md:text-[16px]
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                bg-clip-text
                                text-transparent
                                before:content-['']
                                before:absolute
                                before:left-0
                                before:top-0
                                before:w-[3px]
                                before:h-[100%]
                                before:bg-gradient-to-bl
                                before:from-[#F76680]
                                before:to-[#57007B]
                            ">
                                "Simform is quick to identify larger problem with the Software so we decided to expand our scope to build new modules"
                            </Typography.Paragraph>
                            <div className="flex items-center gap-[10px] mt-[20px]">
                                <Avatar src={ImgCustomer01} size={40} />
                                <div className="flex flex-col flex-1">
                                    <Typography.Paragraph className="!mb-[0] !text-[16px] !font-[700]">Jeewa markram</Typography.Paragraph>
                                    <Typography.Paragraph className="!mb-[0] !text-[14px]">CEO</Typography.Paragraph>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="mb-[30px] md:!mb-[0] md:!pl-[30px] order-1 md:order-2">
                        <div className="w-full bg-[#F7F7FA] rounded-[20px] relative z-[1]">
                            <img src={Image03} alt="Image 01" className="w-full h-full object-cover" />
                            <div className="
                                absolute 
                                bottom-[-10px] 
                                left-[-10px] 
                                w-[30px] 
                                h-[30px] 
                                bg-gradient-to-bl
                                from-[#FFEF5E]
                                to-[#F7936F]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                            <div className="
                                absolute 
                                top-[-10px] 
                                left-[50%] 
                                translate-x-[-50%]
                                w-[30px] 
                                h-[30px] 
                                bg-gradient-to-bl
                                from-[#F76680]
                                to-[#57007B]
                                rounded-[50%] 
                                z-[-1]
                            "></div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default WayBuilding;