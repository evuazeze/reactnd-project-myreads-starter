import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {

    state = {
        foundBooks: []
    }

    updateQuery = query => {
        BooksAPI.search(query)
            .then(data => {
                if (data) {
                    this.setState(() => ({
                        foundBooks: data
                    }))
                } else {
                    this.setState(() => ({
                        foundBooks: []
                    }))
                }
            })
    }

    onShelfChange = (book) => {
        this.props.onShelfChange(book);
    }

    render() {
        const { foundBooks } = this.state
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
                        {foundBooks && (foundBooks.map(book => (
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

export default SearchPage;