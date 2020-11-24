import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts"

const NotFound = () => {
  return (
    <Layout>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Go back to home</Link>
      </p>
    </Layout>
  )
}

export default NotFound