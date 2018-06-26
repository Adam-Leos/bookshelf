import React, { Component } from 'react';
import { getBookWithReviewer, clearBookWithReview } from './../../actions';
import { connect } from 'react-redux';

class BookView extends Component {
  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearBookWithReview());
  }

  renderBook = (book = {}) => {
    if (Object.keys(book).length === 0) return null;

    const {
      name,
      author,
      reviewerName,
      reviewerLastname,
      review,
      pages,
      price,
      rating,
    } = book;

    return (
      <div className="br_container">
        <div className="br_header">
          <h2>{name}</h2>
          <h5>{author}</h5>
          <div className="br_reviewer">
            <span>
              Review by: {reviewerName} {reviewerLastname}
            </span>
          </div>
          <div className="br_review">{review}</div>
        </div>
        <div className="br_box">
          <div className="left">
            <div>
              <span>Pages:</span> {pages}
            </div>
            <div>
              <span>Price:</span> {price}
            </div>
          </div>
          <div className="right">
            <span>Rating:</span>
            <div>{rating}/5</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { book } = this.props;

    return <div>{this.renderBook(book)}</div>;
  }
}

function mapStateToProps(state) {
  return { book: state.bookReducer.book };
}

export default connect(mapStateToProps)(BookView);
