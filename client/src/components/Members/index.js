import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import api from "../../services/api";

import MembersAction from "../../store/ducks/members";

import Modal from "../Modal";
import Button from "../../styles/components/Button";
import { MembersList, Invite } from "./styles";

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            name: PropTypes.string
          }),
        })
      )
    }).isRequired
  };

   state = {
        invite: '',
    }

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = () => {
    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
  };

  render() {
    const { invite } = this.state;
    const { closeMembersModal, members } = this.props;
    return (
      <Modal size="big">
        <h1>Novo Membro</h1>
        <Invite>
          <input
            name="invite"
            placeholder="Convidar para o time"
            value={invite}
            onChange={this.handleInputChange}
          />
          <Button onClick={this.handleInvite}>Enviar</Button>
        </Invite>
        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>

                {/* <Select
                  isMulti
                  // isDisabled={!can}
                  options={roles}
                  value={member.roles}
                  getOptionLabel={role => role.name}
                  getOptionValue={role => role.id}
                  onChange={value => this.handleRolesChange(member.id, value)}
                /> */}
              </li>
            ))}
          </MembersList>
          <Button onClick={closeMembersModal} filled={false} color="danger">
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

Members.propTypes = {
  closeMembersModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.members
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
