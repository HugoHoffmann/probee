import {call, put} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import ProjectsActions from '../ducks/projects';
import api from '../../services/api';

export function* getProjects(){
    const response = yield call(api.get,'projects');

    yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({ title }){
    try {
        const response = yield call(api.post, 'projects', {title});

        yield put(ProjectsActions.createProjectSuccess(response.data));
        yield put(ProjectsActions.closeProjectModal());
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}

export function* deleteProject({ id }){
    try {

        yield call(api.delete, `projects/${id}`);

        const response = yield call(api.get,'projects');

        yield put(ProjectsActions.deleteProjectSuccess(response.data));

        yield put(toastrActions.add({
            type: 'success',
            title: 'Sucesso!',
            message: 'Projeto deletado.'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}

export function* editProject({ name, id }){
    try {
        const response = yield call(api.delete, `projects/${id}`, {name});

        yield put(ProjectsActions.deleteProjectSuccess(response.data));

        yield put(toastrActions.add({
            type: 'success',
            title: 'Sucesso!',
            message: 'Projeto deletado.'
        }) )
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'contate o suporte'
        }) )
    }

}