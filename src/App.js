import { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import CartIndicator from './components/CartIndicator'
import BookStore from './components/BookStore'
import Cart from './components/Cart'
import { Route, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

class App extends Component {
  state = {
    cart: [], // initially cart will always be an empty array
  }

  addToCart = (book) => {
    let newCart = [...this.state.cart]
    newCart.push(book)
    this.setState({
      cart: newCart,
    })
  }

  removeFromCart = (index) => {
    let newCart = [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)]
    this.setState({
      cart: newCart,
    })
  }

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col sm={12} className="text-center background-div">
              <Link to="/">
                <h1>Strivazon Book Store</h1>
              </Link>
            </Col>
            <CartIndicator cartLength={this.state.cart.length} />
          </Row>
          <hr />
          {/* BookStore now needs a prop, addToCart */}
          {/* with this syntax you have to provide manually history, location and match */}
          {/* <Route path="/" exact>
            <BookStore addToCart={this.addToCart} />
          </Route> */}
          <Route path="/" exact render={(routerProps) => <BookStore {...routerProps} addToCart={this.addToCart} />} />
          <Route
            path="/cart"
            exact
            render={(routerProps) => (
              <Cart {...routerProps} cart={this.state.cart} removeFromCart={this.removeFromCart} />
            )}
          />
        </Container>
      </Router>
    )
  }
}

export default App
