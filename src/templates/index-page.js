import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  connectcta,
  connecttitle,
  connectsubtitle,
  connectimage,
  social,
  name,
  description
}) => (
  <div>

    <div className="hero right" style={{zIndex:10}}>
      <div className="content">
        <h1 className="lead" style={{color: "rgba(255, 165, 2, 0.5)"}}>
          {title}
          <br/>
          <span style={{color: '#1E90FF', fontWeight:900}}>
            {subheading}
          </span>
        </h1>
      </div>
      <div className="background" style={{backgroundColor: "rgba(30, 144, 255, 0.5)"}}>
        <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} alt="Illustration"/>
      </div>
    </div>

    <div className="hero" style={{backgroundColor: "rgba(255, 165, 2, 0.5)"}}>
      <div className="content">
        <h1 style={{color: "#1E90FF"}}>
          {mainpitch.title}
        </h1>
        {mainpitch.skills ? mainpitch.skills.map((item,i)=>
        <h2 key={"skill"+i} className="skill" style={{
          color: "rgba(255, 99, 72, 0.5)",
        }}>{item}</h2>
        ): null}
      </div>
    </div>

    <div className="hero left">
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
      <div className="background" style={{backgroundColor: "rgba(55, 66, 250, 0.5)"}}>
      <img 
        src={!!connectimage.childImageSharp ? connectimage.childImageSharp.fluid.src : connectimage} 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none"
        }} 
      />
      </div>
    </div>

    <div className="hero" style={{backgroundColor: "rgba(255, 99, 72, 0.5)"}}>
      <div className="content">
        <h1 style={{color: "#0A306A"}} >{heading}</h1>
        <h1 style={{fontWeight: 900,color: "rgba(255, 99, 72, 0.5)"}}>{name}</h1>
        <p style={{color: "#0A306A"}}>{description}</p>
      </div>
    </div>

     <div className="hero" id="contact" style={{backgroundColor: "#0A306A"}}>
      <div className="content">
        <h1 style={{color: "#1E90FF"}}>Contact</h1>
        <form name="contact" method="POST" data-netlify="true">
          <input className="email" type="text" name="name" placeholder="Name"/>
          <input className="email" type="email" name="email" placeholder="Mail" />
          <textarea name="message" placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
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

  connectcta: PropTypes.string,
  connecttitle: PropTypes.string,
  connectsubtitle: PropTypes.string,
  connectimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  social: PropTypes.shape({
    links:PropTypes.array
  }),
  name: PropTypes.string
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        connectcta={frontmatter.connectcta}
        connecttitle={frontmatter.connecttitle}
        connectsubtitle={frontmatter.connectsubtitle}
        connectimage={frontmatter.connectimage}
        social={frontmatter.social}
        heading={frontmatter.heading}
        name={frontmatter.name}
        description={frontmatter.description}
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
        heading
        name
        description
      }
    }
  }
`
