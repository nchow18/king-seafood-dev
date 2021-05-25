import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Header from './components/Header';
// import PrivateRoute from './components/PrivateRoute';
// import PublicRoute from './components/PublicRoute';
import { StoreProvider } from "./utils/GlobalState";
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Products from './pages/Products';
import Auth from './utils/auth';
import SingleProduct from './components/SingleProduct';
import Promotions from './pages/Promotions';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import SingleOrder from './pages/AdminSingleOrder';
import SingleProductEdit from './components/AdminComponents/SingleProductEdit';

const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    },
    uri: '/graphql'
});

function App() {

  const [headerLinks] = useState([
		{
			name: 'Home',
			href: '/',
			guest: true,
			user: true,
			admin: true
		},
		{
			name: 'Products',
			href: '/products',
			guest: true,
			user: true,
			admin: true
		},
		{
			name: 'Account',
			href: '/account',
			guest: false,
			user: true,
			admin: false
		},
		{
			name: 'Promotions',
			href: '/promotions',
			guest: true,
			user: true,
			admin: true
		},
		{
			name: 'Cart',
			href: '/cart',
			guest: false,
			user: true,
			admin: true
		},
		{
			name: 'Dashboard',
			href: '/admindashboard',
			guest: false,
			user: false,
			admin: true
		},
		{
			name: 'Sign In',
			href: '/signin',
			guest: true,
			user: false,
			admin: false
		},
		{
			name: 'Sign Up',
			href: '/signup',
			guest: true,
			user: false,
			admin: false
		},
	]);

	const [currentHeaderLink, setCurrentHeaderLink] = useState(headerLinks[0]);


    return (
        <ApolloProvider client={client} onload={Auth.getMode()}>
          <Router>
            <StoreProvider>
              <>
			  <nav className="header-container">
				  {/* <div>{promo[0].mainPromo}</div> */}
				<Header 
						headerLinks={headerLinks}
						currentHeaderLink={currentHeaderLink}
						setCurrentHeaderLink={setCurrentHeaderLink}
					/>
			  </nav>

                  <div className="page">
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/products" component={Products} />
					  <Route exact path="/promotions" component={Promotions} />
					  <Route exact path="/product/:id" component={SingleProduct} />
					  <Route exact path="/order/:id" component={SingleOrder} />
					  {!Auth.loggedIn() && (
						<>
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/signin" component={SignIn} />
						</>
					  )}

					  {Auth.getAdmin() === true && (
						<>
							<Route exact path="/admindashboard" component={Dashboard} />
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/productupdate/:id" component={SingleProductEdit} />
						</>
					  )}
					  {Auth.getAdmin() === false && (
						<>
							<Route exact path="/account" component={Account} />
							<Route exact path="/cart" component={Cart} />
						</>
					  )}
                      <Route component={NoMatch} />
                    </Switch>
                  </div>
                <Footer />
              </>
            </StoreProvider> 
          </Router>
        </ApolloProvider>
    );
}
export default App;