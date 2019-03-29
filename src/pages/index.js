import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Canvas from "../components/canvas"

const IndexPage = () => (
  <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Canvas />
  </Layout>
)

export default IndexPage
