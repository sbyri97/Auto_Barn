import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InfoOne from './InfoOne';
import * as carActions from '../../store/car'
import InfoTwo from './InfoTwo';
import Images from './Images';


export default function NewCarForm() {
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);


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

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(carActions.newCar(car));
        console.log(data);
        if (data) {
          setErrors(data);
        }
        if (sessionUser) {
            return <Redirect to='/' />;
        }
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

      return (
        <div className="mainFormPageContainer">
            <form className='formMainDiv' onSubmit={onLogin}>
                {/* <div className='errors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
                </div> */}
                <div className='formWelcomeBox'>
                <h2 className='formWelcomeBoxTxt'>Continue to Host Your Vehicle.</h2>
                </div>
                <div>
                    <InfoOne states={states}/>
                </div>
                <div>
                    <InfoTwo states={states}/>
                </div>
                <div>
                    <Images states={states}/>
                </div>
                <div className='loginSubmitButtons'>
                <button type='submit' className='loginSubmitBtn'>Submit Car</button>
                </div>
            </form>
        </div>
      );
};
