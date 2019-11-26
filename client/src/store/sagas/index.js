import { all, fork, takeLatest } from 'redux-saga/effects';

import { signIn, signOut, signUp } from './auth'
import { AuthTypes } from '../ducks/auth';

import { getTeams, createTeam, editTeam, deleteTeam } from './teams';
import { TeamsTypes } from '../ducks/teams';

import { getProjects, createProject, editProject, deleteProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { getMembers, updateMember, inviteMember } from './members';
import { MembersTypes } from '../ducks/members';

export default function* rootSaga(){
    return yield all([
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
        takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

        takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
        takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),
        takeLatest(TeamsTypes.DELETE_TEAM_REQUEST, deleteTeam),
        takeLatest(TeamsTypes.EDIT_TEAM_REQUEST, editTeam),

        
        takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
        takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
        takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),
        takeLatest(ProjectsTypes.DELETE_PROJECT_REQUEST, deleteProject),
        takeLatest(ProjectsTypes.EDIT_PROJECT_REQUEST, editProject),

        takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
        takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),
        takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
    ]);
}