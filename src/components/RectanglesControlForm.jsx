import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RectanglesControlForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.widthChangeHandler = this.widthChangeHandler.bind(this);
    this.heightChangeHandler = this.heightChangeHandler.bind(this);
    this.positionXChangeHandler = this.positionXChangeHandler.bind(this);
    this.positionYChangeHandler = this.positionYChangeHandler.bind(this);
    this.defaultState = {
      width: 100,
      height: 100,
      top: 0,
      left: 0
    };

    this.state = this.defaultState;
  }

  componentWillReceiveProps(props) {
    if (props.currentConfig) {
      this.setState(props.currentConfig);
    } else {
      this.setState(this.defaultState);
    }
  }

  render() {
    const { width, height, top, left } = this.state;

    return (
      <form className="form-inline reactangles-control-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="rec-width">Width</label>
          <input type="number" step="10" min="0" className="form-control" id="rec-width"
            onChange={this.widthChangeHandler} value={width}/>
        </div>

        <div className="form-group">
          <label htmlFor="rec-height">Height</label>
          <input type="number" step="10" min="0" className="form-control" id="rec-height"
            onChange={this.heightChangeHandler} value={height}/>
        </div>

        <div className="form-group">
          <label htmlFor="x-position">X-Position</label>
          <input type="number" step="10" min="0" className="form-control" id="x-position"
            onChange={this.positionXChangeHandler} value={left}/>
        </div>

        <div className="form-group">
          <label htmlFor="y-position">Y-Position</label>
          <input type="number" step="10" min="0" className="form-control" id="y-position"
            onChange={this.positionYChangeHandler} value={top}/>
        </div>

        {(this.props.numberOfRectangles < 5 && !this.props.currentConfig) ? (
          <button type="submit" className="btn btn-primary add-new">Add New</button>
        ) : ''}

        {this.props.currentConfig ? (
          <button type="button" className="btn btn-default delete" onClick={this.props.deleteRectangle}>Delete</button>
        ) : ''}
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  widthChangeHandler(event) {
    if (event.target.value) {
      this.setState({width: parseInt(event.target.value, 10)}, this.onChange);
    }
  }

  heightChangeHandler(event) {
    if (event.target.value) {
      this.setState({height: parseInt(event.target.value, 10)}, this.onChange);
    }
  }

  positionXChangeHandler(event) {
    if (event.target.value) {
      this.setState({left: parseInt(event.target.value, 10)}, this.onChange);
    }
  }

  positionYChangeHandler(event) {
    if (event.target.value) {
      this.setState({top: parseInt(event.target.value, 10)}, this.onChange);
    }
  }
}

RectanglesControlForm.propTypes = {
  numberOfRectangles: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,

  currentConfig: PropTypes.shape({
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  deleteRectangle: PropTypes.func,
};

export default RectanglesControlForm;
