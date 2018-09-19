import React from 'react'
import {connect} from 'react-redux'
import {getSingleGenre} from '../reducers/genres'
import {Link} from 'react-router-dom'
import {Grid, Card, CardMedia} from '@material-ui/core'

class SingleGenre extends React.Component {
  componentDidMount() {
    const genreId = Number(this.props.match.params.genreId)
    this.props.unoGenre(genreId)
  }

  render() {
    return (
      <div>
        <h1>{this.props.oneGenre.name}</h1>
        <Grid container justify="center" spacing={24} style={{padding: 24}}>
          {this.props.oneGenre.books ? (
            this.props.oneGenre.books.map(book => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={book.id}>
                <Card style={{height: '36vw', width: '22vw'}}>
                  <Link to={`/books/${book.id}`}>
                    <CardMedia
                      style={{
                        height: '100%',
                        width: '100%'
                      }}
                      image={book.imageUrl}
                    />
                  </Link>
                </Card>
              </Grid>
            ))
          ) : (
            <li>Loading . . .</li>
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    oneGenre: state.genres.singleGenre
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unoGenre: genreId => dispatch(getSingleGenre(genreId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGenre)
