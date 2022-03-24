import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { tryACar, getCarBookings } from "../../store/booking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import $ from 'jquery'
// import jquery from 'jquery'

export default function TryACar({carId}) {
    const sessionUser = useSelector((state) => state.session.user)
    const user_id = sessionUser?.id
    const dispatch = useDispatch();
    const history = useHistory();


    const [strtDate, setStrtDate] = useState();
    const [enddDate, setEnddDate] = useState();
    const [errors, setErrors] = useState([]);


    const formatDate = (date) => {
        let anyDate = new Date(date);
        let year = anyDate.getFullYear();

        let month = (anyDate.getMonth() + 1).toString();
        if (month.length < 2) {
        month = '0' + month;
        }

        let day = anyDate.getDate().toString();
        if (day.length < 2) {
        day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    const todaysDate = formatDate(new Date())

    const onTry = async (e) => {
      e.preventDefault();

      const startDate = formatDate(strtDate)
      const endDate = formatDate(enddDate)


      const car = {
        carId,
        user_id,
        startDate,
        endDate,
      };

      const data = await dispatch(tryACar(car))

      if(data && data.errors) {
          setErrors(data.errors)
      }

      if(!data.errors) {
          history.push(`/myaccount`);
      }
    };



    const fiveDaysLater = new Date( strtDate );
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
    console.log(strtDate, enddDate);

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
                    minDate={new Date()}
                    // maxDate={fiveDaysLater}
                    required/>
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    {/* <DayPicker
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    selected={startDate}
                    // onDayChange={day => handleStartDate(day)}
                    /> */}
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
                    Reserve
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
