import { ReactNode } from 'react'
import { Link } from 'react-router'

function NotFound(): ReactNode {
  return (
    <>
      <h1>Not found</h1>
      <Link to="/">Go back to Home</Link>
    </>
  )
}

export default NotFound
