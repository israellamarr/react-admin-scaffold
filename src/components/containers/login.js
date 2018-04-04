// @flow

import * as React from "react";
import { Redirect }                  from 'react-router-dom';
import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';
import Grid                         from 'material-ui/Grid';
import Card, { CardHeader, CardContent }        from 'material-ui/Card';
import { FormControl }              from 'material-ui/Form';
import Button                       from 'material-ui/Button';
import TextField                    from 'material-ui/TextField';

import type { StatusMessage } from 'app/types';

export type Props = {
  userAuthorized: boolean,
  statusMessage: StatusMessage,
  AppLastResponse: typeof Creators.AppLastResponse,
  AppLogin: typeof Creators.AppLogin
}

export type State = {
  username: string,
  password: string
}

class Login extends React.Component<Props, State> {

  constructor ( ) {
    super();
  }

  submit = () => {
    if ( this.state.username === "abc" && this.state.password === "123" ) {
      this.props.AppLogin( this.state.username, this.state.password );
    } else {
      this.props.AppLastResponse( { success: false, response: 'login failed.' } );
    }
  };

  render () {

    if (this.props.userAuthorized) {
      return (
        <Redirect to={ '/products/all' } />
      );
    }

    return (
      <Grid container spacing={ 16 } alignItems={ 'center' } justify={ 'center' }>
        <Grid item>
          <Card>
            <CardHeader title={ 'Login' } subheader={ 'u: abc — p: 123' } />
            <CardContent>
              <FormControl fullWidth>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Name"
                  fullWidth
                  onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ username: e.target.value  }) }/>
              </FormControl>
              <FormControl fullWidth className={ 'mb-4' }>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  fullWidth
                  onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ password: e.target.value }) }/>
              </FormControl>
              <FormControl fullWidth>
                <Button variant="raised" color="primary" onClick={ () => this.submit() }>Sign In</Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    userAuthorized: state.app.userAuthorized,
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Login );