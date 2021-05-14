import React, { Component } from 'react'
import { Route } from 'react-router-dom';
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
                                    shelf={shelf}
                                    books={this.state.books}/>
                            ))}
                        </div>
                        <div className="open-search">
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
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
