import React from 'react'
import PropTypes from 'prop-types'
class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      shelf:this.props.book!==undefined?this.props.book.shelf:null
    }
  }
  updateBooks(e) {
    let value=e.target.value
    this.setState(()=>({shelf:value}))
    this.props.updateBooks(this.props.book,e.target.value)
  }
  render() {
    let url=this.props.book.imageLinks!==undefined?this.props.book.imageLinks.smallThumbnail:null
    return(
      <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+url+'")' }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.state.shelf} onChange={(e)=>{
                                this.updateBooks(e)
                              }}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
    <div className="book-title">{this.props.book!==undefined?this.props.book.title:null}</div>
    <div className="book-authors">{this.props.book.authors!==undefined?this.props.book.authors.join():null}</div>
                        </div>
    )
  }
}
Book.propTypes = {
    book:PropTypes.object.isRequired
}
export default Book