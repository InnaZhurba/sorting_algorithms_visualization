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
      <Header />
      <div className="main_body">
        <Routes>
          <Route path="/bubble" element={
            <>
              <InfoBlock title="Bubble Sort"/>
              <AlgoVisualizer algorithm={bubbleSort}/>
            </>
          } />
          <Route path="/insertion" element={
            <>
              <InfoBlock title="Insertion Sort"/>
              <AlgoVisualizer algorithm={insertionSort}/>
            </>
          } />
          <Route path="/selection" element={
            <>
              <InfoBlock title="Selection Sort"/>
              <AlgoVisualizer algorithm={selectionSort}/>
            </>
          } />
          <Route path="/quick" element={
            <>
              <InfoBlock title="Quick Sort"/>
              <AlgoVisualizer algorithm={quickSort}/>
            </>
          } />
          <Route path="/merge" element={
            <>
              <InfoBlock title="Merge Sort"/>
              {/* Here should be merge sort, but it doesn't work */}
              <AlgoVisualizer algorithm={bubbleSort}/> 
            </>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
