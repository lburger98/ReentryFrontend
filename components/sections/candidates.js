import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import db from '../../services/db'
import Button from '../Button';
import colors from '../../lib/colors'

import { switchPage } from '../../redux/actions'

const ProgressBar = (props) => {
  const progressWidth = (props.stage+1) * 235
  return (
          <div style={{display: 'flex'}}>
            <div className="frontbar" />
            <div className="backbar" />
            <style jsx>{`
              .backbar {
                background-color: ${colors.grey};
                width: 705px;
                border-radius: 7px;
              }
              .frontbar {
                position: absolute;
                background-color: ${colors.primary};
                width: ${progressWidth}px;
                height: 25px;
                border-radius: 7px;
              }
          `}</style>
          </div>

  )
}
const Candidate = ({request, viewRequest}) => {
  const formOne_stage = request.stage
  const formTwo_stage = request.stage

  return  (
      <div className="candidate-container">
        <h1 className="candidate-title">{request.employee_name}</h1>
        <h2 className="candidate-subtitle">{formOne_stage == 2 && formTwo_stage == 2 ? 'Completed' : 'In Progress'}</h2>

        <div className="table-row">
          <div className="spacer" />
          <div className="table-header">Created</div>
          <div className="table-header">Accepted</div>
          <div className="table-header">Finished</div>
          <div className="spacer" />
        </div>

        <div className="table-row">
          <div className="form-title">Form 1</div>
          <ProgressBar stage={formOne_stage}/>
          <Button title={formOne_stage == 0 ? 'Remind' : 'Sign'} width={105} height={25} fontSize={12} onClick={() => viewRequest('8850')}/>
        </div>
        <div className="table-row">
          <div className="form-title">Form 2</div>
          <ProgressBar stage={formTwo_stage}/>
          <Button title={formTwo_stage == 0 ? 'Remind' : 'Sign'} width={105} height={25} fontSize={12} onClick={() => viewRequest('9061')}/>
        </div>

        <style jsx>{`
          .candidate-container { 
            padding-bottom: 52px;
          }
          .candidate-title {
            color: ${colors.secondary};
            font-family: Avenir-Heavy;
            font-size: 24px;
            margin: 0;
          }
          .candidate-subtitle {
            color: ${colors.primary};
            font-family: Avenir-Heavy;
            font-size: 18px;
            margin: 0;
          }
          .table-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .spacer {
            width: 130px;
          }
          .table-header {
            width: 235px;
            color: ${colors.secondary};
            font-family: Avenir-Heavy;
            font-size: 12px;
            text-align: center;
          }
          .form-title {
            color: ${colors.primary};
            font-family: Avenir-Heavy;
            font-size: 16px;
          }
        `}</style>
    </div>
    )
}


class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    }
  }

  componentWillMount() {
    const other_user_type = this.props.user_type == 'employee' ? 'employer' : 'employee'

    db.request.getAll({user_type: this.props.user_type, id: this.props.user._id})
      .then( (requests) => {

        requests.sort(function(a,b){
          return new Date(b.createdDate) - new Date(a.createdDate);
        });

        this.setState({ requests })
      }).catch(console.log)
  }

  viewRequest = (id) => (type) => {
    Router.push(`/viewform?id=${id}&type=${type}&token=${this.props.user.token}`)
  }

  render() {

    return (
      <div className="candidates-container">
        <h1 className="candidates-title">Candidates</h1>

        { this.state.requests.length > 0 && this.state.requests.map((request) => 
            <Candidate key={request._id} request={request} viewRequest={this.viewRequest(request._id)} />
          )
        }
        { this.state.requests.length == 0 &&
          <Candidate key={0} request={{employee_name: 'Loading...', stage: 0}} viewRequest={() => {}} />
        }
        
        <div className="invite-button">
          <Button title="Invite Candidate" width={228} height={47} 
                  onClick={() => this.props.switchPage("invite")}
          />
        </div>
        <style jsx>{`
          .candidates-container { 
          }
          .candidates-title {
            color: ${colors.secondary};
            font-family: Avenir-Black;
            font-size: 24px;
            padding-bottom: 30px;
          }
          .invite-button {
            display: flex;
            justify-content: center;
          }

        `}</style>
    </div>

      )
  }
}


const mapStateToProps = state => {
    return {
        user_type: state.user_type,
        user: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          switchPage
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Candidates)
