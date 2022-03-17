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
            value={price}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        <input
            className="mileageValue"
            type="number"
            value={mileage}
            onChange={(e) => {
              setMileage(parseInt(e.target.value));
            }}
          />
        <input
            className="zipValue"
            type="number"
            value={zip}
            onChange={(e) => {
              setZip(parseInt(e.target.value));
            }}
          />
      </div>
      <br />
    </div>
  );
}
