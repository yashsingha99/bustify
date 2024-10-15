import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10); 
  const message = "Error Occurred"; 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="bg-customColor text-white mt-16 w-full h-screen">
      <div className="w-full ">
        <div className="flex items-center justify-center w-full">
          <div
            className="w-1/2 flex h-80 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: `url("https://assets.mongodb-cdn.com/mms/static/images/sadface.gif")`,
            }}>
          </div>
          <div className=" flex justify-start text-start w-1/5">{`{ message: "${message}" }`}</div>
        </div>
        <p className="text-center">Oops! Something went wrong.</p>
        <p className="text-center">
          If you're experiencing a critical issue, please{" "}
          <a href="mailto:atlas-help@mongodb.com">email support</a>.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;