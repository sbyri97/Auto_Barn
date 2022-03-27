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

    const userCarsArray = useSelector((state) => Object.values(state.booking.booking))
    const bookingDeets = useSelector((state) => state?.booking?.carReservation)
    // const  userCarsArray = Object.values(cars)

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





    const formatStrDate = (date) => {
        let anyDate = new Date(date);
        let options = {
            month: 'short', day: 'numeric', year: 'numeric'
        }
        anyDate.setDate(anyDate.getDate() + 1);


        return anyDate.toLocaleDateString(undefined, options)
    }


    return (
        <div>
            {(userCarsArray.length !== 0)? (
                <div className='mainbookingContainer'>
                    <h2 className="my-acc-booking-txt">
                        My Bookings
                    </h2>
                    {isloading ? (
                        <h2 className="loading">Your Bookings Are Loading</h2>
                    ) :
                        <div className='booked-cars-main-grid'>
                            {userCarsArray?.map((car, i) => (
                                <div>
                                    {(car?.bookings?.map((booking, j) => (
                                        ((booking?.user_id === sessionUser?.id) ? (
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
                                                    <img className='booked-car-img' src={car?.images?.[0].url}
                                                    alt='each-car-img-alt'
                                                    onError={(e) => {
                                                        e.target.src = "https://tonkinwilsonvillenissan.com/content/plugins/dealer-tower/assets/img/no_photo.jpg"
                                                    }}
                                                    />
                                                </div>
                                                <div className='booked-car-details-div'>
                                                    <p className='booked-car-detail'>
                                                    {car?.year} {car?.make} {car?.model}
                                                    </p>
                                                    <p className='booked-car-detail'>
                                                        $ {Number(car?.price)?.toLocaleString()}
                                                    </p>
                                                        <div className="booked-car-booking" key={`${j}`}>
                                                                <div className="booked-car-dates">
                                                                    <p className="booked-car-txt">
                                                                        Reserved Dates: &nbsp;
                                                                    </p>
                                                                    {formatStrDate(booking?.start_date)} - {formatStrDate(booking?.end_date)}
                                                                </div>
                                                        </div>
                                                    <Link to={`/cars/${car.id}`} className='vehicle-detail-view-link'>
                                                        View Vehicle Details
                                                    </Link>
                                                </div>
                                            </div> )
                                        : null
                                        )
                                    )))}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            )
            :
            <div className="no-cars-bookings"> YOU DO NOT HAVE ANY BOOKINGS </div>
            }
        </div>
    )
}
