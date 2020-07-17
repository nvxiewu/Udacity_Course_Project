import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
    state={
      searchBooks:[],
      query:""
    }
    timeId=0
    postponeGetValue(e) {
      clearTimeout(this.timeId)
      let value=e.target.value
      this.setState(()=>({query:value}))
      this.timeId=setTimeout(() => {
        this.searchBooks()
      }, 1000);
    }
    searchBooks() {
      let value=this.state.query
      if(value.length!==0&&value.trim().length!==0){
        BooksAPI.search(value).then(searchbooks=>{
          if(searchbooks.length!==undefined&&this.state.query.length!==0){
            searchbooks.map(book=>{
              return book.shelf='none'
            })
            this.props.books.map(book=>{
              let filterBook = searchbooks.filter(item=>{return item.id===book.id})
              return filterBook.length!==0?filterBook[0].shelf=book.shelf:null
            })
            return this.setState(()=>({searchBooks:searchbooks}))
          }else{
            this.setState(()=>({searchBooks:[]}))
          }
        }).catch(e=>console.log(e))
      }else{
        this.setState(()=>({searchBooks:[]}))
      }
      clearTimeout(this.timeId)
    }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search" onClick={()=>{}/**this.updateShowSearchPage**/}>Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={e=>this.postponeGetValue(e)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks.map((book,index)=>(
                            <li key={index}>
                                <Book book={book} updateBooks={this.props.updateBooks}/>
                            </li>
                        ))}
              </ol>
            </div>
          </div>
        )
    }
}

SearchBooks.PropTypes={
  books:PropTypes.array.isRequired,
  updateBooks:PropTypes.func.isRequired
}
export default SearchBooks