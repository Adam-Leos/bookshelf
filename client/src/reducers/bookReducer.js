export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'GET_BOOK':
      return { ...state, book: payload };

    case 'GET_BOOKS':
      return { ...state, list: payload };

    case 'GET_BOOK_WITH_REVIEWER':
      return { ...state, book: payload };

    case 'CLEAR_BOOK_WITH_REVIEW':
      return { ...state, book: payload };

    case 'ADD_BOOK':
      return { ...state, newbook: payload };

    case 'CLEAR_NEWBOOK':
      return { ...state, newbook: {} };

    case 'UPDATE_BOOK':
      return {
        ...state,
        isBookUpdated: payload.success,
        book: payload.doc,
      };

    case 'DELETE_BOOK':
      return { ...state, isBookDeleted: payload };

    case 'CLEAR_BOOK':
      return { ...state, ...payload };

    default:
      return state;
  }
}
