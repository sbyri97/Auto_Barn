import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as carActions from '../../store/car'
import { Link, useHistory } from "react-router-dom";
import EditCarForm from "../EditCarForm/EditCarForm";
import EditCarFormModal from "../EditCarForm/editModal";


export default function UserCars() {
    const sessionUser = useSelector((state) => state.session.user)
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const history = useHistory()

    const userCarsArray = useSelector((state) => Object.values(state.car.userCars))
    // console.log('why is this loading', cars);


    useEffect(() => {
        if(sessionUser) {
            dispatch(carActions.getUserCars(sessionUser.id));
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [sessionUser, dispatch])

    console.log(userCarsArray);

    // console.log('why is this loading when back arrow', cars);
    // const  userCarsArray = Object.values(cars)



    return (
        <div>
            {(userCarsArray.length !== 0) ? (
                <div className='mainCarsContainer'>
                    {isloading ? (
                        <h2 className="loading">Your Cars Are Loading</h2>
                    ) :
                        <div className='all-cars-container-title'>
                            Your Vehicles
                            <div className='all-cars-main-grid'>
                                {userCarsArray?.map((car, i) => (
                                    ((sessionUser?.id === car?.user_id) ?
                                    <div className='each-car-outerbox' key={`${i}`}>
                                        <div className='each-car-zip'>
                                            <p className='each-car-zip-txt'>
                                                {car.zip}
                                            </p>
                                            <EditCarFormModal oldCar={car} carId={car.id}/>
                                            <button className="ed-del-button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(carActions.deleteCar(car.id, car.bookings))
                                            }}
                                            >Delete</button>
                                        </div>
                                        <div className='each-car-img-div'>
                                            <img className='each-car-img'
                                            src={car?.images?.[0].url}
                                            alt='each-car-img-alt'
                                            onError={(e) => {
                                                e.target.src = "https://tonkinwilsonvillenissan.com/content/plugins/dealer-tower/assets/img/no_photo.jpg"
                                            }}
                                            />
                                        </div>
                                        <div className='each-car-details-div'>
                                            <p className='each-car-detail'>
                                            {car.year} {car.make} {car.model}
                                            </p>
                                            <p className='each-car-detail'>
                                                $ {Number(car?.price)?.toLocaleString()}
                                            </p>
                                            <p className='each-car-detail'>
                                                Mileage: {Number(car?.mileage)?.toLocaleString()}
                                            </p>
                                            <p className='each-car-detail'>
                                                {car.ext_color}
                                            </p>
                                            <Link to={`/cars/${car.id}`} className='vehicle-detail-view-link'>
                                                View Vehicle Details
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    null)
                                ))}
                            </div>
                        </div>
                    }
                </div>
            ):
            <div className="no-cars-bookings"> YOU DO NOT HAVE ANY VEHICLES </div>
            }
        </div>
    )
}
