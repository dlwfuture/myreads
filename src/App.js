import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import MyReads from './MyReads'
import './App.css'
import './animate.css'
import 'font-awesome/css/font-awesome.min.css'

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
