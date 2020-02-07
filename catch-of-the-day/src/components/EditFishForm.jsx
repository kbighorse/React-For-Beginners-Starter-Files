import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
    })
  }

  handleChange = (event) => {
    const key = this.props.index;
    const input = event.currentTarget
    const field = input.name
    const value = input.value
    const updatedFish = {
      ...this.props.fish,
      [field]: value
    }

    this.props.updateFish(key, updatedFish);
  }

  render() {
    const fish = this.props.fish;

    if (!fish) {
      return null;
    }

return <div className="fish-edit" key={fish.name}>
      <input
        name="name"
        onChange={this.handleChange}
        value={fish.name} type="text" placeholder="Name"
      />
      <input
        name="price"
        onChange={this.handleChange}
        value={fish.price}
        type="number"
        placeholder="Price"
      />
      <select
        name="status"
        onChange={this.handleChange}
        value={fish.status}
      >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>

      <textarea
        name="desc"
        onChange={this.handleChange}
        value={fish.desc} placeholder="Desc"
      />
      <input
        name="image"
        onChange={this.handleChange}
        type="text"
        placeholder="Image"
      />
      <button onClick={() => this.props.deleteFish(this.props.index)}>
        Delete
      </button>
    </div>
  }
}

export default EditFishForm;