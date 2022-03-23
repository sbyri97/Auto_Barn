import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editTryACar } from "../../store/booking";
import { getUserReservations } from "../../store/booking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import $ from 'jquery'
// import jquery from 'jquery'

export default function EditTryACar({carId}) {
    const sessionUser = useSelector((state) => state?.session?.user)
    const bookingDeets = useSelector((state) => state?.booking?.carReservation[carId])

    const user_id = sessionUser?.id
    const dispatch = useDispatch();
    const history = useHistory();

    const formatDate = (date) => {
        let anyDate = new Date(date);
        let year = anyDate.getFullYear();

        let month = (anyDate.getMonth() + 1).toString();
        if (month.length < 2) {
            month = '0' + month;
        }

        let day = (anyDate.getDate() + 1).toString();
        console.log(day);
        if (day.length < 2) {
            day = '0' + day;
            console.log(day);
        }

        return [year, month, day].join('-');
    }
    const start_date = formatDate(bookingDeets?.start_date)
    const end_date = formatDate(bookingDeets?.end_date)
    const booking_id = bookingDeets?.id

    const startDateState = new Date(start_date);
    startDateState.setDate(startDateState.getDate() + 1)

    const endDateState = new Date(end_date);
    endDateState.setDate(endDateState.getDate() + 1)


    const [strtDate, setStrtDate] = useState(startDateState);
    const [enddDate, setEnddDate] = useState(endDateState);
    const [errors, setErrors] = useState([]);


    const onTry = async (e) => {
      e.preventDefault();

      const startDate = formatDate(strtDate)
      const endDate = formatDate(enddDate)

      const booking = {
        booking_id,
        carId,
        user_id,
        startDate,
        endDate,
      };

      const data = await dispatch(editTryACar(booking))

      if(data && data.errors) {
          setErrors(data.errors)
      }

      if(!data.errors) {
          history.push(`/myaccount`);
      }

    };

    const todaysDate = formatDate(new Date())

    const fiveDaysLater = new Date( strtDate );
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);


    return (
      <div id='main-booking-div'>
            {sessionUser ? (
              <div className="try-car-container">
                <form id="try-a-car-form" onSubmit={onTry}>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                  <div className="create-date date">
                    <label htmlFor="startDate">Start Date</label>
                    <DatePicker
                    selected={strtDate}
                    onChange={(date) => setStrtDate(date)}
                    minDate={strtDate}
                    required/>
                    {/* <input
                      className="create-car-booking"
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      value={startDate}
                      required
                      id="startDate"
                      min={todaysDate}
                    /> */}
                  </div>
                  <div className="create-date date">
                    <label htmlFor="endDate">End Date</label>
                    <DatePicker
                    selected={enddDate}
                    onChange={(date) => setEnddDate(date)}
                    minDate={strtDate}
                    // maxDate={fiveDaysLater}
                    required/>
                    {/* <input
                      className="create-car-booking"
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      value={endDate}
                      required
                      id="endDate"
                      min={todaysDate}
                    /> */}
                  </div>
                  <button className="try-car-btn" type="submit">
                    Edit Reservation
                  </button>
                  <Link className="back-to-cars-link" to="/allcars">
                    Back to All Cars
                  </Link>
                </form>
              </div>
            ) : (
              <h2>Please Login or Signup</h2>
            )}
          </div >
    );
  };
