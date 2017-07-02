import React, {Component} from "react";

class MovieItem extends Component {
  render() {
    return (
      <div className="MovieItem">
        <img src={this.props.cover} alt={this.props.title}/>
        <h3>{this.props.title}</h3>
        <small>{this.props.originalTitle}</small>
      </div>
    )
  }
}

export default MovieItem;