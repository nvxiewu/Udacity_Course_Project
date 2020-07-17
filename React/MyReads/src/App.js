import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  componentDidMount() {
    BooksAPI.getAll().then(books=>this.setState(()=>({
      books
    }))).catch(e=>console.log('error',e))
  }

  updateBooks(book,shelf){
    BooksAPI.update(book,shelf).then(res=>{
      let books=this.state.books
      let updateBook=books.filter(item=>{return item.id===book.id})
      if(updateBook.length===0){
        book.shelf=shelf
        books.push(book)
      }else{
        updateBook[0].shelf=shelf
      }
      return this.setState(()=>({books}))
    }).catch(e=>{
      console.log('error',e)
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <ListBooks books={this.state.books} updateBooks={(book,shelf)=>this.updateBooks(book,shelf)}/>
        )}/>
        <Route path='/search' render={()=>(
          <SearchBooks books={this.state.books} updateBooks={(book,shelf)=>this.updateBooks(book,shelf)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
