import './AddSectionModal.css';
import {BasicInput} from "react-forms-input";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {withModule} from "react-hoc-di";

const AddSectionModal = props => {
  const {onSubmit, module} = props;
  const {dialogRelay} = module;

  const [errorMessage, setErrorMessage] = useState(null);

  const nameRef = useRef('');

  const onTitleChange = useCallback(newValue => {
    nameRef.current = newValue;
    setErrorMessage(null);
  }, []);

  const onCancelClick = useCallback(() => {
    dialogRelay.show(null);
  }, [dialogRelay]);

  const onOkClick = useCallback(() => {
    const name = nameRef.current;
    if (!name) {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    dialogRelay.show(null);
    onSubmit(name);
  }, [dialogRelay, onSubmit]);

  const inputMapFunc = useCallback((value) => {
    if (!value) {
      return value;
    }
    value = value.replace(' ', '');
    // Not allowed to start with '_'
    const splitVal = value.split('');
    for (let i = 0; i < splitVal.length; i++) {
      if (splitVal[i] === '_') {
        splitVal[i] = '';
      } else {
        break;
      }
    }
    value = splitVal.join('');
    return value;
  }, []);

  const errorElement = useMemo(() => {
    if (!errorMessage) {
      return null;
    }
    return (
      <div className={'AddSectionErrorMessage'}>
        {errorMessage}
      </div>
    )
  }, [errorMessage]);

  return (
    <div className='AddSectionModal'>
      <div className='ThemeHeader'>
        {`Add Section`}
      </div>
      <div className='AddSectionNameInputOuter'>
        <BasicInput
          title={'name'}
          titleClass={'AddSectionNameInputTitle'}
          initialValue={''}
          onChange={onTitleChange}
          mapFunc={inputMapFunc}
          maxChars={32}
        />
      </div>
      <div className='AddSectionButtonRow'>
        <div className={'AddSectionButton AddSectionButtonCancel'} onClick={onCancelClick}>
          {`Cancel`}
        </div>
        <div className={'AddSectionButton AddSectionButtonOk'} onClick={onOkClick}>
          {`OK`}
        </div>
      </div>
      {errorElement}
    </div>
  );
}

export default withModule(AddSectionModal);
