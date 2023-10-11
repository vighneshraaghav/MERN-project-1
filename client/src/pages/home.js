import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="ml-8 p-4">
      <h1 className="p-4 text-white text-4xl">
        Welcome to "The Conference 2023" – Your Gateway to Tech's Future!
      </h1>
      <p className="p-4 ml-2 text-white text-xl ">
        <span className="ml-24"/>Join us for an exciting exploration of the cutting-edge world of
        technology at "The Conference 2023." Our event registration website is
        your key to unlocking a world of innovation, knowledge sharing, and
        networking opportunities.
      </p>
      <h2 className="p-4 text-white text-4xl">
        Discover the Latest Trends in Technology:
      </h2>
      <p className="p-4 ml-2 text-white text-xl ">
        At "The Conference 2023," we bring together tech enthusiasts, thought
        leaders, and industry experts to discuss and delve into the hottest
        trends in the world of technology. Whether you're passionate about
        artificial intelligence, cybersecurity, or the latest in software
        development, our event has something for everyone.
      </p>
      <p className="p-4 ml-2 text-white text-xl ">
        Join us at "The Conference 2023" to be a part of the tech revolution and
        immerse yourself in the future of technology. Don't miss out.
        <button className="text-blue-400" onClick={()=>navigate('/signup')}>register now!</button>
      </p>
    </div>
  );
}

export default Home;
