import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({
    country: [],
    state: [],
    city: [],
  });
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    fetchState();
  }, [country]);

  useEffect(() => {
    fetchCity();
  }, [country, state]);

  const fetchCountry = async () => {
    const response = await fetch(
      "https://crio-location-selector.onrender.com/countries"
    );
    const country_data = await response.json();
    setData((prev_data) => ({
      country: country_data,
      state: prev_data.state,
      city: prev_data.city,
    }));
  };

  const fetchState = async () => {
    if (country) {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const state_data = await response.json();
      setData((prev_data) => ({
        country: prev_data.country,
        state: state_data,
        city: prev_data.city,
      }));
    }
  };

  const fetchCity = async () => {
    if (country && state) {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const city_data = await response.json();
      console.log(data);
      setData((prev_data) => ({
        country: prev_data.country,
        state: prev_data.state,
        city: city_data,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Select Location</h1>

      <select
        name="country"
        id="country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
          setCity("");
        }}
      >
        <option value="" selected>
          Select Country
        </option>
        {data.country.length &&
          data.country.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
      </select>

      <select
        name="state"
        id="state"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setCity("");
        }}
        disabled={country ? false : true}
      >
        <option value="" selected>
          Select State
        </option>
        {data.state.length &&
          data.state.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
      </select>

      <select
        name="city"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={country && state ? false : true}
      >
        <option value="" selected>
          Select City
        </option>
        {data.city.length &&
          data.city.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
      </select>
      {city ? (
        <p>
          <strong>{`You selected ${city}, `}</strong>
          <span style={{ color: "grey" }}>{`${state}, ${country}`}</span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
