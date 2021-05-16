import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {

    state = {
        foundBooks: []
    }

    updateQuery = query => {
        const {books} = this.props;

        BooksAPI.search(query)
            .then(data => {
                if (!Array.isArray(data)) {
                    this.setState(() => ({
                        foundBooks: []
                    }))

                    return;
                }

                const unshelvedBooksReturned = data.filter((foundBook) => {
                    return !books.some((book) => {
                        return book.id === foundBook.id
                    });
                });

                const shelvedButUnreflectedBooksReturned = data.filter((foundBook) => {
                    return books.some((book) => {
                        return book.id === foundBook.id
                    });
                });

                const shelvedBooks = books.filter(book => shelvedButUnreflectedBooksReturned.some(sb => book.id === sb.id))

                this.setState(() => ({
                    foundBooks: [...unshelvedBooksReturned, ...shelvedBooks]
                }))
            })
    }

    onShelfChange = (book) => {
        this.props.onShelfChange(book);
    }

    render() {
        const {foundBooks} = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'>
                        <button className="close-search">
                            Close
                        </button>
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={event => this.updateQuery(event.target.value)}
                               placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {foundBooks && foundBooks.length !== 0 && (foundBooks.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                onShelfChange={this.onShelfChange}/>
                        )))}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default SearchPage;