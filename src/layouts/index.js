import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Head from './Head';
import './index.css';
import './prism-coy.css';

const Layout = ({ children, data }) => (
  <div id="container">
    <Head data={data} />
    <Header data={data} />
    <div id="main">{children()}</div>
    <Footer data={data} />
  </div>
);

export default Layout;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        subtitle
        description
        siteUrl
        disqusShortname
      }
    }
  }
`;
