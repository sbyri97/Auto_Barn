import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings, getUserReservations, deleteTryACar } from '../../../store/booking'

import { Link, useHistory } from "react-router-dom";
import './userbookings.css'
import EditBookingFormModal from "../../BookACar/EditBookingModal";


export default function UserBookings() {
    const sessionUser = useSelector((state) => state.session.user)
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(sessionUser) {
            dispatch(getUserBookings(sessionUser.id))
            dispatch(getUserReservations(sessionUser.id))
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [sessionUser, dispatch])

    // useEffect(() => {
    //     if(sessionUser) {
    //         dispatch(getUserReservations(sessionUser.id))
    //     }
    // }, [sessionUser, dispatch])

    const cars = useSelector((state) => state.booking.booking)
    const  userCarsArray = Object.values(cars)

    const bookingDeets = useSelector((state) => state?.booking?.carReservation)



    const formatStrDate = (date) => {
        let anyDate = new Date(date);
        let options = {
            month: 'short', day: 'numeric', year: 'numeric'
        }

        return anyDate.toLocaleDateString(undefined, options)
    }


    return (
    <div className='mainbookingContainer'>
        {isloading ? (
            <h2 className="loading">Your Bookings Are Loading</h2>
        ) :
            <div className='booked-cars-main-grid'>
                {userCarsArray?.map((car, i) => (
                    <div className='booked-car-outerbox' key={`${i}`}>
                        <div className='booked-car-zip'>
                            <p className='booked-car-zip-txt'>
                                {car?.zip}
                            </p>
                            <button className="ed-del-button"
                            onClick={(e) => {
                                e.preventDefault()
                                // console.log(bookingDeets[car.id].car_id)
                                dispatch(deleteTryACar((bookingDeets[car.id].id), car.id))
                            }}
                            >Delete Booking</button>
                        </div>
                        <div className='booked-car-img-div'>
                            <img className='booked-car-img' src={car?.images?.[0].url} alt='each-car-img-alt'/>
                        </div>
                        <div className='booked-car-details-div'>
                            <p className='booked-car-detail'>
                                {car?.make} {car?.model}
                            </p>
                            <p className='booked-car-detail'>
                                $ {(car?.price)?.toLocaleString()}
                            </p>
                            {(car?.bookings?.map((booking, i) => (
                                <div className="booked-car-booking" key={`${i}`}>
                                    {(booking?.user_id === sessionUser?.id) ? (
                                        <div className="booked-car-dates">
                                            <p className="booked-car-txt">
                                                Reserved Dates: &nbsp;
                                            </p>
                                            {formatStrDate(booking?.start_date)} - {formatStrDate(booking?.end_date)}
                                        </div>
                                    ) : null
                                    }
                                </div>
                            )))}
                            <Link to={`/cars/${car.id}`} className='vehicle-detail-view-link'>
                                View Vehicle Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        }
    </div>
    )
}
