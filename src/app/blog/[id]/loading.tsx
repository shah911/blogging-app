import Loader from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
