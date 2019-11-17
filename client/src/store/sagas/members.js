import {call, put} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import MembersActions from '../ducks/members';
import api from '../../services/api';

export function* getMembers(){
    const response = yield call(api.get,'members');

    yield put(MembersActions.getMembersSuccess(response.data));
}


export function* updateMember({ id }){
    try {
        yield call(api.put, `members/${id}`);

        yield put(toastrActions.add({
            type: 'success',
            title: 'Membro atualizado',
            message: 'O membro foi atualizado com sucesso'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }
}


export function* inviteMember({ email }){
    try {
        yield call(api.post, 'invites', {invites: [email]});

        yield put(toastrActions.add({
            type: 'success',
            title: 'Convite enviado',
            message: 'Convite enviado para o email'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }
}