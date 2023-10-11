import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Verified() {
  const [data, setData] = useState({});
  const {userId, uniqueString} = useParams();
  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.get(`/verify/${userId}/${uniqueString}`);
        setData(result.data);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      }
    };

    verify();
  }, [userId, uniqueString]);

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
