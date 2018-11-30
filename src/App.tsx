import * as React from 'react';
import './assets/styles/components/App.css'
import Game from "./components/Game";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

export default App;
