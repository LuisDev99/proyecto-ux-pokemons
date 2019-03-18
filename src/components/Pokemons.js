import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Pokedex from './Pokedex';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ListPokemon from './ListPokemon';
import { TextField } from '@material-ui/core';
import SearchResults from 'react-filter-search';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const mapStateToProps = state => ({
    rpokemons: state.pokemons
});
  
const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
    rsearchPokemon: name => dispatch(ACTIONS.searchPokemon(name))
});

class Pokemons extends React.Component {
  state = {
    open: false,
    pokemons: [],
    keyword: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  searching = (event) => {
        this.setState({
            keyword: event.target.value
        });
        
    };

  render() {
    const { classes } = this.props;

    const PokemonList = (item, index) => {
        return(
            <div key={index}>
                <li key = {index}>{item.name}
                </li>
                <img src={item.img}></img>
            </div>
        );
    }

    /*  <ul>{this.props.rpokemons.map(PokemonList)}</ul> */

    return (
      <div>
        
        <TextField label="Search by Name Filter" value = {this.state.keyword} onChange = {this.searching}>Search In Me</TextField>
        
        <SearchResults
          value={this.state.keyword}
          data={this.props.rpokemons}
          renderResults={results => (
            <ListPokemon pokemones = {results}></ListPokemon>
          )}
        />

        <br></br>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Create A Pokemon (using redux)
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>

          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Creation of a Pokemon
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Close 
              </Button>
            </Toolbar>
          </AppBar>

        
          <Pokedex clicky = {this.handleClose.bind(this)}></Pokedex>

        </Dialog>
      </div>
    );
  }
}

Pokemons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Pokemons)));

