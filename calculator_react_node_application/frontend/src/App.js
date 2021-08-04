import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Console from './components/Console';
import { Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';



function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
        <Switch>
          <Route path="/" exact component={Console} /> 
        </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
