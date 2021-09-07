import './CmsScreen.css';
import React from "react";
import {withModule} from "react-hoc-di";
import CmsModule from "./Module/CmsModule";
import {RootOverlays} from "react-root-overlays";
import CmsLandingScreen from "./Landing/CmsLandingScreen";
import {Route, Switch} from "react-router-dom";
import CmsEditScreen from "./Edit/CmsEditScreen";

const CmsScreen = props => {
  const withLogin = (component) => {
    return () => (
      {component}
    )
  }

  const {pathname} = this.props.location;
  console.log(pathname);

  return (
    <RootOverlays>
      <Switch>
        <Route exact path={pathname} render={withLogin(<CmsLandingScreen/>)}/>
        <Route path={pathname} render={withLogin(<CmsEditScreen/>)}/>
      </Switch>
      <CmsLandingScreen/>
    </RootOverlays>
  );
}

export default withModule(CmsScreen, CmsModule);
