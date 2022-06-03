import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import InfoBlock from './components/InfoBlock';
import { bubbleSort, insertionSort, quickSort, selectionSort } from './sortingAlgorithms';
import AlgoVisualizer from './components/AlgoVisualizer';
;

function App() {
  return (
    <div className="App">
    
      <Routes>
      <Route path="/" element={
          <>
            <Header highlightedLink={"/bubble"} />
            <div className="main_body">
              <InfoBlock title="Bubble Sort"/>
              <AlgoVisualizer algorithm={bubbleSort}/>
            </div>
          </>
        } />
        <Route path="/bubble" element={
          <>
            <Header highlightedLink={"/bubble"} />
            <div className="main_body">
              <InfoBlock title="Bubble Sort"/>
              <AlgoVisualizer algorithm={bubbleSort}/>
            </div>
          </>
        } />
        <Route path="/insertion" element={
          <>
            <Header highlightedLink={"/insertion"}/>
            <div className="main_body">
              <InfoBlock title="Insertion Sort"/>
              <AlgoVisualizer algorithm={insertionSort}/>
            </div>
          </>
        } />
        <Route path="/selection" element={
          <>
            <Header highlightedLink={"/selection"} />
            <div className="main_body">
              <InfoBlock title="Selection Sort"/>
              <AlgoVisualizer algorithm={selectionSort}/>
            </div>
          </>
        } />
        <Route path="/quick" element={
          <>
            <Header highlightedLink={"/quick"} />
            <div className="main_body">
              <InfoBlock title="Quick Sort"/>
              <AlgoVisualizer algorithm={quickSort}/>
            </div>
          </>
        } />
        {/* <Route path="/merge" element={
          <>
            <Header highlightedLink={"/merge"} />
            <div className="main_body">
              <InfoBlock title="Merge Sort"/>
              <AlgoVisualizer algorithm={bubbleSort}/>
            </div>
          </>
        } /> */}
      </Routes>
    </div>
  );
}

export default App;
