import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import BookItem from '../widgetsUI/bookItem';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getBooks(1, 0, 'desc'));
  }

  onLoadMoreClick = () => {
    const bookCount = this.props.books.list.length;

    this.props.dispatch(getBooks(1, bookCount, 'desc', this.props.books.list));
  };

  renderBooks = (books = {}) =>
    books.list
      ? books.list.map(item => <BookItem {...item} key={item._id} />)
      : null;

  render() {
    return (
      <div>
        {this.renderBooks(this.props.books)}
        <div className="loadmore" onClick={this.onLoadMoreClick}>
          Load More
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.bookReducer };
}

export default connect(mapStateToProps)(HomeContainer);
