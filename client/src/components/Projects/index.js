import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import ProjectsAction from '../../store/ducks/projects';
import MembersAction from '../../store/ducks/members';

import Members from '../Members';
import Button from '../../styles/components/Button';
import Modal from '../Modal';
import { Container, Project } from './styles';

class Projects extends Component {
    static propTypes = {
        getProjectsRequest: PropTypes.func.isRequired,
        openProjectModal: PropTypes.func.isRequired,
        editTeamModal: PropTypes.func.isRequired,
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

    render() {
        const { activeTeam, projects, teams, closeProjectModal, editProjectModal, deleteProject, openProjectModal, editTeamModal, deleteTeam, openMembersModal, members } = this.props;
        const { newProject } = this.state;

        if (!activeTeam) return null;
        return (
            <Container>
                <header>
                    <h1>{activeTeam.name}</h1>
                    <div>
                        <MdModeEdit onClick={editTeamModal} size={22} color="#fff" />
                        <MdDelete onClick={deleteTeam} size={22} color="#fff" />
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
                            <MdModeEdit onClick={editProjectModal} size={22} color="#fff" />
                            <MdDelete onClick={deleteProject} size={22} color="#fff" />
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
                {/* { teams.ModalOpen && (
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
                )} */}
                { members.membersModalOpen && <Members/> }
            </Container>)
    }
}

const mapStateToProps = state => ({
    activeTeam: state.teams.active,
    members: state.members,
    projects: state.projects,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...ProjectsAction, ...MembersAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);