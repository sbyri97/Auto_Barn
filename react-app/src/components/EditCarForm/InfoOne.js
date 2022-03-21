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
        {label: 'Mercedes-Benz', value: 'Mercedes-Benz'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Audi', value: 'Audi'},
        {label: 'Porsche', value: 'Porsche'},
    ]

    const fuelTypeOptions = [
        {label: 'Gasoline', value: 'Gasoline'},
        {label: 'Hybrid', value: 'Hybrid'},
        {label: 'Electric', value: 'Electric'},
    ]


    const bodyStyleOptions = [
        {label: 'Sedan', value: 'Sedan'},
        {label: 'SUV', value: 'SUV'},
        {label: 'Coupe', value: 'Coupe'},
        {label: 'Convertible', value: 'Convertible'},
    ]

    const extColorOptions = [
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
        {label: 'Beige', value: 'Beige'},
        {label: 'Black', value: 'Black'},
        {label: 'Brown', value: 'Brown'},
        {label: 'Grey', value: 'Grey'},
        {label: 'Other', value: 'Other'},
    ]



  return (
    <div>
      <h2>&nbsp; Year</h2>
      <label className="optionsLabel">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {yearOptions.map((yearOption) => (
                <option value={yearOption.value}>{yearOption.label}</option>
            ))}
          </select>
      </label>
      <label className="optionsLabel">
          <select value={make} onChange={(e) => setMake(e.target.value)}>
            {makeOptions.map((makeOption) => (
                <option value={makeOption.value}>{makeOption.label}</option>
            ))}
          </select>
      </label>
      <label>
        <div className="formTextContainer">
            <input
            className="formTextBox"
            type="text"
            placeholder="Enter Car Model"
            value={model}
            onChange={(e) => {
                setModel(e.target.value)}} />
        </div>
      </label>
      <label className="optionsLabel">
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            {fuelTypeOptions.map((fuelTypeOption) => (
                <option value={fuelTypeOption.value}>{fuelTypeOption.label}</option>
            ))}
          </select>
      </label>
      <label className="optionsLabel">
          <select value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}>
            {bodyStyleOptions.map((bodyStyleOption) => (
                <option value={bodyStyleOption.value}>{bodyStyleOption.label}</option>
            ))}
          </select>
      </label>
      <label className="optionsLabel">
          <select value={extColor} onChange={(e) => setExtColor(e.target.value)}>
            {extColorOptions.map((extColorOption) => (
                <option value={extColorOption.value}>{extColorOption.label}</option>
            ))}
          </select>
      </label>
      <label className="optionsLabel">
          <select value={intColor} onChange={(e) => setIntColor(e.target.value)}>
            {intColorOptions.map((intColorOption) => (
                <option value={intColorOption.value}>{intColorOption.label}</option>
            ))}
          </select>
      </label>
    </div>
  );
}
