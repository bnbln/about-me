import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

import CookieConsent from "react-cookie-consent";


// function setCookies() {
//     var s = document.createElement('script');
//     s.type = "text/javascript"
//     s.async = "true";
//     s.src = "https://www.googletagmanager.com/gtag/js?id=G-7G7CKXKSY1";
//     var x = document.getElementsByTagName('script')[0];
//     x.parentNode.insertBefore(s, x);
// };

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  // const [hasCookie, setCookie] = useState(undefined);
  // useEffect(() => setCookie(document.cookie, []) );
  // var cookie = hasCookie
  // if (!!cookie) {
  //   var gdpr = cookie
  //     .split('; ')
  //     .find(row => row.startsWith('gdpr'))
  //     .split('=')[1];
  //     console.log(gdpr);
  //     if (!!gdpr === true) {
  //       setCookies()
  //   }
  // }
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;900&display=swap" rel="stylesheet"></link>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-7G7CKXKSY1"></script> */}

      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
      <CookieConsent
          location="bottom"
          buttonText="Accept"
          buttonStyle={{backgroundColor: "rgba(255, 165, 2, 1)", borderRadius: 99, fontSize: "16px", color: "white", fontWeight: 900, padding: "8px 24px"}}
          enableDeclineButton={true}
          declineButtonText="Decline"
          declineButtonStyle={{backgroundColor: "rgba(255, 165, 2, 0)", borderRadius: 99}}
          cookieName="gdpr"
          style={{ background: "rgba(30, 144, 255, 1)" }}
          expires={150}
          onAccept={() => {
            console.log("allow cookies")
            // setCookies()
            // window.dataLayer = window.dataLayer || [];
            // function gtag(){dataLayer.push(arguments);}
            // gtag('js', new Date());
            // gtag('config', '${GA_TRACKING_ID}', {'anonymize_ip': true});
          }}
        >
          This website uses cookies to enhance the user experience.{" "}&#127850;
        </CookieConsent>
    </div>
  )
}

export default TemplateWrapper
