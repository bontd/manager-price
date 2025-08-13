import { Col, Row, Tabs } from "antd";
import TypographyTitle from "@/pages/client/component/typographyTitle";
import ImageBackend01 from "@/assets/images/home/tech/backend-01.png";
import ImageBackend02 from "@/assets/images/home/tech/backend-02.png";
import ImageBackend03 from "@/assets/images/home/tech/backend-03.png";
import ImageBackend04 from "@/assets/images/home/tech/backend-04.png";
import ImageBackend05 from "@/assets/images/home/tech/backend-05.png";
import ImageBackend06 from "@/assets/images/home/tech/backend-06.png";
import ImageBackend07 from "@/assets/images/home/tech/backend-07.png";
import ImageBackend08 from "@/assets/images/home/tech/backend-08.png";
import ImageBackend09 from "@/assets/images/home/tech/backend-09.png";

const OurTech = () => {

    const Backend = () => {
        return (
            <Row gutter={30} className="w-full flex flex-wrap justify-center">
                {
                    [
                        ImageBackend01, 
                        ImageBackend02, 
                        ImageBackend03, 
                        ImageBackend04, 
                        ImageBackend05, 
                        ImageBackend06, 
                        ImageBackend07, 
                        ImageBackend08, 
                        ImageBackend09
                    ].map((item, index) => (
                        <Col key={index} span={5} className="flex justify-center items-center w-full h-[100px]">
                            <img src={item} alt="" className="" />
                        </Col>
                    ))
                }
            </Row>
        )
    }

    const Frontend = () => {
        return (
            <div>
                <h1>Frontend</h1>
            </div>
        )
    }

    const items = [
        {
            key: "1",
            label: "Backend",
            children: <Backend />,
        },
        {
            key: "2",
            label: "Frontend",
            children: <Frontend />,
        },
        {
            key: "3",
            label: "Database",
            children: <div>Database</div>,
        },
        {
            key: "4",
            label: "CMS",
            children: <div>CMS</div>,
        },
        {
            key: "5",
            label: "CloudTesting",
            children: <div>CloudTesting</div>,
        },
        {
            key: "6",
            label: "DevOps",
            children: <div>DevOps</div>,
        }
    ];

    return (
        <div className="w-full bg-[#fff] px-[15px] py-[60px] md:py-[80px] border-t border-b border-[#E5E5E5] overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto">
                <TypographyTitle level={2} className="relative mt-[20px] !mb-[30px] md:!mb-[60px] text-center after:top-[-20px] after:left-[50%] after:translate-x-[-50%]">
                    Our
                    <span className="flex justify-center !font-[700]">
                        Tech Stack
                    </span>
                </TypographyTitle>
                <Tabs defaultActiveKey="1" items={items} centered={true} className="custom-tabs" />
            </div>
        </div>
    )
}

export default OurTech;