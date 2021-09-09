import './CmsLandingScreen.css';
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  ACCESS_DENIED,
  EDIT_WEBSITE,
  FAILED_LOAD_CMS
} from "../Constants/i18n";
import {Link, withRouter} from "react-router-dom";
import plusImage from "../Images/plus.svg";
import {Icon} from "react-basic-icon";
import AddSectionModal from "../AddSection/AddSectionModal";
import CmsNavBar from "../NavBar/CmsNavBar";
import {CmsClient} from "react-cms-firestore";
import {withModule} from "react-hoc-di";

const CmsLandingScreen = props => {
  const {module, history, headerClass} = props;
  const {toastRelay, dialogRelay, rootPath} = module;

  const [sections, setSections] = useState(null);

  const readCmsSections = useCallback(async () => {
    try {
      const sections = await CmsClient.readCmsSections();
      setSections(sections);
    } catch (e) {
      console.error(e);
      let msg = FAILED_LOAD_CMS;
      if (e.code && e.code === 403) {
        msg = ACCESS_DENIED;
      }
      toastRelay.show(msg, true);
    }
  }, [toastRelay]);

  useEffect(() => {
    readCmsSections();
  }, [readCmsSections]);

  const onNewSectionSubmit = useCallback((name) => {
    history.push(`${rootPath}/${name}`);
  }, [history, rootPath]);

  const onAddClick = useCallback(() => {
    dialogRelay.show(
      <AddSectionModal onSubmit={onNewSectionSubmit}/>,
      true,
      null
    );
  }, [dialogRelay, onNewSectionSubmit]);

  const mainContent = useMemo(() => {
    if (!sections) {
      return null;
    }

    const elements = [];
    for (const section of sections) {
      elements.push((
        <div className={'CmsLandingScreenSectionOuter'} key={section}>
          <Link to={`${rootPath}/${section}`} className={`CmsLandingScreenSection`}>
            {section}
          </Link>
        </div>
      ))
    }

    elements.push(
      <div className={`CmsLandingScreenSection CmsLandingScreenAddSection`} onClick={onAddClick} key={'__AddSection__'}>
        <div className={'CmsLandingScreenAddSectionPrompt'}>
          {'Add Section'}
        </div>
        <Icon className={'CmsLandingScreenAddSectionIcon'} src={plusImage}/>
      </div>
    )

    return (
      <div id='CmsLandingScreenBodyOuter'>
        <div id='CmsLandingScreenBodyHeader' className={headerClass ? headerClass : ''}>{EDIT_WEBSITE}</div>
        <div id='CmsLandingScreenBody'>
          {elements}
        </div>
      </div>
    );
  }, [sections, onAddClick, headerClass, rootPath]);

  return (
    <div id="CmsLandingScreen">
      <CmsNavBar/>
      {mainContent}
    </div>
  );
}

export default withRouter(withModule(CmsLandingScreen));
