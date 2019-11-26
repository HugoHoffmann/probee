import {call, put} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import TeamsActions from '../ducks/teams';
import api from '../../services/api';

export function* getTeams(){
    const response = yield call(api.get,'teams');

    yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* createTeam({ name }){
    try {
        const response = yield call(api.post, 'teams', {name});

        yield put(TeamsActions.createTeamSuccess(response.data));
        yield put(TeamsActions.closeTeamModal());
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}

export function* editTeam({ name, id }){
    try {

        yield call(api.update, `teams/${id}`, {name});

        const response = yield call(api.get,'teams');

        yield put(TeamsActions.updateTeamSuccess(response.data));
        yield put(TeamsActions.closeTeamModal());

        yield put(toastrActions.add({
            type: 'success',
            title: 'Sucesso!',
            message: 'Time atualizado.'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}

export function* deleteTeam({ id }){
    try {

        yield call(api.delete, `teams/${id}`);

        const response = yield call(api.get,'teams');

        yield put(TeamsActions.deleteTeamSuccess(response.data));

        yield put(toastrActions.add({
            type: 'success',
            title: 'Sucesso!',
            message: 'Time deletado.'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}