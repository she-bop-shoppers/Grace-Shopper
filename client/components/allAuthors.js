import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getAllAuthors} from '../reducers/author'

class AllAuthors extends Component {
  componentDidMount() {
    console.log('component mounting')
    this.props.fetchAuthors()
  }

  render() {
    const authors = this.props.authors
    console.log('this is authors', authors)
    return (
      <div>
        {authors &&
          authors.map(author => {
            return (
              <div className="column" key={author.id}>
                <h3>
                  <Link to={`/authors/${author.id}`}>{author.fullName}</Link>{' '}
                </h3>
                <img src={author.imageUrl} />
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authors: state.authors.allAuthors
})

const mapDispatchToProps = dispatch => {
  return {fetchAuthors: () => dispatch(getAllAuthors())}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllAuthors)
)
