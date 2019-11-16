import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthActions from '~/store/ducks/auth';

import Button from '~/styles/components/Button'
import { Container, SignForm } from '../styles';

class SignIn extends Component{
    static propTypes = {
        signInRequest: PropTypes.func.isRequired,
    }
    state = {
        email: '',
        password: '',
    }
    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }
    handlesubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const { signInRequest } = this.props;

        //call action redux
        signInRequest(email, password);
    }
    render(){
        const { email, password } = this.state;
        return (
            <Container>
                <SignForm onSubmit={ this.handlesubmit }>
                    <h1>Boas Vindas</h1>

                    <span>E-mail</span>
                    <input type="email" name="email" value={email} onChange={this.handleInputChange} />

                    <span>Senha</span>
                    <input type="password" name="password" value={password} onChange={this.handleInputChange} />

                    <Button size="big" type="submit" onClick={ this.handlesubmit } >
                        Entrar
                    </Button>

                </SignForm>
            </Container> 
        );
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch); 
   
export default connect(null, mapDispatchToProps)(SignIn);