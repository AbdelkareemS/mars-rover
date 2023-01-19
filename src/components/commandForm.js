import { useEffect, useState } from 'react';
import RoverValues from './roverValues';
import "./commandForm.css";

function CommandsForm({ initialX, initialY, initialHeading, obstacles }) {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [heading, setHeading] = useState(initialHeading);
    const [status, setStatus] = useState('Ready to Move CAPTAIN !');
    const [commands, setCommands] = useState('');
    const [focusX, setFocusX] = useState('#FFF');
    const [focusY, setFocusY] = useState('lime');

    useEffect(() => {
        let lastCommand = commands.slice(-1);

        if (!["F", "B", "L", "R", ""].includes(lastCommand)) {
            setStatus(`Invalid command you can only use F, B, L, and R`);
        }

        let nextX = x;
        let nextY = y;

        if (lastCommand === "F" || lastCommand === "B") {
            // Move Forward or Backward
            if (heading === "NORTH") {
                lastCommand === "F" ? nextY += 1 : nextY -= 1;
                lastCommand === "F" ? setFocusY("lime") : setFocusY("red");
            } else if (heading === "EAST") {
                lastCommand === "F" ? nextX += 1 : nextX -= 1;
                lastCommand === "F" ? setFocusX("lime") : setFocusX("red");
            } else if (heading === "SOUTH") {
                lastCommand === "F" ? nextY -= 1 : nextY += 1;
                lastCommand === "F" ? setFocusY("red") : setFocusY("lime");
            } else if (heading === "WEST") {
                lastCommand === "F" ? nextX -= 1 : nextX += 1;
                lastCommand === "F" ? setFocusX("red") : setFocusX("lime");
            }
            setStatus("WEEEEEEEEEEEEEEEEEEEEEE !")
        } else if (lastCommand === "L" || lastCommand === "R") {
            // Rotate Rover
            if (heading === "NORTH") {
                lastCommand === "R" ? setHeading("EAST") : setHeading("WEST");
                setFocusX("lime");
                setFocusY("#FFF");
            } else if (heading === "EAST") {
                lastCommand === "R" ? setHeading("SOUTH") : setHeading("NORTH");
                setFocusX("#FFF");
                setFocusY("lime");
            } else if (heading === "SOUTH") {
                lastCommand === "R" ? setHeading("WEST") : setHeading("EAST");
                setFocusX("lime");
                setFocusY("#FFF");
            } else if (heading === "WEST") {
                lastCommand === "R" ? setHeading("NORTH") : setHeading("SOUTH");
                setFocusX("#FFF");
                setFocusY("lime");
            }
            setStatus(`Rotate the Rover`)
        }

        // Check if the rover's next position contains an obstacle
        if (obstacles.some(([x, y]) => x === nextX && y === nextY)) {
            setStatus(`STOPPED due to collision at (${x}, ${y}) ${heading}`);
        } else {
            setY(nextY);
            setX(nextX);
        }

    }, [commands.length])

    const executeCommands = (e) => {
        e.preventDefault();
        setCommands('');
    }


    return (
        <form onSubmit={executeCommands}>
            <label htmlFor="commands">MARS ROVER CONTROL PANEL</label>
            <span className='instructions'>Press Etr to Clear Commands Panel</span>
            <input
                type="text"
                value={commands}
                onChange={e => setCommands(e.target.value)}
                onKeyDown={e => e.key ==='Backspace' ? setCommands('') : null}
            />
            <RoverValues x={x} y={y} heading={heading} focusX={focusX} focusY={focusY} />
            <p className='status'>{status}</p>
        </form>
    )
}

export default CommandsForm;
