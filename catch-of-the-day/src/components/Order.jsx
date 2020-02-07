import React, { Component } from "react";
import {formatPrice} from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];

    if (!fish) {
      return null;
    }

    const count = this.props.order[key];
    const isAvailable = fish.status === "available";

    return (
      <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
        <li key={key}>
          {isAvailable ?
            `${count} lbs ${fish.name} ${formatPrice(count * fish.price)}`
            :
            `Sorry ${fish ? fish.name : "fish"} is no longer available`
          }
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((subtotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

      if(isAvailable) {
        return subtotal + (count * fish.price);
      }

      return subtotal
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
