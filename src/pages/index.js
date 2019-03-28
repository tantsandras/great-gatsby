import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Canvas from "../components/canvas"
import StyledBackgroundSection from "../components/background";

const IndexPage = () => (
  <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Canvas>
        </Canvas>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
