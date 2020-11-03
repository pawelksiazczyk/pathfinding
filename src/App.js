import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Maze from './components/Maze/Maze';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__content">
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Board} />
            <Route path="/maze" exact component={Maze} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
