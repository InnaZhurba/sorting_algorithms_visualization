import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import InfoBlock from './components/InfoBlock';
import AlgoDemo from './components/AlgoDemo';import { bubbleSort } from './sortingAlgorithms';
import AlgoVisualizer from './components/AlgoVisualizer';
;

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main_body">
        <Routes>
          <Route path="/bubble" element={<InfoBlock title="Bubble Sort"/>} />
          <Route path="/insertion" element={<InfoBlock title="Insertion Sort"/>} />
          <Route path="/selection" element={<InfoBlock title="Selection Sort"/>} />
          <Route path="/quick" element={<InfoBlock title="Quick Sort"/>} />
          <Route path="/merge" element={<InfoBlock title="Merge Sort"/>} />
        </Routes>
        {/* <AlgoDemo algorithm={bubbleSort}/> */}
        <AlgoVisualizer algorithm={bubbleSort}/>
      </div>
    </div>
  );
}

export default App;
