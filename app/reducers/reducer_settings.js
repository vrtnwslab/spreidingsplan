export default function reducer (
  state = {
    projectName: 'Vluchtelingen',
    realtime: true,
    country: 'eu',
    fetched: false,
    active: 0
  }, action) {
  switch (action.type) {
    case 'FETCH_FILE':
    case 'FETCH_DATA_FULFILLED': {
      return {
        ...state,
        fetched: true
      }
    }
    case 'SET_COUNTRY': {
      return {
        ...state,
        active: action.payload
      }
    }
    default: {
      return state
    }
  }
}
