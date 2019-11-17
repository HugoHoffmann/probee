import {call, put, select} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import {push} from 'connected-react-router';

import AuthActions from '../ducks/auth';
import api from '../../services/api';

export function* signIn({ email, password }){
    try {
        const response = yield call(api.post,'sessions', {email, password} );
        localStorage.setItem('@probee:token', response.data.token);

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
        localStorage.setItem('@probee:token', response.data.token);

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
    localStorage.removeItem('@probee:token');
    localStorage.removeItem('@probee:team');

    yield put(push('/signin'));
}
