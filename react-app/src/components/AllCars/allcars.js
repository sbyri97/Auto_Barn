import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
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
            <div className='eachCar'>
                <div className='eachCarUl'>
                    {cars?.map((car, i) => (
                        <div className='eachCarli' key={`${i}`}>
                            {car.year}
                            {car.make}
                            {car.model}
                            {car.body_style}
                            {car.fuel_type}
                            {car.price}
                            {car.ext_color}
                            {car.int_color}
                            <img src={car.images[0].url}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
