import React from "react";

export default function InfoTwo({ states }) {
    const {
        price, setPrice,
        mileage, setMileage,
        zip, setZip
    } = states;

  return (
    <div className="info-div">
      <h2 className="info-title">&nbsp; Few More Details...</h2>
      <div className="info-two-text-forms">
        <div className="price-mileage-zip">
          <h3>Price: </h3>
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
        </div>
        <div className="price-mileage-zip">
          <h3>Mileage:</h3>
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
        </div>
        <div className="price-mileage-zip">
          <h3>Zip Code:</h3>
          <input
              className="zipValue"
              type="number"
              value={zip}
              placeholder="Zip Code"
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
        </div>
      </div>
      <br />
    </div>
  );
}
