import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
    state = {
        booksList: []
    }

    searchBook = (e) => {
        const searchText = e.target.value
        searchText && searchText.length > 0 && BooksAPI.search(searchText).then(
            res => {
                const isArray = Array.isArray(res)
                isArray && this.setState({ booksList: res }) 
                !isArray && res && console.log(res.error)
            }
        )
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'
                        className='close-search'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.searchBook} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.booksList && this.state.booksList.map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {
                                            book.authors && book.authors.map((author, authorIndex) => (
                                                <div key={authorIndex} className="book-authors">{author}</div>
                                            ))
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook