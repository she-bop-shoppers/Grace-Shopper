import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGenres} from '../reducers/genres'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  MenuButton: {
    margin: '1em',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    fontFamily: 'sans-serif',
    textTransform: 'capitalize'
  }
}

class AllGenres extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  componentDidMount() {
    this.props.numerousGenres()
  }

  render() {
    const {anchorEl} = this.state
    if (this.props.genres && this.props.genres.length) {
      return (
        <li>
          <Button
            className={this.props.classes.MenuButton}
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            GENRES
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.props.genres.map(genre => (
              <MenuItem key={genre.id}>
                <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
              </MenuItem>
            ))}
          </Menu>
        </li>
      )
    } else {
      return <li>Loading . . .</li>
    }
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres.allGenres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    numerousGenres: () => dispatch(getGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AllGenres)
)
