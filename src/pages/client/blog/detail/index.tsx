import useNews from "@/hook/useNews";
import { Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";
import "./detail.scss";

const BlogDetail = () => {
    const { slug } = useParams();
    const { getDetailNews, isGettingDetailNews } = useNews(null, slug);
    console.log(getDetailNews);

    if (isGettingDetailNews) {
        return (
            <div className="w-full bg-white py-[30px] md:py-[60px]">
                <div className="w-full max-w-[1200px] mx-auto px-[15px]">
                    <Skeleton active />
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full bg-white py-[30px] md:py-[60px]">
            <div className="w-full max-w-[1000px] mx-auto px-[15px]">
                <div className="w-full flex flex-col gap-[20px]">
                    <div className="w-full flex flex-col gap-[10px]">
                        <Typography.Title level={2} className="!text-[24px] !font-[700] text-[#000] !mb-[0]">{getDetailNews?.title}</Typography.Title>
                        <div className="flex items-center gap-[10px]">
                            <Typography.Text className="!text-[14px] !font-[400] text-[#000] !mb-[0]">
                                {getDetailNews?.published_at}
                            </Typography.Text>
                            |
                            <Typography.Paragraph className="!text-[16px] !font-[400] text-[#000] !mb-[0]">
                                {getDetailNews?.category?.name}
                            </Typography.Paragraph>
                        </div>
                    </div>
                    <div className="w-full h-[400px] rounded-[10px] overflow-hidden">
                        <img src={getDetailNews?.image} className="w-full h-full object-cover !rounded-[10px]" />
                    </div>
                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: getDetailNews?.content || '' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BlogDetail;