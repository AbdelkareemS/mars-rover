import React from "react";

let RoverValues = (props) => {

    return (
        <>
            <p className="info" style={{color: props.focusX}}>X: {props.x}</p>
            <p className="info" style={{color: props.focusY}}>Y: {props.y}</p>
            <p className="info">Heading: {props.heading}</p>
        </>
    )
}

export default RoverValues;