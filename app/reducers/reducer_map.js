export default function reducer (
  state = {
    'eu': {
      'center': [11, 54],
      'scale': 550,
      'width': 682,
      'height': 577,
      'selectedAdmin': 'europe',
      'adminNames': [
        'europe'
      ]
    }
  }, action) {
  switch (action.type) {
    case 'SET_ADMIN': {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state
    }
  }
}
