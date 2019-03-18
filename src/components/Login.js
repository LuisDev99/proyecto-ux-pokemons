import {
    withStyles,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Grid,
    TextField,
    Button,
    FormControl
  } from "@material-ui/core";

import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component{


    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            users: [
                {userName: 'Ash Ketchum', userEmail: 'ash@pokemon.com', password: 'pokedex'},
                {userName: 'Misty', userEmail: 'misty@pokemon.com', password: 'paleta'}
        ]};

    }

    login = () => {
        if( (this.state.users[0].userEmail === this.state.email && this.state.users[0].password === this.state.password 
            || this.state.users[1].userEmail === this.state.email && this.state.users[1].password === this.state.password )){
                console.log("Success");

                let newurl = '/Pokemons';
                this.props.history.push(newurl);
            }
    }

    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render(){
        return(
            <div>
                <TextField label = "Email" value = {this.state.email} onChange = {this.emailChange}>Email</TextField> <br></br> <br></br>
                <TextField type = "password" label = "Password" value = {this.state.password} onChange= {this.passwordChange}>Password</TextField> <br></br> <br></br>
                <Button onClick={this.login}>Login</Button>
            </div>
        );
    }
}

export default withRouter(Login);