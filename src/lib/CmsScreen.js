import './CmsScreen.css';
import React from "react";
import {withModule} from "react-hoc-di";
import CmsModule from "./Module/CmsModule";
import {RootOverlays} from "react-root-overlays";
import CmsLandingScreen from "./Landing/CmsLandingScreen";
import {Route, Switch, withRouter} from "react-router-dom";
import CmsEditScreen from "./Edit/CmsEditScreen";

const CmsScreen = props => {
  // const withLogin = (component) => {
  //   return () => (
  //     {component}
  //   )
  // }

  return (
    <RootOverlays>
      <Switch>
        <Route exact path={'/'}><CmsLandingScreen/></Route>
        <Route path={'/'}><CmsEditScreen/></Route>
      </Switch>
    </RootOverlays>
  );
}

export default withRouter(withModule(CmsScreen, CmsModule));
