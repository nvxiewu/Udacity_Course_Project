import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
const BookShelf=props=>{
    return(
        <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfTitel}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.booksOfShelf.map((book,index)=>(
                            <li key={index}>
                                <Book book={book} updateBooks={props.updateBooks}/>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
    )
}
BookShelf.PropTypes={
    shelfTitel:PropTypes.string.isRequired,
    booksOfShelf:PropTypes.array.isRequired,
}
export default BookShelf