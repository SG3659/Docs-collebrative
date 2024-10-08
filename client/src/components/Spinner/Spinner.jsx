import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center   h-screen w-screen bg-white opacity-55 ">
      <div className="loader"></div>
      <p className="text-bg-Dark text-lg font-semibold ">Loading...</p>
    </div>
  );
};

export default Spinner;
