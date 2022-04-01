import './CmsNavBack.css';
import React, {useCallback} from "react";
import back_arrow from "../../Images/back_arrow.svg";
import {Icon} from "react-basic-icon";
import {useHistory} from "react-router-dom";

const CmsNavBack = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className={'CmsNavBack'} onClick={onClick}>
      <Icon className={'CmsNavBackIcon'} src={back_arrow}/>
    </div>
  );
}

export default CmsNavBack;
