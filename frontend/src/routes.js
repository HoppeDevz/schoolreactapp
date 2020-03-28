import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import ListRegisters from './pages/listRegisters';
import AddTask from './pages/addTask';
import BillAccount from './pages/billaccount';
import ChangeBill from './pages/changebill';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route  path='/' exact component={Logon} />
                <Route  path='/dashboard' component={Dashboard} />
                <Route path='/listRegisters' component={ListRegisters}  />
                <Route path="/addtask" component={AddTask} />
                <Route path ="/billAccount/:id?" component={BillAccount} />
                <Route path="/changebill/:id/:billID" component={ChangeBill} />
            </Switch>
        </BrowserRouter>
    )
}