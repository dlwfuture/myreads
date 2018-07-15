import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

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
                <ListBooks bookList={this.state.booksList} parentClassName='search-books-results' />
            </div>
        )
    }
}

export default SearchBook