import { useEffect } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import DataTable from "../components/HomeHeader/Datatable";
// import { useParams } from "react-router-dom";

import axios from "axios";
const home = () => {
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
        <div className=" bg-gray-100 w-50% h-80 mt-20 rounded-2xl shadow-2xl ">
          <div className="p-4">
            <div className="w-fit font-google">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>
        <div className=" mt-10 p-3 flex justify-center ">
          <DataTable />
        </div>
      </Header>
    </>
  );
};

export default home;
