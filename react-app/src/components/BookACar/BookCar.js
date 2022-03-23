import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { tryACar } from "../../store/booking";
// import $ from 'jquery'
// import jquery from 'jquery'

export default function TryACar({carId}) {
    const sessionUser = useSelector((state) => state.session.user)
    const user_id = sessionUser?.id
    const dispatch = useDispatch();
    const history = useHistory();



    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);


    const onTry = async (e) => {
      e.preventDefault();

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
    //   .catch(async (err) => {
    //     const errors = await err.json();
    //     if (errors) {
    //       return errors;
    //     }
    //   });
    //   if (value.errors) {
    //     return setErrors(value.errors);
    //   }

      if(!data.errors) {
          history.push(`/allcars`);
      }

//       let array = ["2013-03-14","2013-03-15","2013-03-16"]

//         $('input').datepicker({
//             beforeShowDay: function(date){
//                 let string = jquery.datepicker.formatDate('yy-mm-dd', date);
//                 return [ array.indexOf(string) == -1 ]
//             }
// });

    };
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
                    <input
                      className="create-car-booking"
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      value={startDate}
                      required
                      id="startDate"
                      min={todaysDate}
                    />
                  </div>
                  <div className="create-date date">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      className="create-car-booking"
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      value={endDate}
                      required
                      id="endDate"
                      min={todaysDate}
                    />
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
