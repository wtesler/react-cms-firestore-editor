import './CmsScreen.css';
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {withModule} from "react-hoc-di";
import CmsModule from "./Module/CmsModule";
import {
  ACCESS_DENIED,
  EDIT_WEBSITE,
  FAILED_LOAD_CMS
} from "./Constants/i18n";
import {Link, withRouter} from "react-router-dom";
import {ROUTE_CMS} from "./Constants/routes";
import plusImage from "./Images/plus.svg";
import {Icon} from "react-basic-icon";
import AddSectionModal from "./AddSection/AddSectionModal";
import CmsNavBar from "./NavBar/CmsNavBar";
import {CmsClient} from "react-cms-firestore";

const CmsScreen = props => {
  const {module, history} = props;
  const {toastRelay, dialogRelay} = module;

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
    history.push(`${ROUTE_CMS}/${name}`);
  }, [history]);

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
        <div className={'CmsScreenSectionOuter'} key={section}>
          <Link to={`${ROUTE_CMS}/${section}`} className={`CmsScreenSection`}>
            {section}
          </Link>
        </div>
      ))
    }

    elements.push(
      <div className={`CmsScreenSection CmsScreenAddSection`} onClick={onAddClick} key={'__AddSection__'}>
        <div className={'CmsScreenAddSectionPrompt'}>
          {'Add Section'}
        </div>
        <Icon className={'CmsScreenAddSectionIcon'} src={plusImage}/>
      </div>
    )

    return (
      <div id='CmsScreenBodyOuter'>
        <div id='CmsScreenBodyHeader' className={`ThemeHeader`}>{EDIT_WEBSITE}</div>
        <div id='CmsScreenBody'>
          {elements}
        </div>
      </div>
    );
  }, [sections, onAddClick]);

  return (
    <div id="CmsScreen">
      <CmsNavBar/>
      {mainContent}
    </div>
  );
}

export default withRouter(withModule(CmsScreen, CmsModule));
