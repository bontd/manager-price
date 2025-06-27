const Footer = () => {
    return (
        <footer className="mx-4 md:mx-6 py-4 text-center">
            <div>
                <p className="text-sm md:text-base text-gray-600">
                    © {new Date().getFullYear()} Management System. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
