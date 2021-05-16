import React, {Component} from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Shelf extends Component {

    onShelfChange = (book) => {
        this.props.onShelfChange(book);
    }

    render() {
        const {shelf, books} = this.props;

        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === shelf.identifier)
                                .map(book => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onShelfChange={this.onShelfChange}/>
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

Shelf.propTyes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Shelf;