import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = []) {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => [...list, ...response.data]);

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}

export function getBookWithReviewer(id) {
  const request = axios.get(`/api/book?id=${id}`).then(({ data }) => {
    const book = data;

    return axios.get(`/api/getReviewer?id=${book.ownerID}`).then(({ data }) => {
      return {
        ...book,
        reviewerName: data.name,
        reviewerLastname: data.lastname,
      };
    });
  });

  return {
    type: 'GET_BOOK_WITH_REVIEWER',
    payload: request,
  };
}

export function clearBookWithReview() {
  return {
    type: 'CLEAR_BOOK_WITH_REVIEW',
    payload: { book: {} },
  };
}

export function loginUser({ email, password }) {
  const request = axios
    .post('/api/login', { email, password })
    .then(response => response.data);

  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}

export function auth() {
  const request = axios.get('/api/auth').then(response => response.data);

  return {
    type: 'USER_AUTH',
    payload: request,
  };
}

export function addBook(book) {
  const request = axios.post('/api/book', book).then(response => response.data);

  return {
    type: 'ADD_BOOK',
    payload: request,
  };
}

export function clearNewBook() {
  return { type: 'CLEAR_NEWBOOK' };
}

export function getUserReviews(userID) {
  const request = axios
    .get(`/api/user-posts?user=${userID}`)
    .then(response => response.data);

  return {
    type: 'GET_USER_REVIEWS',
    payload: request,
  };
}

export function getBook(id) {
  const request = axios
    .get(`/api/book?id=${id}`)
    .then(response => response.data);

  return {
    type: 'GET_BOOK',
    payload: request,
  };
}

export function updateBook(data) {
  const request = axios.put('/api/book', data).then(response => response.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request,
  };
}

export function deleteBook(id) {
  const request = axios
    .delete(`/api/book?id=${id}`)
    .then(response => response.data);

  return {
    type: 'DELETE_BOOK',
    payload: request,
  };
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: {},
      isBookUpdated: false,
      isBookDeleted: false,
    },
  };
}

export function getUsers() {
  const request = axios.get('/api/users').then(response => response.data);

  return {
    type: 'GET_USERS',
    payload: request,
  };
}

export function registerUser(user, userList) {
  const request = axios.post('/api/register', user).then(({ data }) => {
    const { success, user } = data;
    const users = success ? [...userList, user] : userList;
    return {
      users,
      success,
    };
  });

  return {
    type: 'REGISTER_USER',
    payload: request,
  };
}
