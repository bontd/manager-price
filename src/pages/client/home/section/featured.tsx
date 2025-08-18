import TypographyTitle from "@/pages/client/component/typographyTitle";
import { RightOutlined } from "@ant-design/icons";
import { Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useNews from "@/hook/useNews";

const Featured = () => {

    const { dataClient, metaClient, isLoadingClient, isFetchingClient } = useNews({
        current: 1,
        pageSize: 10,
        isClient: true,
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="w-full bg-white py-[30px] md:py-[30px] overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-[15px]">
                <TypographyTitle level={2} className="relative mt-[20px] !mb-[30px] md:!mb-[60px] text-center after:top-[-20px] after:left-[50%] after:translate-x-[-50%]">
                    Featured 
                    <span className="flex justify-center !font-[700]">
                        Resources
                    </span>
                </TypographyTitle>
            </div>
            <Slider {...settings}>
                {dataClient ? (
                    dataClient?.map((item: any, index: number) => (
                        <div key={index} className="!w-[255px] md:!w-[315px] px-[30px]">
                            <div className="w-full h-[130px] md:h-[175px] rounded-[10px] overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover !rounded-[10px]" />
                            </div>
                            <Typography.Title level={3} className="!text-[16px] !font-[500] text-[#2D3748] !my-[20px]">
                                {item.title}
                            </Typography.Title>
                            <div className="flex justify-end">
                                <Link to={`/blog/${item.id}`} className="
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
                        </div>
                    ))
                ) : (
                    <>
                        <div className="!w-[255px] md:!w-[315px] px-[30px]">
                            <Skeleton active />
                        </div>
                    </>
                )}
            </Slider>
        </div>
    )
}

export default Featured;