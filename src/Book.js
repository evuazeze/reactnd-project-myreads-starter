import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

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
        const { book } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}></div>
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

export default Book;