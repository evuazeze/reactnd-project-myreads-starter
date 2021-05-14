import React, {Component} from 'react';
import Book from './Book';

class Shelf extends Component {

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
                                    <Book book={book} />
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shelf;