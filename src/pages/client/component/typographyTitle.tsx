import { Typography } from "antd";

const TypographyTitle = ({ children, level, className }: { children: React.ReactNode, level?: 1 | 2 | 3 | 4 | 5, align?: string, className?: string }) => {
    return (
        <Typography.Title level={level} 
            className={`
                ${className}
                !font-[400]
                !text-[24px]
                md:!text-[32px]
                after:absolute
                after:content-[''] 
                after:block 
                after:w-[70px] 
                after:h-[5px] 
                after:bg-gradient-to-bl 
                after:from-[#F76680] 
                after:to-[#0D1C9F]
            `}>
            {children}
        </Typography.Title>
    )
}
export default TypographyTitle;