import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as carActions from '../../store/car'
import { Link, useHistory } from "react-router-dom";


export default function UserCars() {
    const sessionUser = useSelector((state) => state.session.user)
    // const  userCarsArray = Object.values(car)
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(sessionUser) {
            dispatch(carActions.getUserCars(sessionUser.id));
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [sessionUser, dispatch])

    const cars = useSelector((state) => state.car?.car?.cars)
    console.log('this is usercar', cars);

    const onEdit = (e) => {
        e.preventDefault()

    }

    return (
    <div className='mainCarsContainer'>
        <div className='all-cars-container-title'>
            ALL OF YOUR VEHICLES
            <div className='all-cars-main-grid'>
                {cars?.map((car, i) => (
                    <div className='each-car-outerbox' key={`${i}`}>
                        <div className='each-car-zip'>
                            <p className='each-car-zip-txt'>
                                {car.zip}
                            </p>
                            <button className="edit-button"
                            onClick={(e) => {
                                e.preventDefault();
                                let path = `/editCar/${car.id}`
                                history.push(path)
                            }}
                            >Edit
                            </button>
                            {/* <button className="delete-button">Delete</button> */}
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
