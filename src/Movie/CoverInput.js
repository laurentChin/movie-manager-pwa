import React, {Component} from 'react';

const assetsUrl = process.env.REACT_APP_ASSETS_URL;

class CoverInput extends Component {

  constructor(props) {
    super(props);
    this.poster = React.createRef();
  }

  onChangeHandler(reduxFormOnChangeHandler) {
    return (event) => {
      const file = event.target.files[0];
      reduxFormOnChangeHandler(event.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = (event) => {
        this.poster.current.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  render() {
    const {input} = this.props;
    const poster = input.value;
    delete input.value;
    return (
      <div>
        <img src={`${assetsUrl}/${poster}`} alt="movie_poster" ref={this.poster} />
        <input type="file" {...input} onChange={this.onChangeHandler(input.onChange)}/>
      </div>
    )
  }
}

export default CoverInput;
