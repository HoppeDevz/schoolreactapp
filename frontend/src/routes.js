import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import ListRegisters from './pages/listRegisters';
import AddTask from './pages/addTask';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route  path='/' exact component={Logon} />
                <Route  path='/dashboard' component={Dashboard} />
                <Route path='/listRegisters' component={ListRegisters}  />
                <Route path="/addtask" component={AddTask} />
            </Switch>
        </BrowserRouter>
    )
}