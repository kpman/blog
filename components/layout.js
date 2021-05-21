import React from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div id="container">
    <Header />
    <div id="main">{children}</div>
    <Footer />
  </div>
);

export default Layout;
