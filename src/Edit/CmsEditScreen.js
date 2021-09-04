import './CmsEditScreen.css';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {withModule} from 'react-hoc-di';
import CmsEditNavBar from './NavBar/CmsEditNavBar';
import {ACCESS_DENIED, FAILED_LOAD_CMS, FAILED_SAVE_CMS, SAVE, SAVING} from '../Constants/i18n';
import CmsEditModule from './Module/CmsEditModule';
import CmsSection from '../Section/CmsSection';
import {withRouter} from 'react-router-dom';
import {URLHelper} from '../URL/URLHelper';
import {CmsClient} from 'react-cms-firestore';

const CmsEditScreen = props => {
  const {module, location} = props;
  const {toastRelay} = module;

  const [cmsData, setCmsData] = useState(null);
  const [cmsKey, setCmsKey] = useState(null);

  const readCms = useCallback(async (key) => {
    try {
      const dataPerKey = await CmsClient.readCms(key, null);
      const data = dataPerKey[0];
      setCmsData(data);
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
    const key = URLHelper.getPathEnd(location);
    setCmsKey(key);
  }, [location]);

  useEffect(() => {
    if (!cmsKey) {
      return;
    }
    readCms(cmsKey);
  }, [readCms, cmsKey]);

  const mainContent = useMemo(() => {
    if (!cmsData) {
      return null;
    }

    return (
      <div id='CmsEditScreenBodyOuter'>
        <div id='CmsEditScreenBody'>
          <CmsSection cmsKey={cmsKey} data={cmsData}/>
        </div>
      </div>
    );
  }, [cmsData, cmsKey]);

  const onSaveClick = useCallback(async() => {
    try {
      toastRelay.show(SAVING, true);
      await CmsClient.updateCms(cmsKey, cmsData);
      toastRelay.show(null);
      return true;
    } catch (e) {
      console.error(e);
      toastRelay.show(FAILED_SAVE_CMS, false, 5000);
      return false;
    }
  }, [toastRelay, cmsKey, cmsData]);

  return (
    <div id='CmsEditScreen'>
      <CmsEditNavBar/>
      {mainContent}
      <div id='CmsEditScreenSaveButton' onClick={onSaveClick}>
        {SAVE}
      </div>
    </div>
  );
}

export default withRouter(withModule(CmsEditScreen, CmsEditModule));
