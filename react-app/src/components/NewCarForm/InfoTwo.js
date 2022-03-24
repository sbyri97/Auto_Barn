import React from "react";

export default function InfoTwo({ states }) {
    const {
        price, setPrice,
        mileage, setMileage,
        zip, setZip
    } = states;

  return (
    <div>
      <h2>&nbsp; Price</h2>
      <div className="formTextContainer">
        <input
            className="priceValue"
            type="number"
            min="0"
            placeholder="$(Enter Car Value)"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        <input
            className="mileageValue"
            type="number"
            min="0"
            value={mileage}
            placeholder="Enter Car's Mileage"
            onChange={(e) => {
              setMileage(e.target.value);
            }}
          />
        <input
            className="zipValue"
            type="number"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
      </div>
      <br />
    </div>
  );
}
