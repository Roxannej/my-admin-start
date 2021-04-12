import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import LayoutMain from '../components/Layout';
import Login from '../views/Login';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/main" component={LayoutMain} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </HashRouter>
    );
}

export default App;
