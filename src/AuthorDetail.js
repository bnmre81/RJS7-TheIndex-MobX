import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

// Store
import bookStore from "./stores/bookStore";
import authorStore from "./stores/authorStore";

class AuthorDetail extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      this.getAuthor();
    }
  }

  render() {
    if (bookStore.loading) {
      return <Loading />;
    } else {
      const author = authorStore.getAuthorById(
        this.props.match.params.authorID
      );
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable
            books={author.books.map(book => bookStore.getBookById(book))}
          />
        </div>
      );
    }
  }
}

export default AuthorDetail;
