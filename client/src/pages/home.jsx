import { useEffect } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";

// import { useParams } from "react-router-dom";

import axios from "axios";
const home = () => {
  // const params = useParams();
  // const getdata = async () => {
  //   try {
  //     //  give a response
  //     const response = await axios.get(
  //       "/api/docs/getAllDocs",
  //       { userId: params.id },
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
