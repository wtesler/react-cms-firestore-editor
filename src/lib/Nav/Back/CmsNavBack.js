import './CmsNavBack.css';
import React, {useCallback} from "react";
import back_arrow from "../../Images/back_arrow.svg";
import {Icon} from "react-basic-icon";
import {useNavigate} from "react-router-dom";

const CmsNavBack = () => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={'CmsNavBack'} onClick={onClick}>
      <Icon className={'CmsNavBackIcon'} src={back_arrow}/>
    </div>
  );
}

export default CmsNavBack;
