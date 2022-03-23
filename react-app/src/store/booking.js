
const TRY_A_CAR = 'booking/tryacar'
const USER_BOOKINGS = 'booking/userbookings'
const USER_RESERVATIONS = 'booking/userreservations'


const bookCar = (booking) => {
    return {
        type: TRY_A_CAR,
        booking
    }
}

const userBookings = (userBookings) => {
    return {
        type: USER_BOOKINGS,
        userBookings
    }
}

const userReservations = (userReservations) => {
    return {
        type: USER_RESERVATIONS,
        userReservations
    }
}

export const tryACar = (car) => async (dispatch) => {
    const {
        carId, user_id,
        startDate, endDate
    } = car

    const response = await fetch(`/api/bookings/${carId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId, user_id,
            start_date: startDate, end_date: endDate
        })
    })

    console.log('this be response', response);

    if(response.ok) {
        const data = await response.json()
        console.log('this be data', data);
        dispatch(bookCar(data));
        return data
    }
}

export const editTryACar = (booking) => async (dispatch) => {
    const {
        carId, user_id, booking_id,
        startDate, endDate
    } = booking

    const response = await fetch(`/api/bookings/${booking_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId, user_id, booking_id,
            start_date: startDate, end_date: endDate
        })
    })

    console.log('this be response', response);

    if(response.ok) {
        const data = await response.json()
        console.log('this be data', data);
        dispatch(bookCar(data));
        return data
    }
}

export const getUserBookings = (user_id) => async (dispatch) => {
    const response = await fetch (`/api/bookings/user/${user_id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(userBookings(data));
        console.log(data);
        return data
    }
}

export const getUserReservations = (user_id) => async (dispatch) => {
    const response = await fetch (`/api/bookings/user/reservations/${user_id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(userReservations(data));
        console.log(data);
        return data
    }
}

const initialState = { myBooking: {}, booking: {}, carReservation: {} };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case TRY_A_CAR: {
            newState = {...state};
            newState.myBooking = action.booking;
            return newState
        }
        case USER_BOOKINGS: {
            newState = {...state};
            action.userBookings.carBookings.forEach((userBooking) => {
                newState.booking[userBooking.id] = userBooking
            })
            return newState
        }
        case USER_RESERVATIONS: {
            newState = {...state};
            action.userReservations.reservations.forEach((userReservation) => {
                newState.carReservation[userReservation.car_id] = userReservation
            })
            return newState
        }
    default:
      return state;
  }
}
