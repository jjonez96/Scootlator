import { MdElectricScooter } from "react-icons/md";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <div className="d-flex justify-content-center">
        <div className="spinner-grow spinner-grow-sm text-light">
          <p className="text-info">
            <MdElectricScooter size={100} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
