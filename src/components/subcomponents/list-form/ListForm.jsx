import React, { useState } from  'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Form from 'react-bootstrap/Form'
import AddIcon from '@material-ui/icons/Add'

import ModalForm from '../../subcomponents/modal-form/ModalForm'
import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'
import Divider from '../../subcomponents/divider/Divider'
import RadioButton from '../../subcomponents/radio-button/RadioButton'
import LocalUpdateHandler from '../update-handler/LocalUpdateHandler'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Roles from '../../../constants/Roles'

import './ListForm.css'

const ListForm = (props) => {
  const {
    role,
    values,
    valuesIndex,
    moreInfoIndexes,
    moreInfoNames,
    header,
    noValuesText,
    addValueHeader,
    valuesCountForSearchVisibility = 7,
    links,
    innerModal,
    innerModalDisabled,
    isListLoading,
    withoutAdd,
    withoutEdit,
    withoutDelete,
    openInnerModal,
    openMoreInfoModal,
    setInitialValues,
    deleteValue,
    deleteAllValues,
    setValuesForMoreInfo,
    renderAddForm,
    renderEditForm,
    onCloseAddModal,
    onCloseEditModal,
    onSubmitNewValues,
    onSubmitEditedValues,
  } = props;

  const deviceType = useDevice();
  
  const [searchedValue, setSearchedValue] = useState('');
  const [moreInfo, setMoreInfo] = useState({});
  const [valueForMoreModal, setValueForMoreModal] = useState({});

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);

  const [shouldModalBeClosedAfterAdd, setShouldModalBeClosedAfterAdd] = useState(true);

  const compare = (a, b, index) => {
    const firstItem  = a[index].toString().toUpperCase();
    const secondItem = b[index].toString().toUpperCase();

    if (index === 'number') {

      return firstItem - secondItem
    } else {

      let comparison = 0;
  
      if (firstItem > secondItem) {
        comparison = 1;
      } else if (firstItem < secondItem) {
        comparison = -1;
      }
  
      return comparison;
    }
  }

  const sortedValues = values.sort((a, b) => compare(a, b, valuesIndex));
  
  const toggleAddModal = () => {

    setIsAddModalVisible(!isAddModalVisible)
    
    isAddModalVisible === true
    &&
      onCloseAddModal && onCloseAddModal()
  }

  const handleOpenEditModal = (values) => {

    setIsEditModalVisible(true)
    setInitialValues && setInitialValues(values)
  }

  const handleCloseEditModal = () => {

    setIsEditModalVisible(false)
    onCloseEditModal && onCloseEditModal()
  }

  const handleOpenMoreModal = (value, moreInfoIndexes, moreInfoNames) => {

    setValueForMoreModal(value)
    setMoreInfo({
      moreInfoIndexes,
      moreInfoNames,
    })
    setIsMoreModalVisible(true)
  }

  const handleCloseMoreModal = () => {

    setIsMoreModalVisible(false)
    setMoreInfo({})
  }

  const handleDeleteAllValues = () => {

    deleteAllValues()
  }

  const handleDeleteValue = (data) => {

    deleteValue(data)
  }

  const handleSearchedValueChange = (event) => {

    setSearchedValue(event.target.value)
  }

  const handleClickItemButton = (id) => {
    
    openInnerModal(id)
  }

  const handleClickMoreInfoBtn = (values) => {

    openMoreInfoModal(values)
  }

  const handleOpenDeleteAllModal = () => {

    setIsModalDeleteVisible(true)
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false)
  }

  const handleSetValuesForMoreInfo = (values) => {

    setValuesForMoreInfo(values)
  }

  const handleNewValuesSubmit = (event) => {
    event.preventDefault()

    onSubmitNewValues()
    shouldModalBeClosedAfterAdd && setIsAddModalVisible(false)
  }

  const handleEditedValuesSubmit = (event) => {
    event.preventDefault()

    setIsEditModalVisible(false)
    onSubmitEditedValues()
  }

  const handleChangeShouldModalBeClosedAfterAdd = () => {

    setShouldModalBeClosedAfterAdd(!shouldModalBeClosedAfterAdd)
  }

  const outputListItems = (data, index) => {

    if (innerModal && !innerModalDisabled) {

      return (
        <button
          className='b-list-form__item-open-modal-btn b-list-form__list-item-text'
          onClick={() => handleClickItemButton(index)}
        >
          {data}
        </button>
      )
    } else if (links) {

      return (
        <Link
          className='b-list-form__item-link b-list-form__list-item-text'
          to='/intercom-screen'
        >
          {data}
        </Link>
      )
    } else if ((!innerModal && !links) || innerModalDisabled) {

      return (
        <span className='b-list-form__item-span b-list-form__list-item-text'>
          {data}
        </span>
      )
    }
  }

  const convertMoreInfoValue = (value) => {
    
    if (value === true) {
      return 'Да'
    } else if (value === false) {
      return 'Нет'
    } else if (value === '') {
      return '-'
    } else {
      return value
    }
  } 
  
  return (
    <>
      <div className='b-list-form'>
        {
          header && deviceType !== DeviceTypes.DESKTOP
          &&
            <>
              <h1 className='b-list-form__header'>
                {header}
              </h1>
              <Divider />
            </>
        }
        <div className='b-list-form__buttons'>
          {
            renderAddForm && !withoutAdd
            &&
              <button 
                className='b-button b-list-form__add-btn'
                onClick={toggleAddModal}
              >
                {
                  deviceType === DeviceTypes.DESKTOP
                  ?
                    'Добавить'
                  :
                    <AddIcon />
                }
              </button>
          }
          {
            deleteAllValues && values && values.length !== 0
            &&
              <button 
                className='b-button b-button--delete b-list-form__delete-all-btn'
                onClick={handleOpenDeleteAllModal}
              >
                Удалить все
              </button>
          }
        </div>
        {
          !isListLoading
          ?
            <>
              {
                values && values.length > valuesCountForSearchVisibility
                &&      
                  <InputGroup className='b-list-form__search-input-group'>
                    <FormControl
                      placeholder="Поиск"
                      aria-label="Поиск"
                      aria-describedby="basic-addon2"
                      className='b-list-form__search-input'
                      value={searchedValue}
                      onChange={handleSearchedValueChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <SearchIcon />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>   
              }  
              {
                values && values.length !== 0
                ?
                  <div className='b-list-form__list'>
                    {
                      sortedValues.map((value, index) => {
                        
                        if (
                          searchedValue === '' || 
                          (
                            searchedValue 
                            && 
                              value[valuesIndex] && value[valuesIndex].toString().includes(searchedValue)
                          )
                        ) {
                          return (
                            <div 
                              className={
                                value[valuesIndex] === 'admin'
                                ?
                                  'b-list-form__item b-list-form__item-admin'
                                :
                                  'b-list-form__item'  
                              }
                              key={index}
                            >
                              {outputListItems(value.data || value[valuesIndex], value.id || index)}
                              <div className='b-list-form__item-buttons'>
                                {
                                  moreInfoIndexes && moreInfoNames && !setValuesForMoreInfo
                                  &&
                                    <button
                                      className='b-button b-list-form__more-btn'
                                      onClick={() => handleOpenMoreModal(value, moreInfoIndexes, moreInfoNames)}
                                    >
                                      <MoreHorizIcon />
                                    </button>
                                }
                                {
                                  setValuesForMoreInfo
                                  &&
                                    <button
                                      className='b-button b-list-form__more-btn'
                                      onClick={() => handleSetValuesForMoreInfo(value)}
                                    >
                                      <MoreHorizIcon />
                                    </button>
                                }
                                {
                                  openMoreInfoModal && (!moreInfoIndexes && !moreInfoNames)
                                  &&
                                    <button
                                      className='b-button b-list-form__more-btn'
                                      onClick={() => handleClickMoreInfoBtn(value)}
                                    >
                                      <MoreHorizIcon />
                                    </button>
                                }
                                {
                                  renderEditForm && !withoutEdit
                                  &&
                                    <button 
                                      className='b-button b-list-form__edit-btn'
                                      onClick={() => handleOpenEditModal(value)}
                                    >
                                      <CreateIcon />
                                    </button>
                                }
                                {
                                  deleteValue && !withoutDelete
                                  &&
                                    <button 
                                      className='b-button b-list-form__delete-btn'
                                      onClick={() => handleDeleteValue(value.id || value.data)}
                                    >
                                      <DeleteForeverIcon />
                                    </button>
                                }
                              </div>
                            </div>
                          )
                        } else {
                          return null
                        }
                      })
                    }
                  </div>
                :
                  <div className='b-list-form__no-values'>
                    {noValuesText}
                  </div>
              }        
            </>
          :
            <LocalUpdateHandler />
        }
      </div>
      {
        isAddModalVisible
        &&
          <ModalForm
            title={addValueHeader}
            handleCloseModal={toggleAddModal}
          >   
            {
              role !== Roles.TENANT
              &&
                <RadioButton 
                  label='Закрыть окно после добавления'
                  className='b-list-form__close-modal-radio'
                  value={shouldModalBeClosedAfterAdd}
                  onChange={handleChangeShouldModalBeClosedAfterAdd}
                />     
            }   
            <Form onSubmit={handleNewValuesSubmit}>   
              {renderAddForm()}
            </Form>
          </ModalForm>
      }
      {
        isEditModalVisible
        &&
          <ModalForm
            title='Обновление данных'
            handleCloseModal={handleCloseEditModal}
          >     
            <Form onSubmit={handleEditedValuesSubmit}>       
              {renderEditForm()}
            </Form>
          </ModalForm>
      }
      {
        isModalDeleteVisible
        &&
          <ModalDelete
            show={isModalDeleteVisible}
            handleCloseModal={handleCloseModalDelete}
            handleDeleteAll={handleDeleteAllValues}
          />
      }
      {
        isMoreModalVisible
        &&
          <ModalForm 
            handleCloseModal={handleCloseMoreModal}
            withoutHeader
          >          
            <div className='b-list-form__more-data'>
              {
                moreInfo.moreInfoNames.map((moreInfoName, index) => 
                  <p key={index}>
                    <span>{moreInfoName}</span>
                    <span>{convertMoreInfoValue(valueForMoreModal[moreInfoIndexes[index]])}</span>
                  </p>
                )
              }
            </div>
          </ModalForm>
      }
    </>
  )
}

export default ListForm
