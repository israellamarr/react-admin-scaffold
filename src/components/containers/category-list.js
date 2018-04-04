// @flow

import * as React from "react";

import { Creators } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import styled                 from 'styled-components';
import Button                 from 'material-ui/Button';
import TextField              from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import MdAdd                  from 'react-icons/lib/md/add';

import type { StatusMessage } from 'app/types/index';
import CategoryCard           from 'app/components/UI/category-card';
import FloatButtonContainer   from 'app/components/UI/layout/float-button-container';

import { staticCategories }   from 'app/config/constants';
import { breakPoints }        from 'app/themes';

export type Props = {
  statusMessage: StatusMessage,
  loading: boolean,
  AppLastResponse: typeof Creators.AppLastResponse
}

export type State = {
  dialogOpen: boolean;
}

class CategoryList extends React.Component<Props, State> {

  constructor ( props ) {
    super( props );

    this.state = {
      dialogOpen: false
    };
  }

  renderCategories () {
    if ( staticCategories.length > 0 ) {
      return (
        <ListContainer id={ 'product-list' }>
          { staticCategories.map( ( category, index ) => (
            ( <CategoryCard key={ index } category={ category }/> )
          ) )
          }
        </ListContainer>
      );
    } else {
      return (
        <HelpText key="0" >No products found</HelpText>
      );
    }
  }

  dialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  dialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render () {
    return (
      <Container>
        <ContentContainer>
          { this.renderCategories() }
        </ContentContainer>

        <FloatButtonContainer>
          <Button variant="fab" color="primary" aria-label="add" onClick={ () => this.dialogOpen() }>
            <MdAdd size={ 24 } />
          </Button>
        </FloatButtonContainer>


        <Dialog
          open={ this.state.dialogOpen }
          onClose={ () => this.dialogClose() }
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="category_name" label="Name" fullWidth />
            <TextField multiline rows="4" margin="dense" id="description" label="Description" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.dialogClose() } color="primary">Cancel</Button>
            <Button onClick={ () => this.dialogClose() } color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: auto;
`;

const ContentContainer= styled.div`
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  margin: auto;
  margin-left: -10px;
  margin-right: -10px;
  
  & > .card-container {
    flex: 1 1 50%;
    padding: 10px;
  }
  
  @media (min-width: ${ breakPoints.lg }) {
    & > .card-container {
      flex: 1 1 33.33%;
    }
  }
`;

const HelpText = styled.div`
  text-align: center;
  font-size: ${ props => props.theme.type.lg.h3 };  
  padding-top: 32px;
`;

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) => bindActionCreators( Creators, dispatch);

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( CategoryList ) );