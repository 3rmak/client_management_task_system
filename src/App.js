import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar/NavbarComponent';

import { LoginPage } from './components/Auth/LoginPage';
import { RegisterPage } from './components/Auth/RegisterPage';
import { TaskLayout } from './components/Task/TaskLayout';
import { TaskComponent } from './components/Task/TaskComponent';
import { NewTaskComponent } from './components/Task/NewTaskComponent';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => tokenValidityStatus(), []);

    function tokenValidityStatus () {
        const isToken = localStorage.getItem('access_token');
        if(!isToken) {
            setIsLogged(false);
        } else if (isToken) {
            setIsLogged(true);
        }
    }

      return (
        <div className="App">
          <BrowserRouter>
              <Navbar isLogged={ isLogged } tokenValidityStatus={ tokenValidityStatus } />
              <Route path='/signin'>
                  <LoginPage isLogged={ isLogged } tokenValidityStatus={ tokenValidityStatus } />
              </Route>
              <Route path='/signup'>
                  <RegisterPage isLogged={ isLogged } />
              </Route>
              <Route path='/logout'>
                  <Redirect to='/signin' />
              </Route>
              <Route path={'/tasks/:taskId'}>
                  <TaskComponent />
              </Route>
              <Route path='/new_task'>
                  <NewTaskComponent />
              </Route>
              <Route path='/main'>
                  <TaskLayout />
              </Route>
          </BrowserRouter>
        </div>
      );
}

export default App;
