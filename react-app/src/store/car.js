// constants
const SUBMITTED_CAR = 'car/SUBMITTEDCAR'


const submittedCar = (car) => {
    return {
        type: SUBMITTED_CAR,
        car
    };
}

export const newCar = (car) => async (dispatch) => {
    const {
        price, mileage,
        extColor, intColor,
        bodyStyle, fuelType,
        year, make, model, zip,
        imageUrl
    } = car

    console.log(car);

    const response = await fetch('/api/cars/newCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price, mileage,
            ext_color: extColor, int_color: intColor,
            body_style: bodyStyle, fuel_type: fuelType,
            year, make, model, zip,
            imageUrl
        })
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(submittedCar(data));
        return response;
    }
}


const initialState = { car: {} };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case SUBMITTED_CAR: {
        newState = { ...state };
        newState.car = action.library;
        return newState;
      }
    default:
      return state;
  }
}
