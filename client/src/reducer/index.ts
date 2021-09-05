const initialState = {
  articles: []
}

export const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_ARTICLES':
      return{
        ...state,
        articles: payload
      }
    
      default: 
        return state
  }
}