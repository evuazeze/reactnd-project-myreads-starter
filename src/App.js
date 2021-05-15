import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import SearchPage from "./SearchPage";


class BooksApp extends Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState(() => ({
                    books
                }))
            })
    }

    onShelfChange = (shelf, book) => {
        const outOfShelfBook = this.state.books
            .find(b => b.id === book.id);
        this.setState(currentState => ({
            ...currentState,
            books: [...currentState.books.filter(b => b.id !== book.id), {
                ...outOfShelfBook,
                shelf
            }]
        }))
    }

    render() {
        const shelves = [
            {
                title: 'Currently Reading',
                identifier: 'currentlyReading'
            },
            {
                title: 'Want to Read',
                identifier: 'wantToRead'
            },
            {
                title: 'Read',
                identifier: 'read'
            }
        ]

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {shelves.map(shelf => (
                                <Shelf
                                    key={shelf.identifier}
                                    shelf={shelf}
                                    books={this.state.books}
                                    onShelfChange={this.onShelfChange}/>
                            ))}
                        </div>
                        <div className="open-search">
                            <Link
                                to='/search'>
                                <button>Add a book</button>
                            </Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={() => (
                    <SearchPage />
                )} />


            </div>
        )
    }
}

export default BooksApp
