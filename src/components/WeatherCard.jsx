import React, { useEffect, useRef, useState } from "react";
import "../components/Css/weathercard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [value, setValue] = useState("");
  const [offer, setOffer] = useState([]);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=a26bc8009d3f4b42ab7142256241407&q=Baku`
        );
        setWeather(response.data);
        setCurrentTime(new Date(response.data.location.localtime));
      } catch (error) {
        setError("Error fetching the weather data");
      }
    };
    fetchDataFunc();

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 60000)); // Add 1 minute (60000 ms)
    }, 60000); // 1 minute interval

    return () => clearInterval(interval);
  }, []);

  const searchFunc = async (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/search.json?key=a26bc8009d3f4b42ab7142256241407&q=${e.target.value}`
        );
        setOffer(response.data);
      } catch (error) {
        setError("Error fetching the weather data");
      }
    } else {
      setOffer([]);
    }
  };

  const toggleSearchBtn = () => {
    navigate("/search", { state: { searchValue: value, offerValue: offer } });
  };

  const toggleLiBtn = (name) => {
    setValue(name);
    setOffer([]);
  };

  return (
    <>
      {weather ? (
        <div className="wrapper">
          <div className="row d-flex justify-content-center py-5">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card text-body" style={{ borderRadius: "35px" }}>
                <div className="search-box">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    ref={ref}
                    className="input"
                    value={value}
                    onChange={searchFunc}
                  />
                  <button className="input" onClick={toggleSearchBtn}>
                    Search
                  </button>
                  <div
                    className="autocomplete"
                    style={{ display: offer.length === 0 ? "none" : "block" }}
                  >
                    <ul>
                      {offer.map((element, index) => (
                        <li
                          onClick={() => toggleLiBtn(element.name)}
                          key={index}
                        >
                          {element.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex flex-row">
                    <h6 className="flex-grow-1">{weather.location.name}</h6>
                    <h6>{currentTime && currentTime.toLocaleTimeString()}</h6>
                  </div>

                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <h6 className="display-4 mb-0 font-weight-bold">
                      {weather.current.temp_c}°C
                    </h6>
                    <span className="small" style={{ color: "#868B94" }}>
                      {weather.current.condition.text}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span className="ms-1">
                          {weather.current.wind_kph} km/h
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span className="ms-1">
                          {weather.current.humidity}%
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span className="ms-1">
                          {weather.current.heatindex_c}C
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={weather.current.condition.icon}
                        width="100px"
                        alt="weather icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default WeatherCard;
