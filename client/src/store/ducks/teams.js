import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
    getTeamsRequest: null,
    getTeamsSuccess: ['data'],
    selectTeam: ['team'],
    openTeamModal: null,
    openEditTeamModal: null,
    closeTeamModal: null,
    createTeamRequest: ['name'],
    createTeamSuccess: ['team'],
    deleteTeamSuccess: ['teams'],
    deleteTeamRequest: ['id'],
    editTeamRequest: ['id', 'name'],
    editTeamSuccess: ['teams', 'active'],
});


export const TeamsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
    data: [],
    teamModalOpen: false,
    active: JSON.parse(localStorage.getItem('@probee:team')) || null,
});

export const getSuccess = (state, {data}) => {
    return state.merge({ data })
}

export const selectTeam = (state, {team}) => {
    localStorage.setItem('@probee:team', JSON.stringify(team));
    return state.merge({ active: team });
}

export const openModal = state => state.merge({ teamModalOpen: true });

export const closeModal = state => state.merge({ teamModalOpen: false });

export const createSuccess = (state, {team}) => state.merge({ data: [...state.data, team] });

export const deleteSuccess = (state, {teams}) => {

    localStorage.removeItem('@probee:team');

    return state.merge({ data: teams, active: null });
}

export const editSuccess = (state, {teams, active}) => {
    debugger;
    return state.merge({ data: teams, active: active });

}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_TEAMS_SUCCESS]: getSuccess,
    [Types.SELECT_TEAM]: selectTeam,
    [Types.OPEN_TEAM_MODAL]: openModal,
    [Types.CLOSE_TEAM_MODAL]: closeModal,
    [Types.CREATE_TEAM_SUCCESS]: createSuccess,
    [Types.DELETE_TEAM_SUCCESS]: deleteSuccess,
    [Types.EDIT_TEAM_SUCCESS]: editSuccess,
});