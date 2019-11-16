import {call, put, select} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import {push} from 'connected-react-router';

import AuthActions from '../ducks/auth';
import api from '~/services/api';

export function* signIn({ email, password }){
    try {
        const response = yield call(api.post,'sessions', {email, password} );
        localStorage.setItem('@Management:token', response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token))
        yield put(push('/'));
    } catch (error) {
        console.log(error);
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no Login',
            message: 'Verifique as credenciais de acesso'
        }))
    }
}

export function* signUp({ name, email, password }){
    try {
        const response = yield call(api.post,'users', {name, email, password} );
        localStorage.setItem('@Management:token', response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token))
        yield put(push('/'));
    } catch (error) {
        console.log(error);
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no cadastro',
            message: 'Você foi convidade para algum time?'
        }));
    }
}

export function* signOut(){
    localStorage.removeItem('@Management:token');
    localStorage.removeItem('@Management:team');

    yield put(push('/signin'));
}

export function* getPermissions(){

    const team = yield select(state => state.teams.active);
    const signedIn = yield select(state => state.auth.signedIn);
    
    if(!signedIn || !team ){
        return;
    }

    const response = yield call(api.get, 'permissions');

    const {roles, permissions} = response.data;

    yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}