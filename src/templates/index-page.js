import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'


import Typed from 'react-typed';
import TextField from '@material-ui/core/TextField';

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
  <div style={{display: "flex", flexDirection: "column"}}>

    <div className="hero right" style={{zIndex:10}}>
      <div className="content">
        <h1 className="lead" style={{color: "rgba(255, 165, 2, 0.5)"}}>
          {title}
          <br/>
          <span style={{color: '#1E90FF', fontWeight:900}}>
          <Typed
                    strings={[subheading, "normal", "grey", "flat"]}
                    backDelay={2000}
                    typeSpeed={30}
                    backSpeed={50}
                    loop
                />
          </span>
        </h1>
      </div>
      <div className="background" style={{backgroundColor: "rgba(30, 144, 255, 0.5)"}}>
        <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} alt="Illustration" className="heroimage1"/>
      </div>
    </div>

    <div className="hero" style={{backgroundColor: "rgba(255, 165, 2, 0.5)"}}>
      <div className="content">
        <h1 style={{color: "#1E90FF"}}>
          {mainpitch.title}
        </h1>
        {mainpitch.skills ? mainpitch.skills.map((item,i)=>
        <h2 key={"skill"+i} className="skill">{item}</h2>
        ): null}
      </div>
    </div>

    <div className="hero left">
      <div className="content">
        <h1 style={{color: "rgba(255, 99, 72, 0.5)"}}>
                {connecttitle}
            <br/>
            <span style={{color: 'rgba(55, 66, 250, 0.5)', fontWeight:900}}>
            {connectsubtitle}
            </span>
          </h1>
          <div style={{
            display: "flex-wrap",
            flexDirection: "row"
          }}>
            <div className="cta" style={{marginBottom: 8, display:"block"}}>
              <a href="#contact">{connectcta}</a>
            </div>
            {social.links ? social.links.map((link,i)=>
              <a key={"social"+i} href={link.url} target="_blank" rel="noreferrer">
                <div className="socialLink">
                  {console.log(link)}
                  <img src={!!link.image.childImageSharp ? link.image.childImageSharp.fluid.src : link.image.publicURL} alt={link.title} />
                </div>
                </a>
            ) : null }
          </div>
      </div>
      <div className="background" style={{backgroundColor: "rgba(55, 66, 250, 0.5)", overflow:"hidden"}}>
        <img className="connectimg" src={!!connectimage.childImageSharp ? connectimage.childImageSharp.fluid.src : connectimage} alt="Illustration"/>
      </div>
    </div>

    <div className="hero" style={{backgroundColor: "rgba(255, 99, 72, 0.5)"}}>
      <div className="content">
        <h1 style={{color: "#0A306A"}} >{heading}</h1>
        <h1 style={{fontWeight: 900,color: "rgba(255, 99, 72, 0.5)"}}>{name}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>

     <div className="hero" id="contact" style={{backgroundColor: "#0A306A"}}>
      <div className="content">
        <h1 style={{color: "#1E90FF"}}>Contact</h1>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <TextField className="formField" label="Name" variant="filled" fullWidth />
          <TextField className="formField" label="E-Mail" variant="filled" fullWidth />
          <TextField className="formField" label="Message" variant="filled" multiline fullWidth />
          <div className="cta" style={{marginBottom: 8, display:"block", marginTop: 24}}>
              <button type="submit" style={{color:"rgb(10, 48, 106)"}}>Send</button>
          </div>
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
              publicURL
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
