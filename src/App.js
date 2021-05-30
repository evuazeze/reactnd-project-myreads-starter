import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import SearchPage from "./SearchPage";


class BooksApp extends Component {
    state = {
        books: []
    }

    async componentDidMount() {
        const books = await BooksAPI.getAll();
        this.setState(() => ({
            books
        }))
    }

    onShelfChange = (book) => {
        this.setState(currentState => ({
            ...currentState,
            books: [...currentState.books.filter(b => b.id !== book.id), {
                ...book
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
                )}/>
                <Route path='/search' render={() => (
                    <SearchPage
                        books={this.state.books}
                        onShelfChange={(book) => {
                            this.onShelfChange(book);
                        }}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
