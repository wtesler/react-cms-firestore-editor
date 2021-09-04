import './CmsEditNavBar.css';
import CmsNavBack from "../../Nav/Back/CmsNavBack";
import React from 'react';

const CmsEditNavBar = () => {
  return (
    <div className={`CmsEditNavBarOuter`}>
      <div className={`CmsEditNavBar`}>
        <CmsNavBack/>
      </div>
    </div>
  );
}

export default CmsEditNavBar;
