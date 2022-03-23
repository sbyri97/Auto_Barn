import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCars from "../UserCars/UserCars";
import { getUserBookings } from "../../store/booking";
import UserBookings from "../UserCars/UserBookings/UserBooking";


export default function MyAccount() {

    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const user_id = sessionUser?.id


    return (
        <div className="my-acc-main-div">
            <h2 className="my-acc-main-txt">
                My Account
            </h2>
            <div className="my-acc-cars-div">
                <UserCars />
            </div>
            <div className="my-acc-bookings-container">
                <h2 className="my-acc-booking-txt">
                    My Bookings
                </h2>
                <div className="my-acc-bookings-div">
                    <UserBookings />
                </div>
            </div>
        </div>
    )
}
