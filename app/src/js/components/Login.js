import React, { Component } from "react";
import { connect } from "react-redux";

import { addAccessToken } from '../actions/index';

import CenteredRow from "./partials/CenteredRow";

const mapStateToProps = state => {
  const {personal_access_token} = state.genericReducer;

  return {
    personal_access_token,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        addAccessToken: token => dispatch(addAccessToken(token))
    };
};

class ConnectedLogin extends Component {
    constructor() {
        super();

        this.state = {
            personalToken: "",
            disabled: true,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        if (this.props.personal_access_token) {
            this.props.history.push("/home");
        }
        else {
            this.setState({ disabled: false });
        }
    }

    handleChange(e) {
        this.setState({
            personalToken: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        sessionStorage.setItem(
            'personal_access_token',
            this.state.personalToken
        );
        this.props.addAccessToken(this.state.personalToken);
        this.setState({ personalToken: "" });
        this.props.history.push("/home");
    }

    render() {
        return (<CenteredRow>
            <div className="card text-white mb-12">
                <div className="card-header">Login to Spectacles</div>
                <div className="card-body">
                    <h3 className="card-title">Personal Access Token</h3>
                    <p className="card-text">
                        Please create a 
                        {" "} <a href="https://github.com/settings/tokens" target="_blank">
                                Github Personal Access Token
                              </a>
                        with <strong>repo</strong> permissions.
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="personal-access-token">Personal Access Token</label>
                            <input type="password"
                                className="form-control"
                                id="personal-access-token"
                                onChange={this.handleChange}
                                value={this.state.personalToken}
                                disabled={this.state.disabled}
                                placeholder="Enter token" />
                            <small className="form-text text-muted">This will only be stored in memory per session</small>
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
        </CenteredRow>);
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;
