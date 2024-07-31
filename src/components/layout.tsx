import { Box, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import Footer from "./footer";
import logoCafe from "../assets/logoCafe.png";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Box>
        <header
          className="h-14 px-8 border border-t-0 border-x-0 border-solid border-neutral-200"
          style={{ backgroundColor: 'rgba(254,154,131,255)' }} 
        >
          <div className="flex justify-between">
            <div>
              <img src={logoCafe} alt="Logo" className="h-14 w-auto" />
            </div>

            <Group className="h-14 gap-0">
              <Link
                to={"/"}
                className="flex items-center h-14 px-1 no-underline text-white font-semibold text-sm"
              >
                หน้าหลัก
              </Link>

              <Link
                to={"/books"}
                className="flex items-center h-14 px-1 no-underline text-white font-semibold text-sm"
              >
                หนังสือ
              </Link>

              <Link
                to={"/menus"}
                className="flex items-center h-14 px-1 no-underline text-white font-semibold text-sm"
              >
                เมนู
              </Link>
              <Link
                to={"/orders"}
                className="flex items-center h-14 px-1 no-underline text-white font-semibold text-sm"
              >
                ดูออเดอร์
              </Link>
            </Group>

            <div></div>
          </div>
        </header>
      </Box>

      <main>{children}</main>
      <Footer />
    </>
  );
}
