import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import ListBooks from './MyReads'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
        this.setState({
          bookList: books
        })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={SearchBook} />
        <Route exact path='/' render={() => (
              <ListBooks bookList={this.state.bookList}></ListBooks>
            )
        } />
      </div>
    )
  }
}

export default BooksApp
