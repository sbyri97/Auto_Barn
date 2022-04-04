import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as carActions from '../../store/car'
import './allcars.css'

export default function () {

    const sessionUser = useSelector((state) => state.session.user)
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

    const cars = useSelector((state) => Object.values(state.car?.car))

    useEffect(() => {
        if(sessionUser) {
            dispatch(carActions.getSearchCars());
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [sessionUser, dispatch])

    return (
        <div>
            {(cars.length !== 0 ) ? (
                (sessionUser ?
                    <div className='mainCarsContainer'>
                        {isloading ? (
                            <h2 className='laoding'>Cars Are Loading</h2>
                        ):
                            <div className='all-cars-container-title'>
                                Results for
                                <div className='all-cars-main-grid'>
                                    {cars?.map((car, i) => (
                                        <div className='each-car-outerbox' key={`${i}`}>
                                            <div className='each-car-zip'>
                                                <p className='each-car-zip-txt'>
                                                    Location: {car.zip}
                                                </p>
                                            </div>
                                            <div className='each-car-img-div'>
                                                <img className='each-car-img'
                                                src={car.images?.[0].url}
                                                alt='each-car-img-alt'
                                                onError={(e) => {
                                                    e.target.src = "https://tonkinwilsonvillenissan.com/content/plugins/dealer-tower/assets/img/no_photo.jpg"
                                                }}
                                                />
                                            </div>
                                            <div className='each-car-details-div'>
                                                <p className='each-car-detail'>
                                                    {car.ext_color}
                                                </p>
                                                <p className='each-car-detail'>
                                                   {car.year} {car.make} {car.model}
                                                </p>
                                                <p className='each-car-detail'>
                                                    $ {Number(car?.price).toLocaleString()}
                                                </p>
                                                <p className='each-car-detail'>
                                                    Mileage: {Number(car?.mileage).toLocaleString()}
                                                </p>
                                                <Link to={`/cars/${car.id}`} className="vehicle-detail-view-link">
                                                    View Vehicle Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                :
                <div className='noSessionUser'>
                    <h2>Please Login or SignUp</h2>
                </div>
                )
            )
            :
            <div className='no-cars'>There are no cars for sale at the moment</div>
            }
        </div>
    )
}
