import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import InfoOne from './InfoOne';
import * as carActions from '../../store/car'
import InfoTwo from './InfoTwo';
import Images from './Images';

// export default function LoadingData() {
//     const { carId } = useParams();

//     const sessionUser = useSelector((state) => state.session.user);
//     const oldCar = useSelector((state) => state.car?.car?.cars[carId])
//     useEffect(() => {
//         dispatch(carActions.getSingleCar(carId));
//     }, [dispatch]);
//     if (!oldCar) return 'Please List a car to edit';
//     if (oldCar.user_id === sessionUser.id) return <EditCarForm oldCar={oldCar} carId={carId} />;
//     return "You Do Not Have Any Cars To Edit"
//   }


export default function EditCarForm({oldCar, carId, showModal, setShowModal}) {

    // const { carId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);


    const [validationErrors, setValidationErrors] = useState([]);
    // const oldCar = useSelector((state) => state.car?.car?.cars)
    console.log(oldCar);

    const [price, setPrice] = useState(oldCar?.price);
    const [mileage, setMileage] = useState(oldCar?.mileage);

    const [extColor, setExtColor] = useState(oldCar?.ext_color);
    const [intColor, setIntColor] = useState(oldCar?.int_color);
    const [bodyStyle, setBodyStyle] = useState(oldCar?.body_style);
    const [fuelType, setFuelType] = useState(oldCar?.fuel_type);

    const [year, setYear] = useState(oldCar?.year);
    const [make, setMake] = useState(oldCar?.make);
    const [model, setModel] = useState(oldCar?.model);
    const [zip, setZip] = useState(oldCar?.zip);

    const [imageUrl, setImageUrl] = useState(oldCar?.images[0]?.url)
    const history = useHistory();

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
        const data = await dispatch(carActions.editCar(car, carId))
        console.log(data);
        if(data && data.errors) {
          setValidationErrors(data.errors)
        } else {
          setShowModal(false)
        }
        // await dispatch(carActions.editCar(car, carId)).then((data) => {
        //   console.log(data);
        //   if(data && data.errors) {
        //     setValidationErrors(data.errors)
        //   } else {
        //     history.push('/myaccount')
        //   }
        // });
        // console.log(data);
        // if(data) {
        //   if (data.errors) {
        //       setValidationErrors(data.errors)
        //   }

        //   else {
        //     history.push('/myaccount')
        //   }
        // }

      };

      useEffect(() => {
        dispatch(carActions.getSingleCar(carId))
      }, [])


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


    if (!oldCar) return 'Please List a car to edit';

    if (oldCar.user_id !== sessionUser.id) return "You Do Not Have Any Cars To Edit";


      return (
        <div className="mainFormPageContainer">
            <form className='formMainDiv' onSubmit={onLogin}>
                <h2 className='playlist-form-title'>Continue to Host Your Vehicle.</h2>
                <div className='errors'>
                    {validationErrors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='formWelcomeBox'>
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
