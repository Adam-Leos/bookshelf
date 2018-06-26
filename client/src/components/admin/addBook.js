import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {
  state = {
    formData: {
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
  };

  showNewBook = book => (
    <div className="conf_link">
      Book Added!{' '}
      <Link to={`/books/${book.bookID}`}>Click the link to see the post</Link>
    </div>
  );

  onAddBookSubmit = event => {
    event.preventDefault();

    this.props.dispatch(
      addBook({
        ...this.state.formData,
        ownerID: this.props.user.login.id,
      }),
    );
  };

  onInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    const newFormData = { ...this.state.formData };

    newFormData[name] = value;

    this.setState({ formData: newFormData });
  };

  componentWillUnmount() {
    this.props.dispatch(clearNewBook());
  }

  render() {
    return (
      <div className="rl_container article">
        <form action="#" onSubmit={this.onAddBookSubmit}>
          <h2>Add a book</h2>

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

          <button type="submit">Add Book</button>

          {this.props.books.newbook &&
            this.showNewBook(this.props.books.newbook)}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.bookReducer };
}

export default connect(mapStateToProps)(AddBook);
