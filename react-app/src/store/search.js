const SEARCH_CARS = 'car/SEARCHCARS'


const allSearchCars = (cars) => {
    return {
      type: SEARCH_CARS,
      cars
    }
  }


export const searchCars = (searchItem) => async (dispatch) => {

    const response = await fetch(`/api/cars/search/${searchItem}`)

    if(response.ok) {
      const data = await response.json();;
      dispatch(allSearchCars(data))
      return data;
    }
  }

  const initialState = { searchedCars: {}};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case SEARCH_CARS: {
        // newState = initialState;
        // action.cars.cars.forEach((car) => {
        //   newState.searchedCars[car.id] = car
        //   // console.log(newState.car);
        // })
        // // console.log(action);
        // return newState;
        newState = { ...state };
        newState.searchedCars = action.cars;
        console.log(newState);
        return newState;
      }
    default:
      return state;
  }
}
