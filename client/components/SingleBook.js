import React from 'react'

const SingleBook = props => {
  const book = props.book

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageUrl} />
      <p>{book.description}</p>
    </div>
  )
}
