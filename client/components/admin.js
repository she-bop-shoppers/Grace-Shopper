import React from 'react'
import {Link} from 'react-router-dom'
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
    fontFamily: 'Lato',
    fontSize: '1rem',
    textTransform: 'capitalize'
  }
}

class AdminMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state

    return (
      <li>
        <Button
          className={this.props.classes.MenuButton}
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          ADMIN
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/inventory">
            <MenuItem onClick={this.handleClose}>Inventory</MenuItem>
          </Link>
          <Link to="/customerorders">
            <MenuItem onClick={this.handleClose}>Customer Orders</MenuItem>
          </Link>
          <Link to="/users">
            <MenuItem onClick={this.handleClose}>Users</MenuItem>
          </Link>
        </Menu>
      </li>
    )
  }
}

export default withStyles(styles)(AdminMenu)
