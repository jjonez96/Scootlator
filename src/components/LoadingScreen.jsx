import React from "react";
import { MdElectricScooter } from "react-icons/md";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <div className="d-flex justify-content-center">
        <div className="spinner-grow spinner-grow-sm text-light opacity-25">
          <p className="text-warning">
            <MdElectricScooter size={60} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
