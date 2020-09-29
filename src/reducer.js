export const initialState = {
  user: null,
  roomkey: '',
};
export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_KEY: 'SET_KEY',
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_KEY':
      {
        console.log('inside action', state);
      }
      return {
        ...state,
        roomkey: action.roomkey,
      };

    default:
      return state;
  }
};
export default reducer;
