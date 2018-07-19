import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Loading from './Loading'
import SearchInput from './SearchInput'

class SearchBook extends Component {
    state = {
        booksList: [],
        isLoading: false,
        showBookShelfMessage: false
    }

    static propTypes = {
        updateBookList: PropTypes.func.isRequired
    }

    setLoading = (isLoading) => {
        this.setState({ isLoading: isLoading })
    }

    searchBook = (searchText) => {
        if (searchText && searchText.length > 0){
            BooksAPI.search(searchText).then(
                res => {
                    const isArray = Array.isArray(res)
                    this.setState({ booksList: res && isArray ? res : [], showBookShelfMessage: true })
                    !isArray && res && console.error(`Error on Function:'BooksAPI.search()', Params: 'searchText: ${searchText}', Error: '${res.error}'`)
                }
            )
        } else{
            this.setState({ booksList: [], showBookShelfMessage: true })
        }
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
        return (
            <div className="search-books">
                <Loading isLoading={this.state.isLoading} />
                <div className="search-books-bar animated fadeInDown">
                    <Link to='/'
                        className='close-search'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <SearchInput onSearch={this.searchBook} placeHolder="Search by title or author" typingTimeOut={500}></SearchInput>

                    </div>
                </div>
                <ListBooks bookList={this.state.booksList} parentClassName='search-books-results' allowNone={false} moveTo={this.moveTo} showBookShelfMessage={this.state.showBookShelfMessage} />
            </div>
        )
    }
}

export default SearchBook