import _ from 'lodash';
import { calcAreaHeight, correctXposition, validWidthSum, updatePlayGroundOnResize } from '../helpers';
import React, { Component } from 'react';
import Rectangle from './Rectangle';
import RectanglesControlForm from './RectanglesControlForm';

import './rectangles-playground.css';

class RectanglesPlayground extends Component {
  constructor(props) {
    super(props);

    this.createNewRectangle = this.createNewRectangle.bind(this);
    this.updateSelectedRectangle = this.updateSelectedRectangle.bind(this);
    this.selectRectangle = this.selectRectangle.bind(this);
    this.deselectRectangle = this.deselectRectangle.bind(this);
    this.deleteRectangle = this.deleteRectangle.bind(this);

    this.state = {
      lastId: 0,
      rectangles: {},
      selectedRectangle: null,
      areaHeight: 'auto',
      updateFormValues: null
    };
  }

  componentDidMount() {
    this.retriveState();
    this.saveConfigOnBeforeUnLoad();
    this.listenToWindowResize();
  }

  render() {
    const { rectangles, selectedRectangle, areaHeight, error } = this.state;
    return (
      <div className="playground">
          <RectanglesControlForm
            numberOfRectangles={Object.keys(rectangles).length}
            onSubmit={this.createNewRectangle}
            onChange={selectedRectangle !== null ? this.updateSelectedRectangle : null}
            currentConfig={selectedRectangle !== null ? this.getRectangleConfig() : null}
            deleteRectangle={this.deleteRectangle}/>

          {error ? (
            <div className="alert alert-danger">
             <b>Error: </b><span>Sum of the rectangles shouldn't be more then viewPortWidth.</span>
            </div>
          ) : ''}

          <div className="rectangles-area" style={{height: areaHeight}} onClick={this.deselectRectangle}>
            {rectangles && Object.keys(rectangles).length ? (
              Object.keys(rectangles).map((key, index) => (
                <Rectangle selectedRectangle={this.selectRectangle}
                  key={index} {...rectangles[key]} id={key} selected={selectedRectangle ? selectedRectangle.toString() : ''} />
                )
              )
            ) : ''}
          </div>
      </div>
    );
  }

  createNewRectangle(config) {
    if (validWidthSum(this.state.rectangles, config) && Object.keys(this.state.rectangles).length < 5) {
      correctXposition(config);
      this.setState((prevState) => {
        prevState.rectangles[prevState.lastId] = config;

        return {
          selectedRectangle: prevState.lastId,
          lastId: ++prevState.lastId,
          rectangles: prevState.rectangles,
          areaHeight: calcAreaHeight(prevState.rectangles, prevState.areaHeight)
        }
      });
    }
  }

  updateSelectedRectangle(config) {
    const updateRectangle = () => {
      correctXposition(config);
      this.setState(prevState => {
        prevState.rectangles[prevState.selectedRectangle] = config;

        return {
          rectangles: prevState.rectangles,
          areaHeight: calcAreaHeight(prevState.rectangles, prevState.areaHeight),
          error: !validWidthSum(prevState.rectangles)
        };
      });
    }

    // always alow user to decrise width
    if (config.width < this.state.rectangles[this.state.selectedRectangle].width) {
      updateRectangle();
    } else if (validWidthSum(this.state.rectangles, config, this.state.selectedRectangle)) {
      updateRectangle();
    } else {
      this.setState({updateFormValues: Date.now()});
    }
  }

  selectRectangle(rectangleId) {
    if (this.state.selectedRectangle !== rectangleId) {
      this.setState({selectedRectangle: rectangleId});
    }
  }

  deselectRectangle() {
    if (this.state.selectedRectangle !== null) {
      this.setState({selectedRectangle: null});
    }
  }

  getRectangleConfig() {
    return this.state.rectangles[this.state.selectedRectangle];
  }

  deleteRectangle() {
    this.setState((prevState) => {
      delete prevState.rectangles[prevState.selectedRectangle];
      prevState.selectedRectangle = null;
      prevState.areaHeight = calcAreaHeight(prevState.rectangles, prevState.areaHeight);

      return prevState;
    });
  }

  retriveState() {
    const retrivedState = JSON.parse(localStorage.getItem('rec-test-app-rectanglesConfigs'));

    if (retrivedState && Object.keys(retrivedState).length) {
      retrivedState.areaHeight = calcAreaHeight(retrivedState.rectangles, retrivedState.areaHeight);
      retrivedState.error = !validWidthSum(retrivedState.rectangles);
      this.setState(retrivedState);
    }
  }

  saveConfigOnBeforeUnLoad() {
    const saveRectanglesConfig = () => localStorage.setItem('rec-test-app-rectanglesConfigs', JSON.stringify(this.state));
    window.addEventListener('beforeunload', saveRectanglesConfig);
  }

  listenToWindowResize() {
    const updatePlayGround = () => {
      const newState = updatePlayGroundOnResize(this.state.rectangles, this.state.areaHeight);

      if (validWidthSum(newState.rectanglesCopy)) {
        this.setState({
          rectangles: newState.rectanglesCopy,
          areaHeight: newState.areaHeight,
          error: false
        });
      } else {
        this.setState({
          error: true
        });
      }
    };

    window.addEventListener('resize', _.debounce(updatePlayGround , 100));
  }
}

export default RectanglesPlayground;
