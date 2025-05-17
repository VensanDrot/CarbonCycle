import React from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  const route = useRouter();

  return (
    <div className="flex h-screen w-screen overflow-y-scroll flex-col bg-gradient-to-br from-blue-100 to-green-100">
      <Nav />
      <div className={`flex-grow h-full`}>{children}</div>
    </div>
  );
};

export default Layout;
