import TypographyTitle from "@/pages/client/component/typographyTitle";
import { Typography } from "antd";

const Development = () => {
    const data = [
        {
            key: "1",
            title: "Assemble the right team",
            description: "We handle all aspects of vetting and choosing the right team that you don't have the time, expertise, or desire to do.",
        },
        {
            key: "2",
            title: "Sprint planning",
            description: "Sprint roadmap is a collective planning effort. Team members collaborate to clarify items and ensure shared understanding.",
        },
        {
            key: "3",
            title: "Tech architecture",
            description: "We break monolithic apps into microservices. Decoupling the code allows teams to move faster and more independently",
        },
        {
            key: "4",
            title: "Standups & weekly demos",
            description: "Standups, weekly demos, and weekly reviews make sure everyone is on the same page and can raise their concerns."
        },
        {
            key: "5",
            title: "Code reviews",
            description: "Code reviews before release help detect issues like memory leaks, file leaks, performance signs, and general bad smells",
        },
        {
            key: "6",
            title: "Iterative delivery",
            description: "We divide the implementation process into several checkpoints rather than a single deadline.",
        }
    ];

    const topRow = data.filter((_, i) => i % 2 === 0);
    const bottomRow = data.filter((_, i) => i % 2 !== 0);

    return (
        <div className="w-full bg-[#fff] px-[15px] py-[60px] md:py-[80px]">
            <div className="w-full max-w-[1200px] mx-auto">
                <TypographyTitle level={2} className="relative mt-[20px] !mb-[30px] md:!mb-[60px] text-center after:top-[-20px] after:left-[50%] after:translate-x-[-50%]">
                    How development 
                    <span className="flex justify-center !font-[700]">
                        through Alcaline works
                    </span>
                </TypographyTitle>
                <div className="w-full relative overflow-auto">
                    <div className="w-full min-w-[1200px]">
                        <div className="grid grid-cols-3 pr-[40px]">
                            {
                                topRow.map((item, index) => (
                                    <div key={index} className="w-full flex px-[40px] relative">
                                        <div className="w-[2px] h-[35px] bg-[#F76680] absolute bottom-[-45px] left-[50%] -translate-x-1/2"></div>
                                        <div className="w-full flex flex-col border border-[#E5E5E5] rounded-[10px] p-[20px] gap-[10px]">
                                            <Typography.Title level={4} className="!text-[18px] !font-[700] text-[#000] !mb-[0]">
                                                <span className="bg-gradient-to-bl from-[#F76680] to-[#57007B] bg-clip-text text-transparent mr-[10px]">#{item.key}</span> 
                                                {item.title}
                                            </Typography.Title>
                                            <Typography.Paragraph className="font-[400] text-[#000] !mb-[0]">
                                                {item.description}
                                            </Typography.Paragraph>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-full h-[2px] bg-[#F76680] my-[45px]"></div>
                        <div className="grid grid-cols-3 pl-[40px]">
                            {
                                bottomRow.map((item, index) => (
                                    <div key={index} className="w-full flex px-[40px] relative">
                                        <div className="w-[2px] h-[35px] bg-[#F76680] absolute top-[-45px] left-[50%] -translate-x-1/2"></div>
                                        <div className="w-full flex flex-col border border-[#E5E5E5] rounded-[10px] p-[20px] gap-[10px]">
                                            <Typography.Title level={4} className="!text-[18px] !font-[700] text-[#000] !mb-[0]">
                                                <span className="bg-gradient-to-bl from-[#F76680] to-[#57007B] bg-clip-text text-transparent mr-[10px]">#{item.key}</span> 
                                                {item.title}
                                            </Typography.Title>
                                            <Typography.Paragraph className="font-[400] text-[#000] !mb-[0]">
                                                {item.description}
                                            </Typography.Paragraph>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Development;