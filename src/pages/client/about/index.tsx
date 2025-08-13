import TypographyTitle from "@/pages/client/component/typographyTitle";

const About = () => {
    return (
        <div className="w-full bg-white py-[30px] md:py-[60px]">
            <div className="w-full max-w-[1200px] mx-auto px-[15px]">
                <TypographyTitle level={2} className="relative mt-[20px] !mb-[30px] md:!mb-[60px] text-center after:top-[-20px] after:left-[50%] after:translate-x-[-50%]">
                    About
                </TypographyTitle>
            </div>
        </div>
    );
};

export default About;