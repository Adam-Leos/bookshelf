import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, deleteBook, clearBook } from '../../actions';

class EditBook extends PureComponent {
  state = {
    formData: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
  };

  componentDidMount() {
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  componentWillReceiveProps(nextProps) {
    const book = nextProps.books.book;
    const { _id, name, author, review, pages, rating, price } = book;

    this.setState({
      formData: {
        _id,
        name,
        author,
        review,
        pages,
        rating,
        price,
      },
    });
  }

  redirectToUserReviews = () => {
    setTimeout(() => {
      this.props.history.push('/user/user-reviews');
    }, 1000);
  };

  onEditBookSubmit = event => {
    event.preventDefault();

    this.props.dispatch(updateBook(this.state.formData));
  };

  onDeleteBook = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  };

  onInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    const newFormData = { ...this.state.formData };

    newFormData[name] = value;

    this.setState({ formData: newFormData });
  };

  render() {
    const { books } = this.props;
    return (
      <div className="rl_container article">
        {books.isBookUpdated && (
          <div className="edit_confirm">
            <Link to={`/books/${books.book._id}`}>
              Click here to see update book
            </Link>
          </div>
        )}

        {books.isBookDeleted && (
          <div className="red_tag">
            Post deleted{this.redirectToUserReviews()}
          </div>
        )}

        <form action="#" onSubmit={this.onEditBookSubmit}>
          <h2>Edit book</h2>

          <div className="form_element">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={this.state.formData.name}
              onChange={this.onInputChange}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              name="author"
              placeholder="Enter author"
              value={this.state.formData.author}
              onChange={this.onInputChange}
            />
          </div>

          <textarea
            name="review"
            id=""
            cols="30"
            rows="10"
            value={this.state.formData.review}
            onChange={this.onInputChange}
          />

          <div className="form_element">
            <input
              type="number"
              name="pages"
              placeholder="Enter pages"
              value={this.state.formData.pages}
              onChange={this.onInputChange}
            />
          </div>

          <div className="form_element">
            <select
              name="rating"
              id=""
              value={this.state.formData.rating}
              onChange={this.onInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form_element">
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={this.state.formData.price}
              onChange={this.onInputChange}
            />
          </div>

          <button type="submit">Edit Book</button>
          <div className="delete_post">
            <button
              className="button"
              type="button"
              onClick={this.onDeleteBook}
            >
              Delete book
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.bookReducer };
}

export default connect(mapStateToProps)(EditBook);
