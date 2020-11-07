import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  connectcta,
  connecttitle,
  connectsubtitle,
  connectimage,
  social
}) => (
  <div>

    <div className="hero right" style={{zIndex:10}}>
      <h1 style={{color: '#1E90FF', width: "50%", padding: 48}}>
          <span style={{color: "rgba(255, 165, 2, 0.5)"}}>
              {title}
          </span>
          <br/>
          {subheading}
        </h1>
      <div className="background" style={{backgroundColor: "rgba(30, 144, 255, 0.5)"}}/>
      <img 
        src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} 
        style={{
          position: "absolute",
          top: 0,
          right: 0
        }} 
      />
    </div>

    <div className="hero" style={{
      backgroundColor: "rgba(255, 165, 2, 0.5)",
      padding: 48
    }}>
      <h1 style={{
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 100,
        lineHeight: "90%",
        textTransform: "uppercase",
        color: "#1E90FF",
        padding: "24px 0px"
      }} >{mainpitch.title}</h1>
      {mainpitch.skills ? 
      mainpitch.skills.map((item,i)=>
      <h2 key={"skill"+i} style={{
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 100,
        lineHeight: "90%",
        textTransform: "uppercase",
        color: "rgba(255, 99, 72, 0.5)",
        padding: "24px 0px"
      }}>{item}</h2>
      )
      : null}
    </div>

    <div className="hero left" style={{zIndex:10}}>
      <div className="background" style={{backgroundColor: "rgba(55, 66, 250, 0.5)"}}/>
      <div className="content" style={{marginTop: 208}}>
        <h1 style={{color: 'rgba(55, 66, 250, 0.5)'}}>
            <span style={{color: "rgba(255, 99, 72, 0.5)"}}>
                {connecttitle}
            </span>
            <br/>
            {connectsubtitle}
          </h1>
          <div className="cta" style={{marginBottom: 8, display:"block"}}>
            <a href="#contact">{connectcta}</a>
          </div>
          {social.links ? social.links.map((link,i)=>
            <a key={"social"+i} alt={link.title} href={link.url}>
              <div className="socialLink">
                <img src={!!link.image.childImageSharp ? link.image.childImageSharp.fluid.src : link.image} />
              </div>
              </a>
          ) : null }
      </div>
      <img 
        src={!!connectimage.childImageSharp ? connectimage.childImageSharp.fluid.src : connectimage} 
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }} 
      />
    </div>

    <div className="hero" style={{
      backgroundColor: "rgba(255, 99, 72, 0.5)",
      padding: 48
    }}>
      <h1 style={{
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 100,
        lineHeight: "90%",
        textTransform: "uppercase",
        color: "#1E90FF",
        padding: "24px 0px"
      }} >{mainpitch.title}</h1>
      {mainpitch.skills ? 
      mainpitch.skills.map((item,i)=>
      <h2 key={"skill"+i} style={{
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 100,
        lineHeight: "90%",
        textTransform: "uppercase",
        color: "rgba(255, 99, 72, 0.5)",
        padding: "24px 0px"
      }}>{item}</h2>
      )
      : null}
    </div>

     <div className="hero" id="contact" style={{
      backgroundColor: "#0A306A",
      padding: 48
    }}>
      <h1 style={{
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 100,
        lineHeight: "90%",
        textTransform: "uppercase",
        color: "#1E90FF",
        padding: "24px 0px"
      }} >Contact</h1>
      <form name="contact" method="POST" data-netlify="true">
        <p>
          <label>Your Name: <input type="text" name="name" /></label>   
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
    </form>
    </div>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  connectcta: PropTypes.string,
  connecttitle: PropTypes.string,
  connectsubtitle: PropTypes.string,
  connectimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  social: PropTypes.shape({
    links:PropTypes.array
  })
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        connectcta={frontmatter.connectcta}
        connecttitle={frontmatter.connecttitle}
        connectsubtitle={frontmatter.connectsubtitle}
        connectimage={frontmatter.connectimage}
        social={frontmatter.social}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          skills
          description
        }
        connectcta
        connecttitle
        connectsubtitle
        connectimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        social {
          links {
            title
            url
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
