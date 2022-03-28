import { deletedBooking } from "./booking"
// constants
const SUBMITTED_CAR = 'car/SUBMITTEDCAR'
const LOAD_CARS = 'car/loadcars'
const LOAD_USER_CARS = 'car/loadusercars'
const LOAD_SINGLE_CAR = 'car/loadsinglecar'
const DELETE_CAR = 'car/deletecar'
const CLEAR_CAR = 'car/clearcar'



const allCars = (cars) => {
  return {
    type: LOAD_CARS,
    cars
  }
}

const submittedCar = (car) => {
    return {
        type: SUBMITTED_CAR,
        car
    };
}

const userCars = (userCars) => {
  return {
      type: LOAD_USER_CARS,
      userCars
  };
}

const singleCar = (car) => {
  return {
    type: LOAD_SINGLE_CAR,
    car
  }
}

const deletedCar = (carId) => {
  return {
    type: DELETE_CAR,
    carId
  }
}

// ---------------------------------------

export const getCars = () => async (dispatch) => {
  const response = await fetch('/api/cars/')

  if (response.ok) {
    const data = await response.json();

    dispatch(allCars(data))
    return data;
  }


}

export const getUserCars = (userId) => async (dispatch) => {
  const response = await fetch(`/api/cars/users/${userId}`)

  if(response.ok) {
    const data = await response.json()

    dispatch(userCars(data))
  }

  return response
}

export const getSingleCar = (carId) => async (dispatch) => {
  const response = await fetch(`/api/cars/${carId}`)

  if(response.ok) {
    const data = await response.json()
    console.log('backend data', data);
    dispatch(singleCar(data))
  }

  return response
}

export const clearCarState = () => ({
  type: CLEAR_CAR
})

// export const editCar = (carId) => async (dispatch) => {
//   const response = await fetch(`/api/cars/users/${userId}`)

// }


export const newCar = (car) => async (dispatch) => {
    const {
        price, mileage,
        extColor, intColor,
        bodyStyle, fuelType,
        year, make, model, zip,
        imageUrl
    } = car

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
        return data;
    } else {
      const errors = await response.json()
      return errors
    }
}

export const editCar = (car, carId) => async (dispatch) => {
  const {
      price, mileage,
      extColor, intColor,
      bodyStyle, fuelType,
      year, make, model, zip,
      imageUrl
  } = car

  console.log('backedn carId', carId);

  const response = await fetch(`/api/cars/editCar/${carId}`, {
      method: 'PUT',
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
      return data;
  } else {
    const errors = await response.json()
    return errors
  }
}

export const deleteCar = (carId, bookings) => async(dispatch) => {
  const response = await fetch(`/api/cars/${carId}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deletedCar(carId))
    bookings.forEach((booking) => {
      dispatch(deletedBooking(booking.id, carId))
    })
  }
}

const initialState = { car: {}, userCars: {} };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case SUBMITTED_CAR: {
        newState = { ...state };
        newState.car[action.car.id] = action.car;
        // console.log(newState.car);
        newState.userCars[action.car.id] = action.car;
        return newState;
      }
      case LOAD_CARS: {
        newState = initialState;
        action.cars.cars.forEach((car) => {
          newState.car[car.id] = car
          // console.log(newState.car);
        })
        // console.log(action);
        console.log(newState);
        return newState;
      }
      case LOAD_SINGLE_CAR: {
        newState = { ...state };
        console.log(action.car.cars.id)
        newState.car[action.car.cars.id] = action.car.cars;
        return newState;
      }
      case LOAD_USER_CARS: {
        newState = { ...state };
        action.userCars.cars.forEach((userCar) => {
          newState.userCars[userCar.id] = userCar
        })
        return newState;
      }
      case DELETE_CAR: {
        newState = { ...state }
        console.log(action.carId);
        delete newState.car[action.carId]
        console.log(action.carId);
        delete newState.userCars[action.carId]
        return newState;
      }
      case CLEAR_CAR: {
        newState = {car: {}, userCars: {} }
        return newState
      }
    default:
      return state;
  }
}
