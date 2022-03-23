import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams, Link } from 'react-router-dom';
import * as carActions from '../../store/car'
import BookingFormModal from '../BookACar/BookCarModal';
import './eachcar.css'

export default function EachCar() {
    const { carId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const sessionUser = useSelector((state) => state.session.user);
    const theCar = useSelector((state) => state.car?.car?.cars)
    const [isloading, setIsLoading] = useState(true);


    useEffect(() => {
      if(sessionUser) {
        dispatch(carActions.getSingleCar(carId));
        setTimeout(() => {
            setIsLoading(false);
        }, 200)
    }
    }, [sessionUser, dispatch]);

    const diffUser = (sessionUser?.id !== theCar?.user_id)


    if (!theCar) return 'The car you are looking for is no longer available';

    return (
        <div className='single-car-main-div'>
            {isloading ? (
                <h2 className="loading">Your Cars Is Loading</h2>
            ):
            <>
                <div className='back-to-all-btn'>
                    <Link to='/allcars'>Back To All Cars</Link>
                </div>
                <div className='single-car-upper-box'>
                    <div className='single-car-img-div'>
                        <img className='single-car-img' src={theCar?.images[0]?.url}/>
                    </div>
                    <div className='single-car-upper-info'>
                        <h2 className='single-car-title'>
                            {theCar.make} {theCar.model}
                        </h2>
                        <h2 className='single-car-price'>
                            Price: ${(theCar.price).toLocaleString()}
                        </h2>
                        {sessionUser && diffUser && (
                         <BookingFormModal carId={carId}/>
                        )}
                    </div>
                </div>
                <div className='single-car-lower-box'>
                    Vehicle Information
                    <div className='single-lower-box-grid'>
                        <h3 className='single-car-lower-info'>
                        Stock # 81323{theCar.id}
                        </h3>
                        <h3 className='single-car-lower-info'>
                        Mileage : {(theCar.mileage).toLocaleString()}
                        </h3>
                        <h3 className='single-car-lower-info'>
                        Exterior Color: {theCar.ext_color}
                        </h3>
                        <h3 className='single-car-lower-info'>
                        Interior Color: {theCar.int_color}
                        </h3>
                        <h3 className='single-car-lower-info'>
                        Body Style: {theCar.body_style}
                        </h3>
                        <h3 className='single-car-lower-info'>
                        Fuel Type: {theCar.fuel_type}
                        </h3>
                    </div>
                </div>
            </>
            }
        </div>
    )
  }
