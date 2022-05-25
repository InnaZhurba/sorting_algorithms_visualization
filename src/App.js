import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import InfoBlock from './components/InfoBlock';
import AlgoDemo from './components/AlgoDemo';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main_body">
        <InfoBlock />
        <AlgoDemo />
      </div>
    </div>
  );
}

export default App;
