import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=a26bc8009d3f4b42ab7142256241407&q=${location.state.searchValue}&days=7`
        );
        setForecast(response.data);
      } catch (err) {
        setError("Error fetching the forecast data");
      }
    };

    fetchDataFunc();
  }, [location.state.searchValue]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecast) {
    return <p>Loading forecast data...</p>;
  }

  return (
    <>
      <div className="row d-flex justify-content-center py-5">
        <div className="col-md-8 col-lg-6 col-xl-5 ">
          <div
            className="card text-body d-flex"
            style={{ borderRadius: "35px" }}
          >
            {forecast.forecast.forecastday.map((element) => (
              <div className="card-body p-4 " key={element.date}>
                <div className="d-flex">
                  <h6 className="flex-grow-1">{forecast.location.name}</h6>
                  <h6>{element.date}</h6>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <h6 className="display-4 mb-0 font-weight-bold">
                    {element.day.avgtemp_c}°C
                  </h6>
                  <span className="small" style={{ color: "#868B94" }}>
                    {element.day.condition.text}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: "1 rem" }}>
                    <div>
                      <i
                        className="fas fa-wind fa-fw"
                        style={{ color: "#868B94" }}
                      ></i>
                      <span className="ms-1">
                        {element.day.maxwind_kph} km/h
                      </span>
                    </div>
                    <div>
                      <i
                        className="fas fa-tint fa-fw"
                        style={{ color: "#868B94" }}
                      ></i>
                      <span className="ms-1">{element.day.avghumidity}%</span>
                    </div>
                    <div>
                      <i
                        className="fas fa-sun fa-fw"
                        style={{ color: "#868B94" }}
                      ></i>
                      <span className="ms-1">
                        {element.day.daily_will_it_snow ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={element.day.condition.icon}
                      width="100px"
                      alt={element.day.condition.text}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
