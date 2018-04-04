// @flow

import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import type { RadioListData } from '../radio-list';

export type Props = {
  data: Array<RadioListData>,
  value?: string,
  className?: string,
  defaultLabel?: string,
  onChange?: ( event: SyntheticInputEvent<HTMLInputElement> ) => void
};


export default class SelectList extends React.Component<Props> {
  renderOptions () {
    return this.props.data.map( ( data ) =>
      <option key={ data.title } value={ data.set }>{ data.title }</option>
    );
  }

  renderDefaultOption () {
    if ( this.props.defaultLabel ) {
      return <option key="default">{ this.props.defaultLabel }</option>;
    }
  }

  render () {
    let className;
    let onChange;

    if ( this.props.className ) {
      className = this.props.className;
    }

    if ( this.props.onChange ) {
      onChange = this.props.onChange;
    }

    const classes = classNames(
      'form-control',
      className
    );

    return (
      <div className={ 'ui-control' }>
        <SelectContainer value={ this.props.value }
          className={ classes }
          onChange={ onChange }>
          { this.renderDefaultOption() }
          { this.renderOptions() }
        </SelectContainer>
      </div>
    );
  }
}

const SelectContainer = styled.select`
  .ui-control {
    text-align: left;
    position: relative;
    margin-bottom: 22px;
  }

  select {
    border: 1px solid ${ props => props.theme.input.borderColor };
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    font-size: 16px;
    border-radius: 2px;
    height: 36px;
    line-height: 1.35;
    transition: border 200ms cubic-bezier(0.19, 1, 0.22, 1);
    padding-bottom: 0;
    padding-top: 0;
  }

  .ui-control.error {
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      border-color: ${ props => props.theme.input.errorColor };
    }

    label {
      color: ${ props => props.theme.input.errorLabelColor };
    }
  }
`;
