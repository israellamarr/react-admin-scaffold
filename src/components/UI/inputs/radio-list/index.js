// @flow

import React from 'react';
import classNames from 'classnames';

import { ListItemContainer } from '../styles/shared';

type RadioItemValue = string | number | boolean;

export type RadioListData = {
  title: string,
  field: string,
  value: RadioItemValue,
  other: boolean,
  subtitle?: string,
  text_field?: string,
  text?: string,
  has_text: boolean,
  label?: string,
  set?: string
};

export type PropsRadioGroupList = {
  onClick: ( Array<RadioListData> ) => void,
  data: Array<RadioListData>
};

export type PropsRadioItem = {
  data: RadioListData,
  onClick: ( field: string, value: RadioItemValue ) => void,
  updateData: ( field: string, value: string ) => void
};

export default class RadioGroupList extends React.Component<PropsRadioGroupList> {
  renderCheckboxItems () {
    return this.props.data.map( ( data ) =>
      <RadioItem
        key={ data.field }
        data={ data }
        updateData={ ( prop, text ) => {
          this.props.onClick( this.props.data.map( data => {
            if ( data.field === prop ) {
              return {
                ...data,
                text: text
              };
            }

            return data;
          } ) );
        } }
        onClick={ ( prop, value ) => {
          if ( !value ) {
            return;
          }

          this.props.onClick( this.props.data.map( data => {
            if ( data.field === prop ) {
              return {
                ...data,
                value: value
              };
            }

            return {
              ...data,
              value: !value
            };
          } ) );
        } }/>
    );
  }

  render () {
    return (
      <div className='radio-list'>
        { this.renderCheckboxItems() }
      </div>
    );
  }
}

class RadioItem extends React.Component<PropsRadioItem> {
  checkedValue () {
    const { set, value } = this.props.data;
    if ( !set ) {
      return value;
    } else {
      return ( value === set ) || false;
    }
  }

  renderTextInput () {
    if ( this.checkedValue() && this.props.data.has_text ) {
      return (
        <div className="radio-item__text subtitle">

          { this.props.data.label ? this.props.data.label : 'Please describe:' }

          <input autoFocus
            type='text'
            className='form-control other-text-input'
            value={ this.props.data.text }
            onChange={ event => this.props.updateData( this.props.data.field, event.target.value ) }/>
        </div>
      );
    }
  }

  render () {
    const { title, subtitle, field, value, set } = this.props.data;
    const checkedValue = this.checkedValue();
    const classes = classNames(
      'radio-item',
      {
        'checked': this.checkedValue()
      }
    );

    return (
      <ListItemContainer
        className={ classes }
        onClick={ () => this.props.onClick( field, set || !value ) }>
        <div className="row">
          <div className="col">
            <input
              type="radio"
              checked={ checkedValue }
              onChange={ () => this.props.onClick( field, set || !value ) }/>

            <div className='title'
              htmlFor={ field }>
              { title }
              {
                ( subtitle )
                ? <span className='subtitle'> { subtitle }</span>
                : null
              }
            </div>
          </div>
        </div>

        { this.renderTextInput() }
      </ListItemContainer>
    );
  }
}
