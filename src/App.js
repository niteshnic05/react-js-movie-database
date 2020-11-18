import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './components/HomePage'
import MyFav from './components/MyFav'
import SingleMovie from './components/SingleMovie'

function App() {
  return (
    <Router>
    <div className="app">
      <Switch>
        <Route path="/myfav">
          <Header />
          <MyFav />
        </Route>
        <Route path="/single-movie/:id">
          <Header />
          <SingleMovie />
        </Route>
        <Route path="/">
          <Header />
          <HomePage />
        </Route>
      </Switch>
    </div>
    </Router>
  ); 
}

export default App;
