import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
    getProjectsRequest: null,
    getProjectsSuccess: ['data'],
    openProjectModal: null,
    editProjectModal: null,
    closeProjectModal: null,
    createProjectRequest: ['title'],
    createProjectSuccess: ['project'],
    deleteProjectRequest: ['id'],
    deleteProjectSuccess: ['projects'],
    editProjectRequest: ['id', 'name'],
    editProjectSuccess: ['projects'],
});


export const ProjectsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
    data: [],
    projectModalOpen: false,
});

export const success = (state, {data}) => {
    return state.merge({ data })
}

export const openModal = state => state.merge({ projectModalOpen: true });
export const closeModal = state => state.merge({ projectModalOpen: false });

export const createSuccess = (state, { project }) => {
    return state.merge({ data: [...state.data, project] });
}

export const deleteSuccess = (state, {projects}) => state.merge({ data: projects });

export const editSuccess = (state, {projects}) => { 
    debugger
    state.merge({ data: projects });
}


export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PROJECTS_SUCCESS]: success,
    [Types.CLOSE_PROJECT_MODAL]: closeModal,
    [Types.OPEN_PROJECT_MODAL]: openModal,
    [Types.CREATE_PROJECT_SUCCESS]: createSuccess,
    [Types.DELETE_PROJECT_SUCCESS]: deleteSuccess,
    [Types.EDIT_PROJECT_SUCCESS]: editSuccess,
});