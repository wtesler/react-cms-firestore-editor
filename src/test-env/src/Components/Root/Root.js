import React from 'react';
import './Root.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FirebaseStartup from "./Firebase/FirebaseStartup";
import CmsScreen from "../../../../lib/index";
/**
 * Top-Level Component for the App.
 */
const Root = () => {
  // const main = <CmsScreen/>;

  const path = '/cms/*';

  return (
    <div id='Root'>
      <FirebaseStartup/>
      <BrowserRouter>
        <Routes>
          <Route path={path} element={<CmsScreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Root;
