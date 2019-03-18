import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import StepButton from '@material-ui/core/StepButton';
import { TextField } from '@material-ui/core';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListPokemon from './ListPokemon'


const mapStateToProps = state => ({
    rpokemonTypes: state.pokemonTypes,
    rstate: state.pokemons
});
  
const mapDispatchToProps = dispatch => ({
    addPokemon: pokemon => dispatch(ACTIONS.savePokemon(pokemon))
});


const styles = theme => ({
    root: {
      width: '90%',
    },

    centering: {
        width: '90%',
      margin: 'auto',
      width: '60%',
      border: '3px solid #73AD21',
      padding: '10px',
    },

    button: {
      marginRight: theme.spacing.unit,
    },
    completed: {
      display: 'inline-block',
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
  });
  
  function getSteps() {
    return ['Pokemon Info', 'Pokemon Description', 'Confirmation'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Step 1: Pokemon main info...';
      case 1:
        return 'Step 2: Pokemon description...';
      case 2:
        return 'Step 3: End';
      default:
        return 'Unknown step';
    }
  }

class Pokedex extends Component {

    constructor(props){
        super(props);

        this.state = {
            keyword: '',
            activeStep: 0,
            completed: {},
            iname: '',
            iimg: '',
            itypes1: 'Normal',
            itypes2: '',
            iheight: '',
            iweight: '',
            igender: '',
            icatchRate: '',
            pokemonTypes: [],
            labelWidth: ''
          };
    }
    
    
    
      totalSteps = () => getSteps().length;
    
      handleNext = () => {
        let activeStep;
    
        if (this.isLastStep() && !this.allStepsCompleted()) {
          // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          const steps = getSteps();
          activeStep = steps.findIndex((step, i) => !(i in this.state.completed));

          this.setState({
            activeStep,
          });

        } else {
          activeStep = this.state.activeStep + 1;
          this.setState({
            activeStep,
          });
        }
        
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
      handleStep = step => () => {
        this.setState({
          activeStep: step,
        });
      };
    
      handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
          completed,
        });
        this.handleNext();
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
          completed: {},
        });
      };

      changeName = (event) => {
        this.setState({
            iname: event.target.value
        });
      }

      changeImg = (event) => {
        this.setState({
            iimg: event.target.value
        });
      }

      changeType1 = (event) => {
          this.setState({
                itypes1: event.target.value
          })
      }

    changeType2 = (event) => {
        this.setState({
              itypes2: event.target.value
        })
    }

    changeHeight = (event) => {
        this.setState({
            iheight: event.target.value
        });
      }

      savePokemon = () => {
        let pokemon = {
        name: this.state.iname,
        img: this.state.iimg,
        types1: this.state.itypes1,
        types2: this.state.itypes2,
        height: this.state.iheight,
        weight: this.state.iweight,
        gender: this.state.igender,
        catchRate: this.state.icatchRate

        };
        this.props.addPokemon(pokemon);
        this.props.clicky();
        
      }

      changeWeight = (event) => {
        this.setState({
            iweight: event.target.value
        });
      }

      changeGender = (event) => {
        this.setState({
            igender: event.target.value
        });
      }

      changeRate = (event) => {
        this.setState({
            icatchRate: event.target.value
        });
      }

    
      getCorrespondingElements = () => {

        const { classes } = this.props;
        const MenuListItem = (item, index) => {
            return(<MenuItem value = {item} key = {index}>{item}</MenuItem>)
        }

          if(this.state.activeStep === 0){
              return (
                <div className={classes.centering}>
                    <br></br>
                    <TextField label = "Pokemon Name" onChange = {this.changeName} value = {this.state.iname}></TextField> <br></br>
                    <TextField label = "Pokemon Image URL" onChange = {this.changeImg} value = {this.state.iimg}></TextField> <br></br>
                    
                    <h5>Type 1: </h5>
                    <Select value={this.state.itypes1} onChange={this.changeType1}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.itypes1}
                                name="age"
                                id="outlined-age-simple"
                            />
                        } >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.props.rpokemonTypes.map(MenuListItem)}          
                    </Select>
                    
                    <h5>Type 2: </h5>
                    <Select value={this.state.itypes2} onChange={this.changeType2}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.itypes2}
                                name="age"
                                id="outlined-age-simple"
                            />
                        } >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.props.rpokemonTypes.map(MenuListItem)}          
                    </Select> <br></br>

                </div> );
          } else if(this.state.activeStep === 1) {
              return (
                <div className={classes.centering} >
                   <br></br>
                    <TextField label = "Pokemon Height" onChange = {this.changeHeight} value = {this.state.iheight}></TextField> <br></br>
                    <TextField label = "Pokemon Weight" onChange = {this.changeWeight} value = {this.state.iweight}></TextField> <br></br>
                    <TextField label = "Pokemon Gender" onChange = {this.changeGender} value = {this.state.igender}></TextField> <br></br>
                    <TextField label = "Pokemon Catch Rate" onChange = {this.changeRate} value = {this.state.icatchRate}></TextField> <br></br>
                </div>);
          } else {
            return (
                <div className={classes.centering} >
                     Pokemon Name: {this.state.iname} 
                     <br></br>

                     <img></img>

                    Pokemon Types: {this.state.itypes1} -- {this.state.itypes2}
                    <br></br>
                    Height: {this.state.iheight} Weight: {this.state.iweight}
                    <br></br>
                    Gender: {this.state.igender} Catch Rate: {this.state.icatchRate}


                </div>);
          }
      }
    
      completedSteps() {
        return Object.keys(this.state.completed).length;
      }
    
      isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
      }
    
      allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
      }
    
      render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const Componente = this.getCorrespondingElements;
        return (
          <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {this.allStepsCompleted() ? (
                <div className={classes.centering} >
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={this.handleReset} color="primary" >Reset</Button> <br></br>
                  <Button onClick={this.savePokemon} color="primary" >Save Pokemon</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>

                      <Componente></Componente>
                        <br></br>

                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (this.state.completed[this.state.activeStep] ? (
                        <Typography variant="caption" className={classes.completed}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Pokedex)));
