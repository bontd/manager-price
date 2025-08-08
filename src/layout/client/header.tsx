import { Button, Col, Menu, Row, Drawer, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import Logo from "@/assets/images/Logo.svg";

const { useBreakpoint } = Grid;

const Header = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = [
    { key: "about-us", label: <a href="/about">About us</a> },
    { key: "services", label: <a href="/services">Services</a> },
    { key: "case-studies", label: <a href="/case-study">Case Studies</a> },
    { key: "blog", label: <a href="/blog">Blog</a> },
    { key: "how-it-works", label: <a href="/how-it-work">How it Works</a> },
    { key: "hire", label: <a href="/hire">Hire</a> },
  ];

  return (
    <div className="w-full sticky top-[0] z-[9999] px-[20px] py-[10px] bg-[#fff] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
      <Row align="middle" justify="space-between">
        <Col>
          <img src={Logo} alt="logo" className="w-[150px]" />
        </Col>
        {!isMobile && (
          <Col flex="auto">
            <Menu
              mode="horizontal"
              className="!bg-transparent !border-none justify-center text-[16px] !text-[#4A5568]"
              items={items}
            />
          </Col>
        )}

        <Col className="flex items-center gap-4">
          {!isMobile && (
            <Button
              type="primary"
              className="border-none bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white px-6 py-5 font-bold !text-[16px]"
            >
              Contact Us
            </Button>
          )}

          {isMobile && (
            <>
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: 24 }} />}
                onClick={() => setDrawerOpen(true)}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
              >
                <Menu
                  mode="vertical"
                  items={items}
                  className="!bg-transparent !border-none text-base font-semibold"
                  onClick={() => setDrawerOpen(false)}
                />
                <div className="mt-4">
                  <Button
                    type="primary"
                    className="w-full bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white font-bold"
                  >
                    Contact Us
                  </Button>
                </div>
              </Drawer>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
