import axios from "axios";
import { useState, useEffect } from "react";

function Verified() {
  const [data, setData] = useState({});

  useEffect(() => {
    const verify = async () => {
      const userId = window.location.pathname.split("/")[2];
      const uniqueString = window.location.pathname.split("/")[3];
      try {
        const result = await axios.get(`/verify/${userId}/${uniqueString}`);
        setData(result.data);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      }
    };

    verify();
  }, []);

  return (
    <div>
      {data ? (
        <p>{data.error ? data.error : data.success}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Verified;
