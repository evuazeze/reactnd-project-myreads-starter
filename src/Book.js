import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends PureComponent {

    changeShelf = event => {
        const book = this.props.book;
        const shelf = event.target.value;

        BooksAPI.update(book, shelf)
            .then(() => {
                book.shelf = shelf;
                this.props.onShelfChange(book);
            })
    }

    render() {
        const {book} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: book.imageLinks && book.imageLinks.thumbnail ? `url(${book.imageLinks.thumbnail})` : ''
                        }}/>
                        <div className="book-shelf-changer">
                            <select value={book.shelf ? book.shelf : 'none'} onChange={this.changeShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && book.authors.map(author => (
                        <div key={author} className="book-authors">{author}</div>))}
                </div>
            </li>
        );
    }
}

Book.propTyes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Book;