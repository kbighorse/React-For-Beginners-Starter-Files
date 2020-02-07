import React, { Component } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }

  authHandler = async (authData) => {
    const storeId = this.props.storeId
    console.log(storeId);
    const store = await base.fetch(storeId, { context: this });
    console.log(store)
    if(!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uuid
      })
    }
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  render() {
    return <Login authenticate={this.authenticate} />
    return (
      <div className="inventory">
        <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              fish={this.props.fishes[key]}
              index={key}
              key={key}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
