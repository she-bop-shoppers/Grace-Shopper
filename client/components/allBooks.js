import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks, removeABook} from '../reducers/book'
import BooksQuery from './books-query'
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core'

class AllBooks extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      addRedirect: false,
      updateRedirect: false,
      bookId: ''
    }
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  setAddRedirect = () => {
    this.setState({
      addRedirect: true
    })
  }

  setUpdateRedirect = bookId => {
    this.setState({
      bookId,
      updateRedirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.addRedirect) {
      return <Redirect to="/addBook" />
    }
    if (this.state.updateRedirect) {
      return <Redirect to={`/updateBook/${this.state.bookId}`} />
    }
  }

  handleDelete(id) {
    this.props.removeBook(id)
  }

  render() {
    const {books, isAdmin} = this.props

    return (
      <div>
        <h1>BOOKS</h1>
        <BooksQuery />
        <Grid container justify="center" spacing={24} style={{padding: 24}}>
          {isAdmin ? (
            <div>
              {this.renderRedirect()}
              <button type="submit" onClick={this.setAddRedirect}>
                Add Book Item
              </button>
            </div>
          ) : (
            <div />
          )}
          {books && books.length ? (
            books.map(book => {
              return (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={book.id}>
                  <Card
                    style={{height: '36vw', width: '22vw'}}
                    flexDirection="column"
                  >
                    <Link to={`/books/${book.id}`}>
                      <CardMedia
                        style={{
                          height: '100%',
                          width: '100%'
                          // padding: '56.00%'
                        }}
                        // title={book.title}
                        image={book.imageUrl}
                      />
                      {/* <CardContent>
                        <Typography gutterTop variant="headline" component="h2">
                          {book.title}
                        </Typography>
                        <img className="bookImage" src={book.imageUrl} />
                      </CardContent> */}
                    </Link>
                    {isAdmin ? (
                      <div>
                        {' '}
                        <button
                          type="submit"
                          onClick={() => this.handleDelete(book.id)}
                        >
                          Delete
                        </button>
                        <div>
                          {this.renderRedirect()}
                          <button
                            type="submit"
                            onClick={() => this.setUpdateRedirect(book.id)}
                          >
                            Update Item
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}{' '}
                  </Card>
                </Grid>
              )
            })
          ) : (
            <h1>No Matching Results</h1>
          )}
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch(getBooks()),
    removeBook: id => dispatch(removeABook(id))
  }
}

const mapStateToProps = state => {
  return {books: state.books.allBooks, isAdmin: state.user.isAdmin}
}

const ConnectedAllBooks = connect(mapStateToProps, mapDispatchToProps)(AllBooks)

export default ConnectedAllBooks
