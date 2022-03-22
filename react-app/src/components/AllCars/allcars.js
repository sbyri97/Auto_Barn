import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as carActions from '../../store/car'
import './allcars.css'

export default function AllCars() {
    const sessionUser = useSelector((state) => state.session.user)
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(sessionUser) {
            dispatch(carActions.getCars());
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [sessionUser, dispatch])

    const cars = useSelector((state) => state.car?.car?.cars)

    return (
        <div className='mainCarsContainer'>
            {isloading ? (
                <h2 className='laoding'>Cars Are Loading</h2>
            ):
                <div className='all-cars-container-title'>
                    ALL VEHICLES
                    <div className='all-cars-main-grid'>
                        {cars?.map((car, i) => (
                            <div className='each-car-outerbox' key={`${i}`}>
                                <div className='each-car-zip'>
                                    <p className='each-car-zip-txt'>
                                        Location: {car.zip}
                                    </p>
                                </div>
                                <div className='each-car-img-div'>
                                    <img className='each-car-img' src={car.images[0].url} alt='each-car-img-alt'/>
                                </div>
                                <div className='each-car-details-div'>
                                    <p className='each-car-detail'>
                                        {car.ext_color}
                                    </p>
                                    <p className='each-car-detail'>
                                        {car.make} {car.model}
                                    </p>
                                    <p className='each-car-detail'>
                                        $ {(car.price).toLocaleString()}
                                    </p>
                                    <p className='each-car-detail'>
                                        Mileage: {(car.mileage).toLocaleString()}
                                    </p>
                                    <Link to={`/cars/${car.id}`}>
                                        View Vehicle Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
