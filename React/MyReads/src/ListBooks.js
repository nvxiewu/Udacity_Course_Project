import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const ListBooks=props=>{
    return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitel={'Currently Reading'} booksOfShelf={props.books.filter(book=>book.shelf==='currentlyReading')} updateBooks={props.updateBooks}/>
                <BookShelf shelfTitel={'Want to Read'} booksOfShelf={props.books.filter(book=>book.shelf==='wantToRead')} updateBooks={props.updateBooks}/>
                <BookShelf shelfTitel={'read'} booksOfShelf={props.books.filter(book=>book.shelf==='read')} updateBooks={props.updateBooks}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button onClick={()=>{}/**() => this.setState({ showSearchPage: true })**/}>Add a book</button>
              </Link>
            </div>
          </div>
    )
}

ListBooks.PropTypes={
    books:PropTypes.array.isRequired
}
export default ListBooks