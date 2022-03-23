
const TRY_A_CAR = 'booking/tryacar'


const bookCar = (booking) => {
    return {
        type: TRY_A_CAR,
        booking
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

    console.log('thjis be response', response);

    if(response.ok) {
        const data = await response.json()
        console.log('this be data', data);
        dispatch(bookCar(data));
        return data
    }
}

const initialState = { booking: {} };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case TRY_A_CAR: {
            newState = {...state};
            newState.booking = action.booking;
            return newState
        }
    default:
      return state;
  }
}
