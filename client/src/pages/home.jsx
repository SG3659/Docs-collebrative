import React from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import Menu from"../components/HomeMenu/SideBar"
const home = () => {
  return (
    <>
      <div className="w-screen h-screen relative ">
        {/* <Menu/> */}
        <Header />
        <div className=" bg-gray-200 w-full h-80 ">
          <div className="p-4">
            <div className="w-fit font-sans">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>
      </div>
    </>
  );
};

export default home;
