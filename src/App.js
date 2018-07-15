import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import MyReads from './MyReads'
import Loading from './Loading'
import './App.css'
import './animate.css'

class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  updateBookList = (bookList) => {
    BooksAPI.getAll().then(books => {
      this.setState({
        bookList: books
      })
    })
  }

  componentDidMount() {
    this.updateBookList()
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBook updateBookList={() => {
            this.updateBookList()
            history.push('/')
          }} />
        )} />
        <Route exact path='/' render={() => (
          <MyReads bookList={this.state.bookList} updateBookList={() => { this.updateBookList() }} />
        )
        } />
      </div>
    )
  }
}

export default BooksApp
