import React, { useEffect } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";

import axios from "axios";
const home = () => {
  // const getdata = async () => {
  //   try {
  //     //  give a response
  //     const response = await axios.post(
  //       "/api/auth/get-user-info-by-id",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getdata();
  // }, []);
  return (
    <>
      <Header>
        <div className=" bg-gray-100 w-full h-80 mt-20 rounded-2xl shadow-2xl ">
          <div className="p-4">
            <div className="w-fit font-google">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>
      </Header>
    </>
  );
};

export default home;
