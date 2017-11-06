import React from 'react';
import PropTypes from 'prop-types';

const Rectangle  = ({id, width, height, top, left, bottom, right, selectedRectangle, selected}) => {
  const onClickHandler = (event) => {
    event.stopPropagation();
    selectedRectangle(id);
  }

  const rectangleStyles = {
    width: width,
    height: height,
    top: top,
    left: left,
    border: selected === id ? '1px solid #333' : ''
  };

  return (
    <div className="rectangle" onClick={onClickHandler} id={id} style={rectangleStyles}></div>
  );
};

Rectangle.propTypes = {
  selectedRectangle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  selected: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

export default Rectangle;
