import {BrowserRouter as Router , Redirect, Route} from 'react-router-dom'
import Header from './components/header';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Header/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/home' exact strict render={()=>{
        return localStorage.getItem('token')?<Home/>:<Redirect to='/login'/>
      }}/>
    </Router>
  );
}

export default App;
