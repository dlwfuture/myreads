import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Loading from './Loading'

class MyReads extends Component {
    state = {
        isLoading: false
    }

    setLoading = (isLoading) => {
        this.setState({ isLoading: isLoading })
    }

    moveTo = (e) => {
        this.setLoading(true)
        const value = e.target.value
        const book = { id: e.target.dataset.bookid }
        const updateBookList = this.props.updateBookList
        BooksAPI.update(book, value).then(res => {
            updateBookList()
            this.setLoading(false)
        })
    }

    render() {
        const { bookList } = this.props
        let currentlyReading, wantToRead, read

        currentlyReading = bookList ? bookList.filter(book => book.shelf === 'currentlyReading') : []
        wantToRead = bookList ? bookList.filter(book => book.shelf === 'wantToRead') : []
        read = bookList ? bookList.filter(book => book.shelf === 'read') : []

        return (
            <div className="list-books">
                <Loading isLoading={this.state.isLoading} />
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated slideInLeft ">Currently Reading</h2>
                            <ListBooks bookList={currentlyReading} parentClassName='bookshelf-books' allowNone={true} moveTo={this.moveTo} />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated slideInLeft">Want to Read</h2>
                            <ListBooks bookList={wantToRead} parentClassName='bookshelf-books' allowNone={true} moveTo={this.moveTo} />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated slideInLeft">Read</h2>
                            <ListBooks bookList={read} parentClassName='bookshelf-books' allowNone={true} moveTo={this.moveTo} />
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