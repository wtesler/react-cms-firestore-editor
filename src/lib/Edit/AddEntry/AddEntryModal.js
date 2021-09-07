import './AddEntryModal.css';
import {BasicInput} from 'react-forms-input';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {withModule} from 'react-hoc-di';

const AddEntryModal = props => {
  const {data, onSubmit, module, restartName} = props;
  const {dialogRelay} = module;

  const [isSingle, setIsSingle] = useState(!restartName);
  const [isValue, setIsValue] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const nameRef = useRef('');
  const keysRef = useRef('');

  const onTitleChange = useCallback(newValue => {
    nameRef.current = newValue;
    setErrorMessage(null);
  }, []);

  const onKeysChange = useCallback(newValue => {
    keysRef.current = newValue;
    setErrorMessage(null);
  }, []);

  const onSingleOrListClick = useCallback((isSingle) => {
    setIsSingle(isSingle);
    setErrorMessage(null);
  }, []);

  const onValueOrObjectClick = useCallback((isValue) => {
    setIsValue(isValue);
    setErrorMessage(null);
  }, []);

  const onCancelClick = useCallback(() => {
    dialogRelay.show(null);
  }, [dialogRelay]);

  const onOkClick = useCallback(() => {
    const name = nameRef.current || restartName;
    let keys = keysRef.current;
    if (!name) {
      setErrorMessage('Name cannot be empty.');
      return;
    }
    if (!isValue && !keys) {
      setErrorMessage('Object must have keys.');
      return;
    }
    if (name in data && Boolean(data[name]) && !restartName) {
      setErrorMessage('Name already in section.');
      return;
    }

    if (!isValue) {
      keys = keys.split(',').map(key => key.trim()).filter(key => key);
    }

    let entry = {};
    if (isValue) {
      entry['_'] = '';
    } else {
      for (const key of keys) {
        entry[key] = '';
      }
    }

    if (!isSingle) {
      entry = [entry];
    }

    data[name] = entry;
    onSubmit(name);
    dialogRelay.show(null);
  }, [isSingle, isValue, data, onSubmit, dialogRelay, restartName]);

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

  const createToggle = useCallback((leftText, rightText, onClick, isLeftToggled) => {
    return (
      <div className='AddEntryToggleOuter'>
        <div
          className={`AddEntryToggleItem AddEntrySingle ${isLeftToggled ? 'AddEntryToggleSelected' : ''}`}
          onClick={() => onClick(true)}>
          {leftText}
        </div>
        <div
          className={`AddEntryToggleItem AddEntryList ${isLeftToggled ? '' : 'AddEntryToggleSelected'}`}
          onClick={() => onClick(false)}>
          {rightText}
        </div>
      </div>
    )
  }, []);

  const keysInput = useMemo(() => {
    if (isValue) {
      return null;
    }
    return (
      <div className='AddEntryKeysInputOuter'>
        <BasicInput
          title={'keys'}
          titleClass={'AddEntryInputTitle'}
          initialValue={''}
          placeholder={'Comma-separated keys'}
          onChange={onKeysChange}
          mapFunc={inputMapFunc}
          maxChars={256}
        />
      </div>
    )
  }, [isValue, onKeysChange, inputMapFunc]);

  const errorElement = useMemo(() => {
    if (!errorMessage) {
      return null;
    }
    return (
      <div className={'AddEntryErrorMessage'}>
        {errorMessage}
      </div>
    )
  }, [errorMessage]);

  const addEntryHeader = useMemo(() => {
    if (restartName) {
      return null;
    }
    return (
      <div className='ThemeHeader'>
        {`Add Item`}
      </div>
    )
  }, [restartName]);

  const nameInputElement = useMemo(() => {
    if (restartName) {
      return null;
    }
    return (
      <div className='AddEntryNameInputOuter'>
        <BasicInput
          title={'name'}
          titleClass={'AddEntryInputTitle'}
          initialValue={''}
          onChange={onTitleChange}
          mapFunc={inputMapFunc}
          maxChars={32}
        />
      </div>
    )
  }, [restartName, onTitleChange, inputMapFunc]);

  const singleOrListToggle = useMemo(() => {
    if (restartName) {
      return null;
    }
    return createToggle('Single', 'List', onSingleOrListClick, isSingle)
  }, [restartName, onSingleOrListClick, isSingle, createToggle]);

  return (
    <div className='AddEntryModal'>
      {addEntryHeader}
      {nameInputElement}
      {singleOrListToggle}
      {createToggle('Value', 'Object', onValueOrObjectClick, isValue)}
      {keysInput}
      <div className='AddEntryButtonRow'>
        <div className={'AddEntryButton AddEntryButtonCancel'} onClick={onCancelClick}>
          {`Cancel`}
        </div>
        <div className={'AddEntryButton AddEntryButtonOk'} onClick={onOkClick}>
          {`OK`}
        </div>
      </div>
      {errorElement}
    </div>
  );
}

export default withModule(AddEntryModal);
