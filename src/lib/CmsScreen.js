import './CmsScreen.css';
import React from "react";
import {RootOverlays} from "react-root-overlays";
import CmsLandingScreen from "./Landing/CmsLandingScreen";
import {Route, Routes} from "react-router-dom";
import CmsEditScreen from "./Edit/CmsEditScreen";
import {LoginPortal} from 'react-firebase-login';

const CmsScreen = () => {
  return (
    <div className={'CmsScreen'}>
      <RootOverlays>
        <LoginPortal>
          <Routes>
            <Route path={'/'} element={<CmsLandingScreen/>}/>
            <Route path={'/*'} element={<CmsEditScreen/>}/>
          </Routes>
        </LoginPortal>
      </RootOverlays>
    </div>
  );
}

export default CmsScreen;
