import React from 'react';
import { BallTriangle } from "react-loader-spinner";

const Spinner = () => {
    return (
        <div className="w-2/12 mx-auto my-20">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
    );
};

export default Spinner;