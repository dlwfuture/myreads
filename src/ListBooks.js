import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Image from 'lqip-react'

class ListBooks extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        parentClassName: PropTypes.string.isRequired,
        allowNone: PropTypes.bool.isRequired,
        moveTo: PropTypes.func.isRequired
    }

    render() {
        const { bookList, parentClassName, allowNone, moveTo } = this.props

        return (
            <div className={parentClassName}>
                <ol className="books-grid">
                    {
                        bookList && bookList.map(book => (
                            <li className='animated fadeIn' key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193 }}>
                                        <Image
                                            src={book && book.imageLinks ? book.imageLinks.thumbnail : ''}
                                            thumbnail={book && book.imageLinks ? book.imageLinks.smallThumbnail : ''}
                                            aspectRatio={'128x193'}
                                            blur={0}
                                            color='#fff'
                                            lazyLoad='all'
                                        />
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf || 'move'} onChange={moveTo} data-bookid={book.id}>
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