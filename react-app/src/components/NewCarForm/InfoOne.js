import React from "react";

export default function InfoOne({ states }) {
    const {
        extColor, setExtColor,
        intColor, setIntColor,
        bodyStyle, setBodyStyle,
        fuelType, setFuelType,
        make, setMake,
        model, setModel,
        year, setYear
    } = states;

    const yearOptions = [
        {label: 'Year *', value: null},
        {label: '2022', value: 2022},
        {label: '2021', value: 2021},
        {label: '2020', value: 2020},
        {label: '2019', value: 2019},
        {label: '2018', value: 2018},
        {label: '2017', value: 2017},
        {label: '2016', value: 2016},
        {label: '2015', value: 2015},
    ]

    const makeOptions = [
        {label: 'Make *', value: ''},
        {label: 'Mercedes-Benz', value: 'Mercedes-Benz'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Audi', value: 'Audi'},
        {label: 'Porsche', value: 'Porsche'},
    ]

    const fuelTypeOptions = [
        {label: 'Fuel Type*', value: ''},
        {label: 'Gasoline', value: 'Gasoline'},
        {label: 'Hybrid', value: 'Hybrid'},
        {label: 'Electric', value: 'Electric'},
    ]


    const bodyStyleOptions = [
        {label: 'Body Style*', value: ''},
        {label: 'Sedan', value: 'Sedan'},
        {label: 'SUV', value: 'SUV'},
        {label: 'Coupe', value: 'Coupe'},
        {label: 'Convertible', value: 'Convertible'},
    ]

    const extColorOptions = [
        {label: 'Exterior Color *', value: ''},
        {label: 'Red', value: 'Red'},
        {label: 'Blue', value: 'Blue'},
        {label: 'Green', value: 'Green'},
        {label: 'Yellow', value: 'Yellow'},
        {label: 'White', value: 'White'},
        {label: 'Grey', value: 'Grey'},
        {label: 'Silver', value: 'Silver'},
        {label: 'Other', value: 'Other'},
    ]

    const intColorOptions = [
        {label: 'Interior Color *', value: ''},
        {label: 'Beige', value: 'Beige'},
        {label: 'Black', value: 'Black'},
        {label: 'Brown', value: 'Brown'},
        {label: 'Grey', value: 'Grey'},
        {label: 'Other', value: 'Other'},
    ]


  return (
    <div className="info-div">
        <h2 className="info-title">&nbsp; Select Your Vehicle Information</h2>
        <div className="year-make-div">
        <label className="year-make year optionsLabel">
            <h3>Year:</h3>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
                {yearOptions.map((yearOption) => (
                    <option value={yearOption.value}>{yearOption.label}</option>
                ))}
            </select>
        </label>
        <label className="year-make make optionsLabel">
            <h3>Make:</h3>
            <select value={make} onChange={(e) => setMake(e.target.value)}>
                {makeOptions.map((makeOption) => (
                    <option value={makeOption.value}>{makeOption.label}</option>
                ))}
            </select>
        </label>
        </div>
        <div className="model TextContainer">
            <h3>Model: </h3>
            <input
            className="model-formTextBox"
            type="text"
            placeholder="Enter Car Model *"
            value={model}
            onChange={(e) => {
                setModel(e.target.value)}} />
        </div>
        <div className="fuel-body-div">
            <label htmlFor="Fuel Type" className="fuel-body fuel optionsLabel">
                <h3>Fuel Type:</h3>
                <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                    {fuelTypeOptions.map((fuelTypeOption) => (
                        <option value={fuelTypeOption.value}>{fuelTypeOption.label}</option>
                    ))}
                </select>
            </label>
            <label htmlFor="Body Style" className="fuel-body body optionsLabel">
                <h3>Body Style:</h3>
                <select value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}>
                    {bodyStyleOptions.map((bodyStyleOption) => (
                        <option value={bodyStyleOption.value}>{bodyStyleOption.label}</option>
                    ))}
                </select>
            </label>
        </div>
        <div className="color-div">
            <label htmlFor="Exterior Color" className="ext-int optionsLabel">
                <h3>Exterior Color:</h3>
                <select value={extColor} onChange={(e) => setExtColor(e.target.value)}>
                    {extColorOptions.map((extColorOption) => (
                        <option value={extColorOption.value}>{extColorOption.label}</option>
                    ))}
                </select>
            </label>
            <label htmlFor="Interior Color" className="ext-int optionsLabel">
                <h3>Interior Color:</h3>
                <select value={intColor} onChange={(e) => setIntColor(e.target.value)}>
                    {intColorOptions.map((intColorOption) => (
                        <option value={intColorOption.value}>{intColorOption.label}</option>
                    ))}
                </select>
            </label>
        </div>
    </div>
  );
}
