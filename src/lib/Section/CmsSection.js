import './CmsSection.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {BasicInput} from "react-forms-input";
import {withModule} from "react-hoc-di";
import removeImage from "../Images/remove.svg";
import plusImage from "../Images/plus.svg";
import AddEntryModal from "../Edit/AddEntry/AddEntryModal";
import {DELETING, FAILED_DELETE_SECTION} from "../Constants/i18n";
import {useNavigate} from "react-router-dom";
import {CmsClient} from "react-cms-firestore";
import {Icon} from "react-basic-icon";

const CmsSection = props => {
  const {cmsKey, data, module, requests} = props;
  const {toastRelay, dialogRelay} = module;

  const navigate = useNavigate();

  const [dirtyFlag, setDirtyFlag] = useState(Number.MIN_SAFE_INTEGER);

  // Mechanism to scroll to the new entry after it is added.
  const [pendingScrollKey, setPendingScrollKey] = useState(null);

  const pendingScrollRef = useRef(null);

  // Scrolls to the entry as it is added.
  // eslint-disable-next-line
  useEffect(() => {
    if (pendingScrollKey && pendingScrollRef.current) {
      const posY = pendingScrollRef.current.offsetTop - 120;
      window.scrollTo({top: posY, behavior: 'smooth'});
      pendingScrollRef.current = null;
      setPendingScrollKey(null);
    }
  });

  const onValueChange = useCallback((key, itemIndex, itemKey, newValue) => {
    const val = data[key];
    let item = val;
    if (Array.isArray(val)) {
      item = val[itemIndex];
    }
    item[itemKey] = newValue;
  }, [data]);

  const onEntryAddSubmit = useCallback(key => {
    setPendingScrollKey(key);
    setDirtyFlag(dirtyFlag + 1);
  }, [dirtyFlag]);

  const onEntryAddClick = useCallback(() => {
    dialogRelay.show(
      <AddEntryModal data={data} onSubmit={onEntryAddSubmit}/>,
      true,
      null
    );
  }, [data, dialogRelay, onEntryAddSubmit]);

  const onEntryRemoveClick = useCallback((key) => {
    const shouldDelete = window.confirm(`Are you sure you want to remove the ${key} entry?`);
    if (shouldDelete) {
      data[key] = null;
      setDirtyFlag(dirtyFlag + 1);
    }
  }, [data, dirtyFlag]);

  const onItemRemoveClick = useCallback((key, itemIndex) => {
    data[key].splice(itemIndex, 1);
    setDirtyFlag(dirtyFlag + 1);
  }, [data, dirtyFlag]);

  const onItemAddClick = useCallback((key) => {
    const entry = data[key];
    if (entry.length > 0) {
      const firstItem = entry[0];
      const newItem = JSON.parse(JSON.stringify(firstItem));
      for (const key of Object.keys(newItem)) {
        newItem[key] = '';
      }
      entry.push(newItem);
      setDirtyFlag(dirtyFlag + 1);
    } else {
      dialogRelay.show(
        <AddEntryModal restartName={key} data={data} onSubmit={onEntryAddSubmit}/>,
        true,
        null
      );
    }
  }, [data, dirtyFlag, onEntryAddSubmit, dialogRelay]);

  const onDeleteSelfClick = useCallback(async () => {
    try {
      const shouldDelete = window.confirm(`Are you sure you want to delete the entire ${cmsKey} section?`);
      if (shouldDelete) {
        toastRelay.show(DELETING, true);
        await CmsClient.deleteCmsSection(cmsKey, requests);
        toastRelay.show(null);
        navigate(-1);
      }
    } catch (e) {
      console.error(e);
      toastRelay.show(FAILED_DELETE_SECTION, false, 5000);
    }
  }, [toastRelay, requests, cmsKey, navigate]);

  const items = useMemo(() => {
    const elements = [];

    const keys = Object.keys(data).sort();
    for (const key of keys) {
      let value = data[key];
      if (value === null || value === undefined) {
        continue;
      }
      const isArray = Array.isArray(value);
      if (!isArray) {
        value = [value];
      }

      const itemElements = [];
      let j = 0;
      for (const item of value) {
        const itemIndex = j;
        const itemKeys = Object.keys(item).sort();
        const parts = [];
        for (const itemKey of itemKeys) {
          const itemValue = item[itemKey];
          parts.push(
            <div className={'CmsSectionItemPart'} key={`${key} Part ${itemKey}`}>
              <BasicInput
                title={itemKey === '_' ? '' : itemKey}
                initialValue={itemValue}
                onChange={newValue => onValueChange(key, itemIndex, itemKey, newValue)}
                titleClass={'CmsSectionItemPartInputTitle'}
                textClass={'CmsSectionItemPartInputText'}
              />
            </div>
          )
        }
        if (isArray) {
          parts.push(
            <div className={'CmsSectionItemRemove'}
                 key={`${key} __Remove__`}
                 onClick={() => onItemRemoveClick(key, itemIndex)}
            >
              <Icon className={'CmsSectionItemRemoveIcon'} src={removeImage}/>
            </div>
          )
        }
        itemElements.push(
          <div className={'CmsSectionItem'} key={`${key} Item ${j}`}>
            {parts}
          </div>
        )
        j++;
      }

      let addElement = null;
      if (isArray) {
        addElement = (
          <div className={'CmsSectionItemAdd'} onClick={() => onItemAddClick(key)}>
            <div className={'CmsSectionItemAddPrompt'}>
              {'Add Item'}
            </div>
            <Icon className={'CmsSectionItemAddIcon'} src={plusImage}/>
          </div>
        )
      }

      let removeElement = (
        <div className={'CmsSectionEntryRemove'} onClick={() => onEntryRemoveClick(key)}>
          <Icon className={'CmsSectionEntryRemoveIcon'} src={removeImage}/>
        </div>
      );

      elements.push((
        <div className='CmsSectionEntry' key={key} ref={key === pendingScrollKey ? pendingScrollRef : null}>
          <div className='CmsSectionEntryHeader'>
            <div className='CmsSectionEntryHeaderTitle'>
              {key}
            </div>
            {removeElement}
          </div>
          {itemElements}
          {addElement}
        </div>
      ));
    }
    return elements;

    // eslint-disable-next-line
  }, [data, dirtyFlag, onValueChange, onItemRemoveClick, onItemAddClick, pendingScrollKey]);

  const deleteSectionElement = useMemo(() => {
    return (
      <div className={'CmsSectionDeleteSelf'} onClick={onDeleteSelfClick}>
        <div className={'CmsSectionDeleteSelfText'}>
          {`Delete Whole ${cmsKey} Section`}
        </div>
      </div>
    )
  }, [onDeleteSelfClick, cmsKey]);

  return (
    <div className='CmsSection' key={cmsKey}>
      <div className='CmsSectionHeaderOuter'>
        <div className={'CmsSectionHeader'}>
          {cmsKey}
        </div>
        <div className={'CmsSectionEntryAdd'} onClick={onEntryAddClick}>
          <Icon className={'CmsSectionEntryAddIcon'} src={plusImage}/>
        </div>
      </div>
      {items}
      {deleteSectionElement}
    </div>
  );
}

export default withModule(CmsSection);
