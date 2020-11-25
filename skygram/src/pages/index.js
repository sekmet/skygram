import React from "react"
import { authenticate } from '../utils/authenticate'
import { rhythm } from "../utils/typography"
import Layout from "../layouts"

const unlock = async () => {
    //disabled = true
    authenticate()
        .then(keyPair => console.log(keyPair))
        .catch(error => console.error(error));
}

class Index extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div
          css={{
            padding: rhythm(3 / 4),
            textAlign: "center"
          }}
        >
        <h1 data-testid="index-title">Welcome to Skygram</h1>
        <h3>Instagram clone for the Decentralized Web</h3>            
        <svg css={{ width: "128px", height: "128px"  }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg><br/>
        <button type="button" onClick={unlock}>
            <span>Authenticate</span>
        </button>
        </div>
      </Layout>
    )
  }
}

export default Index
