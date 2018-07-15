import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class MyReads extends Component {
    render() {
        const { bookList } = this.props
        let currentlyReading, wantToRead, read

        currentlyReading = bookList ? bookList.filter(book => book.shelf === 'currentlyReading') : []
        wantToRead = bookList ? bookList.filter(book => book.shelf === 'wantToRead') : []
        read = bookList ? bookList.filter(book => book.shelf === 'read') : []

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <ListBooks bookList={currentlyReading} parentClassName='bookshelf-books' />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <ListBooks bookList={wantToRead} parentClassName='bookshelf-books' />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <ListBooks bookList={read} parentClassName='bookshelf-books' />
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default MyReads