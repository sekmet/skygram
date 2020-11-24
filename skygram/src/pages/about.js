import React from "react"
import { rhythm } from "../utils/typography"
import Layout from "../layouts"

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div
          css={{
            padding: rhythm(3 / 4),
          }}
        >
          <h1 data-testid="about-title">About Skygram</h1>
          <p>
            Skygram is an Instagram clone for the Decentralized Web.
            {` `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://siasky.net"
            >
              SkyGram
            </a>
            .
          </p>
          <p>
            The code for the site lives at
            {` `}
            <a
              href="https://github.com/sekmet/skygram"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://github.com/sekmet/skygram
            </a>
          </p>
        </div>
      </Layout>
    )
  }
}

export default About
