import React from 'react';
import './Root.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FirebaseStartup from "./Firebase/FirebaseStartup";
import CmsScreen from "react-cms-firestore-editor";
/**
 * Top-Level Component for the App.
 */
const Root = () => {
  // const main = <CmsScreen/>;

  return (
    <div id='Root'>
      <FirebaseStartup/>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'}><CmsScreen/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Root;
