// @flow

import { hot } from 'react-hot-loader';
import React from 'react';
import TextMask from 'react-text-mask';
import classNames from 'classnames';
import styled from 'styled-components';


export type PropsTextInput = {
  label?: string,
  className?: string,
  error?: string,
  mask?: Function | Array<RegExp | string>,
  type?: string,
  price?: boolean,
  keepCharPositions?: boolean,
  onChange: ( e: SyntheticInputEvent<HTMLInputElement> ) => void,
  value?: string
};

export type State = {
  focused: boolean,
  active: boolean
};

class TextInputNew extends React.Component<PropsTextInput, State> {
  constructor ( props: PropsTextInput ) {
    super( props );

    this.state = {
      focused: false,
      active: false
    };
  }

  componentWillMount () {
    if ( this.props.value && this.props.value.length >= 1 ) {
      this.setState({ active: true });
    }
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  onChange = ( e ) => {
    if ( this.props.onChange ) {
      this.props.onChange( e );
    }

    if ( e.target.value.length >= 1 ) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  renderLabel () {
    if ( this.props.error && this.props.error.length > 0 ) {
      return this.props.error[0];
    }

    if ( this.props.label ) {
      return this.props.label;
    }
  }


  renderComponent () {
    const { error, price, ...rest } = this.props;

    const classes = classNames(
      'text-input',
      'form-control',
      { 'is-invalid': !!error },
      { 'price': price }
    );

    const ui_classes = classNames(
      'ui-control',
      {
        'active': this.state.focused || this.state.active,
        'error': !!error
      }
    );

    if ( this.props.mask ) {
      return (
        <div className={ ui_classes }>
          <TextMask { ...rest }
                    type={ this.props.type ? this.props.type: 'text' }
                    className={ classes }
                    mask={ this.props.mask }
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                    onBlur={ this.onBlur }/>
          <label>{ this.props.label }</label>
        </div>
      );
    }

    return (
      <div className={ ui_classes }>
        <input { ...rest }
              type={ this.props.type ? this.props.type: 'text' }
              className={ classes }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onBlur={ this.onBlur }/>
        <label>{ this.renderLabel() }</label>
      </div>
    );
  }

  render () {
    return (
      <TextInputContainer>

        { this.renderComponent() }

      </TextInputContainer>
    );
  }
}

const TextInputContainer = styled.div`
  .ui-control {
    text-align: left;
    position: relative;
    margin-bottom: 22px;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"] {
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

    &:focus,
    &:hover {
      border-color: ${ props => props.theme.input.hoverBorderColor };
      outline: none;
      + label {
        cursor: text;
      }
    }
  }

  label {
    color: ${ props => props.theme.input.placeholderColor };
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition:
      color 200ms cubic-bezier(0.19, 1, 0.22, 1),
      top 100ms cubic-bezier(0.19, 1, 0.22, 1),
      background-color 200ms cubic-bezier(0.19, 1, 0.22, 1),
      transform 100ms cubic-bezier(0.19, 1, 0.22, 1),
      font-size 200ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .ui-control.active {
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      padding-top: 0;
    }

    label {
      color: ${ props => props.theme.input.labelActiveColor };
      opacity: 0.8;
      top: 0%;
      transform: translateY(-100%);
      font-size: 11px;
    }
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

export default hot(module)(TextInputNew);
