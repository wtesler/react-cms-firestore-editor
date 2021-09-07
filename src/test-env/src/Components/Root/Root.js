import React from 'react';
import './Root.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FirebaseStartup from "./Firebase/FirebaseStartup";
import CmsScreen from "../../../../lib/index";
/**
 * Top-Level Component for the App.
 */
const Root = () => {
  // const main = <CmsScreen/>;

  const path = '/cms';

  return (
    <div id='Root'>
      <FirebaseStartup/>
      <BrowserRouter>
        <Switch>
          <Route path={path}><CmsScreen/></Route>
          <Route>{"Go to /cms"}</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Root;