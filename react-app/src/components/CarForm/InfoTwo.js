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
        <textarea
        className="formTextBox"
        type="text"
        placeholder="Enter a price"
        value={price}
        onChange={(e) => {
            setPrice(e.target.setPrice)}} />
      </div>
      <br />
    </div>
  );
}
