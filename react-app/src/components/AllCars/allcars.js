import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as carActions from '../../store/car'

export default function AllCars() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(carActions.getCars())
    }, [dispatch])

    const cars = useSelector((state) => state.car?.car?.cars)

    console.log('THIS IS CARS', cars);
    return (
        <div className='mainCarsContainer'>
            <div className='all-cars-container-title'>
                ALL VEHICLES
                <div className='all-cars-main-grid'>
                    {cars?.map((car, i) => (
                        <div className='each-car-outerbox' key={`${i}`}>
                            <div className='each-car-zip'>
                                <p className='each-car-zip-txt'>
                                    {car.zip}
                                </p>
                            </div>
                            <div className='each-car-img-div'>
                                <img className='each-car-img' src={car.images[0].url} alt='each-car-img-alt'/>
                            </div>
                            <div className='each-car-details-div'>
                                <p className='each-car-detail'>
                                    {car.make} {car.model}
                                </p>
                                <p className='each-car-detail'>
                                    {car.price}
                                </p>
                                <p className='each-car-detail'>
                                    {car.mileage}
                                </p>
                                <p className='each-car-detail'>
                                    {car.ext_color}
                                </p>
                                <Link>
                                    View Vehicle Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
