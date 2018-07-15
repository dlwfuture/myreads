import React, { Component } from 'react'

class ListBooks extends Component {
    render() {
        const { bookList, parentClassName, allowNone, moveTo } = this.props

        return (
            <div className={parentClassName}>
                <ol className="books-grid">
                    {
                        bookList && bookList.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={moveTo} data-bookid={book.id}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                {
                                                    allowNone && (
                                                        <option value="none">None</option>
                                                    )
                                                }
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
        )
    }
}

export default ListBooks