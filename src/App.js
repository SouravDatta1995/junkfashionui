import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AdminHome from "./components/AdminHome";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <AdminHome/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
