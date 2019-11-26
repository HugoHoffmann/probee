import React, { Component } from 'react';

import {toastr} from 'react-redux-toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import ProjectsAction from '../../store/ducks/projects';
import TeamsAction from '../../store/ducks/teams';
import MembersAction from '../../store/ducks/members';

import Members from '../Members';
import Button from '../../styles/components/Button';
import Modal from '../Modal';

import { Container, Project } from './styles';

class Projects extends Component {
    static propTypes = {
        getProjectsRequest: PropTypes.func.isRequired,
        openProjectModal: PropTypes.func.isRequired,
        openMembersModal: PropTypes.func.isRequired,
        closeProjectModal: PropTypes.func.isRequired,        
        createProjectRequest: PropTypes.func.isRequired,        
        deleteTeamRequest: PropTypes.func.isRequired,        
        activeTeam: PropTypes.shape({
            name: PropTypes.string,
        }),
        projects: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,   
            })),
            projectModalOpen: PropTypes.bool
        }).isRequired,
        members: PropTypes.shape({
            membersModalOpen: PropTypes.bool,
        }).isRequired,
        teams: PropTypes.shape({
            teamsModalOpen: PropTypes.bool,
        }).isRequired,
    }

    static defaultProps = {
        activeTeam: null,
    }

    state = {
        newProject: '',
        editTeam: '',
        editTeamModal: false,
        editProjectModal: false,
    }

    componentDidMount(){
        const { getProjectsRequest, activeTeam } = this.props;

        if(activeTeam){
            getProjectsRequest();
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCreateProject = () => {
        const { createProjectRequest } = this.props;
        const { newProject } = this.state;

        createProjectRequest(newProject);
    }

    handleDeleteProject = (id) => {

        const { deleteProjectRequest } = this.props;

        deleteProjectRequest(id);

    }

    handleDeleteTeam = (id) => {

        const { deleteTeamRequest, teams } = this.props;

        if(teams.data.length > 1){

            deleteTeamRequest(id);

        }else{

            toastr.error('Ops', 'Não é possível apagar o último time');

        }

    }

    handleEditProject = (id) => {
        
        const { editProjectRequest } = this.props;
        const { ediProject, editProjectModal } = this.state;

        editProjectRequest(id, editTeam);

        this.setState({
            ediProject: '',
            editProjectModal: !editProjectModal
        })
    }

    handleModalEditProject = () => {
        const { editProjectModal } = this.state;

        this.setState({
            editProjectModal: !editProjectModal
        })
    }

    handleEditTeam = (id) => {
        
        const { editTeamRequest } = this.props;
        const { editTeam, editTeamModal } = this.state;

        editTeamRequest(id, editTeam);

        this.setState({
            editTeamModal: !editTeamModal,
            editTeam: ''
        })
    }

    handleModalEditTeam = () => {
        const { editTeamModal } = this.state;

        this.setState({
            editTeamModal: !editTeamModal
        })
    }

    render() {
        const { activeTeam, projects, closeProjectModal, closeTeamModal, teams, deleteProject, openProjectModal, openMembersModal, members } = this.props;

        const { newProject, editTeam, editTeamModal } = this.state;

        if (!activeTeam) return null;
        return (
            <Container>
                <header>
                    <h1>{activeTeam.name}</h1>
                    <div>
                        <MdModeEdit onClick={this.handleModalEditTeam} size={22} color="#fff" />
                        <MdDelete onClick={ () => this.handleDeleteTeam(activeTeam.id) } size={22} color="#fff" />
                    </div>
                    <div>
                        <Button onClick={openProjectModal}>
                            + Novo
                        </Button>
                        <Button onClick={openMembersModal}>
                            Membros
                        </Button>
                    </div>
                </header>
                {projects.data.map(project => (
                    <Project key={project.id}>
                        <p>{project.title}</p>
                        <div>
                            {/* <MdModeEdit onClick={editProjectModal} size={22} color="#fff" /> */}
                            <MdDelete onClick={ () => this.handleDeleteProject(project.id) } size={22} color="#fff" />
                        </div>
                    </Project>
                ))}
                { projects.projectModalOpen && (
                    <Modal>
                        <h1>Criar projeto</h1>
                        <form>
                            <span>NOME</span>
                            <input name="newProject" onChange={this.handleInputChange} value={newProject}/>
                            <Button onClick={ this.handleCreateProject }size="big" type="submit" >
                                Salvar
                            </Button>

                            <Button onClick={closeProjectModal} size="small" color="gray" type="submit" >
                                Cancelar
                            </Button>
                        </form>
                    </Modal>
                )}
                { editTeamModal && (
                    <Modal>
                        <h1>Editar time</h1>
                        <form>
                            <span>NOME</span>
                            <input name="editTeam" onChange={this.handleInputChange} value={editTeam}/>
                            <Button onClick={ () => this.handleEditTeam(activeTeam.id) }size="big" type="submit" >
                                Salvar
                            </Button>

                            <Button onClick={closeTeamModal} size="small" color="gray" type="submit" >
                                Cancelar
                            </Button>
                        </form>
                    </Modal>
                )}
                { members.membersModalOpen && <Members/> }
            </Container>)
    }
}

const mapStateToProps = state => ({
    activeTeam: state.teams.active,
    members: state.members,
    teams: state.teams,
    projects: state.projects,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...ProjectsAction, ...MembersAction, ...TeamsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);