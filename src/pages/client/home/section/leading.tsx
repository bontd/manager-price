import { Button, Col, Row, Typography } from "antd"
import { ArrowRightOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import ImgLeading from "@/assets/images/home/leading/img-01.png";
import TypographyTitle from "../../component/typographyTitle";

const Leading = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    return (
        <div className="w-full bg-[#fff] px-[15px] py-[30px] md:py-[100px] relative overflow-hidden z-[1]">
            <div className="w-full max-w-[1200px] mx-auto">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="md:!pr-[100px] mb-[30px] md:!mb-[0]">
                        <TypographyTitle level={2}
                            className="
                                relative
                                mt-[20px]
                                after:top-[-20px]
                                after:left-[0]
                            "
                        >
                            Leading companies trust us 
                            <span className="flex !font-[700]">to develop software</span>
                        </TypographyTitle>
                        <Typography.Paragraph className="!text-[16px] !font-[400] !text-[#4A5568] md:!mb-[50px]">
                            We add development capacity to tech teams. Our value isn't limited to building teams but is equally distributed across the project lifecycle. We are a custom software development company that guarantees the successful delivery of your project.
                        </Typography.Paragraph>
                        <Link to="/contact" className="
                            !text-[16px] 
                            !font-[500] 
                            !text-[#57007B] 
                            flex
                            items-center
                            gap-[20px]
                            hover:!text-[#0D1C9F]
                        ">
                            See more Informations
                            <ArrowRightOutlined />
                        </Link>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className="w-full relative rounded-[20px] overflow-hidden">
                        {!isVideoPlaying ? (
                            <>
                                <img src={ImgLeading} alt="Leading" className="w-full h-full object-cover" />
                                <div className="
                                    absolute 
                                    top-[50%] 
                                    left-[50%] 
                                    translate-x-[-50%] 
                                    translate-y-[-50%] 
                                    bg-[#FFFFFF]/40
                                    rounded-[50%] 
                                    p-[14px]
                                ">
                                    <Button 
                                        onClick={handlePlayVideo}
                                        className="
                                            !bg-[#57007B]
                                            !border-[1px]
                                            !border-[#fff]
                                            !text-[#fff]
                                            !text-[30px]
                                            !w-[50px]
                                            !h-[50px]
                                            !rounded-full
                                            !flex
                                            !items-center
                                            hover:!bg-[#0D1C9F]
                                        "
                                    >
                                        <CaretRightOutlined />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <iframe
                                className="w-full h-[450px]"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="Video Player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="
                absolute 
                top-[-30px] 
                left-[10%] 
                w-[60px] 
                h-[60px] 
                bg-gradient-to-bl
                from-[#F76680]
                to-[#57007B]
                rounded-[50%] 
                z-[-1]
            "></div>
        </div>
    )
}

export default Leading;