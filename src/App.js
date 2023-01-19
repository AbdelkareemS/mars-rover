import './App.css';
import CommandForm from './components/commandForm';

function App() {
  return (
    <div className="App">
      <div className='stars'></div>
      <CommandForm
        initialX={0}
        initialY={0}
        initialHeading={"NORTH"}
        commands={''}
        obstacles={[[1, 4], [2, 2]]}
      />
    </div>
  );
}

export default App;
