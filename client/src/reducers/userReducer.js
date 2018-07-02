export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'USER_LOGIN':
      return { ...state, login: payload };

    case 'USER_AUTH':
      return { ...state, login: payload };

    case 'GET_USER_REVIEWS':
      return { ...state, userReviews: payload };

    case 'GET_USERS':
      return { ...state, users: payload };

    case 'REGISTER_USER':
      return {
        ...state,
        isRegistered: payload.success,
        users: payload.users,
      };

    default:
      return state;
  }
}
