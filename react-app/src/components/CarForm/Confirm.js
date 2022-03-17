import React from "react";
import { useSelector } from "react-redux";

export default function Confirm({ states }) {
//   const user = useSelector((state) => state.session.user.username);

  const {
    price,
    mileage,
    extColor,
    intColor,
    bodyStyle,
    fuelType,
    make,
    model,
    year,
    zip,
    imageUrl
  } = states;

//   const propType = () => {
//     if (propertyType === 'Apartment') {
//       return "apartment";
//     } else return "house";
//   };

//   const placeType = () => {
//     if (privacyType === 'Entire Place') {
//       return "Entire";
//     } else return "Private";
//   };


  return (
    <div className="outerMostBox">HI
      {/* <div className="outerBox">
        <div className="innerBox">
          <div className="confirmImg">
            <img className="imgPrev" src={imageUrl}/>
          </div>
          <h1 className="confirmTitle">{name}</h1>
          <div className="confirmPropType">
            {placeType()} {propType()} hosted by {user}
          </div>
          <div className="confirmDetail">
            {guestCount < 2 ? '1 guest' : ` ${guestCount} guests`} {"\u00b7"}{" "}{bedroomCount < 2 ? '1 bedroom' : ` ${bedroomCount} bedrooms`} {"\u00b7"}{" "}
            {bedCount < 2 ? '1 bed' : ` ${bedCount} beds`} {"\u00b7"}{" "}
            {bathCount < 1 ? '0.5 bath' : ` ${bathCount} baths`}
          </div>
          <div className="confirmDescription">{description}</div>
          <div className="confirmPrice">${price} per night</div>
          <div className="confirmLocation">
            <h2 className="locText"> Location</h2>
            <div className="loc">
              {address}, {city}, {state}, {country}
            </div>
          </div>
          <br/>
        </div>
      </div> */}
    </div>
  );
}
