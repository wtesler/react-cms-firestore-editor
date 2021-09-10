import './CmsScreen.css';
import React, {useMemo} from "react";
import {withModule} from "react-hoc-di";
import CmsModule from "./Module/CmsModule";
import {RootOverlays} from "react-root-overlays";
import CmsLandingScreen from "./Landing/CmsLandingScreen";
import {withRouter} from "react-router-dom";
import CmsEditScreen from "./Edit/CmsEditScreen";
import {LoginPortal} from 'react-firebase-login';

const CmsScreen = props => {
  const {match, module} = props;

  if (match.isExact) {
    module.rootPath = match.path;
  }

  const page = useMemo(() => {
    return match.isExact ? <CmsLandingScreen/> : <CmsEditScreen/>;
  }, [match])

  return (
    <div className={'CmsScreen'}>
      <RootOverlays>
        <LoginPortal>
          {page}
        </LoginPortal>
      </RootOverlays>
    </div>
  );
}

export default withRouter(withModule(CmsScreen, CmsModule));
