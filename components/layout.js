import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => (
  <div id="container">
    <Header />
    <div id="main">{children}</div>
    <Footer />
  </div>
);

export default Layout;
