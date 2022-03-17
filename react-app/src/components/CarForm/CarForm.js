import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';
import Images from './Images';
import Confirm from './Confirm';
import Success from './Sucess';
import StepFooter from './StepFooter';
import * as carActions from '../../store/car'

export default function CarForm() {
    const sessionUser = useSelector((state) => state.session.user);
    const [step, setStep] = useState(0);

    const [price, setPrice] = useState(0);
    const [mileage, setMileage] = useState(0);

    const [extColor, setExtColor] = useState("");
    const [intColor, setIntColor] = useState("");
    const [bodyStyle, setBodyStyle] = useState("");
    const [fuelType, setFuelType] = useState("");

    const [year, setYear] = useState(2022);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [zip, setZip] = useState(94538);

    const [imageUrl, setImageUrl] = useState("")

    const dispatch = useDispatch();


  if (sessionUser) {

    const questions = [
      "Find another home for your vehicle.",
      "Select your vehicles information.",
      "Enter the remaining details.",
      "Show off your vehicle.",
      "Please confirm your vehicles",
    ];

    const nextStep = () => {
      if (step === 4) {

        const car = {
          price,
          mileage,
          extColor,
          intColor,
          bodyStyle,
          fuelType,
          year,
          make,
          model,
          zip,
          imageUrl
        };

        console.log(car);

        dispatch(carActions.newCar(car));
      }
      setStep((step) => step + 1);
    };

    const prevStep = () => {
      setStep((step) => step - 1);
    };

    const states = {
      price, setPrice,
      mileage, setMileage,
      extColor, setExtColor,
      intColor, setIntColor,
      bodyStyle, setBodyStyle,
      fuelType, setFuelType,
      make, setMake,
      model, setModel,
      year, setYear,
      zip, setZip,
      imageUrl, setImageUrl
    };

    const disabledStateOnStepper = [
      () => false, //0
      () => (!year|| !make || !model || !bodyStyle || !fuelType || !extColor || !intColor),
      () => (!price || !mileage || !zip),
      () => (!imageUrl),
      () => false,
    ];

    const getStepRightSide = () => {
      switch (step) {
        case 0:
          return <h1 className="maintitle">Click Next to get Started</h1>;
        case 1:
          return (
              <InfoOne
              states={states}
              />
          );
        case 2:
          return (
              <InfoTwo
              states={states}
              />
          );
        case 3:
          return (
            <Images
              states={states}
            />
          );
        // case 4:
        //   return (
        //     <Confirm states={states} />
        //   );
        case 4:
          return <Success />;
        case 5:
          return <Redirect to={`/users/${sessionUser.id}/cars`} />
      }
    };

      return (
        <div className="firstPage-container">
          <div className="firstPage side">
            <h1 className="qtitle">{questions[step]}</h1>
          </div>
          <div className="firstPage content">
            <div className="primary-content">{getStepRightSide()}</div>
            {step !== 5 && (
              <StepFooter
                disabledStateOnStepper={disabledStateOnStepper[step]}
                nextStep={nextStep}
                prevStep={prevStep}
                step={step}
              />
            )}
          </div>
        </div>
      );
    } else {
      return <h1 className="pleaseLogin"> Please Login or Signup</h1>;
    }
};
