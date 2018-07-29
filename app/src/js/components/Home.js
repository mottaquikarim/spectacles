import React, { Component } from "react";
import { connect } from "react-redux";

import {
    addBranches,
    addSelectedBranch,
    addAccessToken,
} from '../actions/index';

import {
    request,
    getPath,
} from "../github";

import CenteredRow from "./partials/CenteredRow";
import Loader from "./partials/Loader";

const mapStateToProps = state => {
  const {
    personal_access_token,
    selected_branch,
    branches,
  } = state.genericReducer;

  // TODO: maybe just always return state.genericReducer?
  return {
    personal_access_token,
    selected_branch,
    branches,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        addBranches: data => dispatch(addBranches(data)),
        addSelectedBranch: branch => dispatch(addSelectedBranch(branch)),
        addAccessToken: token => dispatch(addAccessToken(token)),
    };
};

export class ConnectedHome extends Component {
    constructor() {
        super()

        this.state = {
            branchName: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e) {
        this.setState({ branchName: e.target.value })
    }

    handleClick(e) {
        e.preventDefault();

        const {branches, addSelectedBranch, history} = this.props;
        const name = e.target.getAttribute('data-name');
        sessionStorage.setItem('selected_branch', name)
        addSelectedBranch(name);
        history.push('/dashboard');
    }

    handleSubmit(e) {
        e.preventDefault();

        const {branches, addSelectedBranch, history} = this.props;
        const {branchName} = this.state;

        const tformedBranchName = `content-${branchName}`;
        const masterBranchSha = branches.filter(branch => branch.ref.indexOf('master') > -1);
        const masterSha = masterBranchSha[0].object.sha;

        request(
            getPath("repos", "git/refs"),
            "POST",
            {},
            {},
            {
                ref: `refs/heads/${tformedBranchName}`,
                sha: masterSha,
            }
        ).then(({data}) => {
            sessionStorage.setItem('selected_branch', data.ref)
            addSelectedBranch(data.ref);
            history.push('/dashboard');
        })
        .catch(e => {
            console.log(e)
        })

        this.setState({ branchName: '' })
    }

    componentDidMount() {
        const {
            personal_access_token,
            selected_branch,
            history,
        } = this.props;

        // only accessible if we have access token
        if (!personal_access_token) {
            history.push("/");
        }

        request(getPath("repos", "git/refs/heads"), "GET")
            .then(({data}) => {
                this.props.addBranches(data)
            })
            .catch(e => {
                console.log(e)
                if (e.response.data.message === 'Bad credentials') {
                    alert('Credentials expired!')
                    this.props.addAccessToken(null);
                    history.push("/");
                }
            })
    }

    render() {
        const {props, renderData, renderLoading, renderForm} = this;
        const {selected_branch, branches} = props;

        let mode = renderLoading;

        if (selected_branch) {
            mode = renderData;
        }

        if (branches) {
            mode = renderForm;
        }

        return (<CenteredRow>{mode.call(this)}</CenteredRow>);
    }

    renderForm() {
        const {branches} = this.props;

        const usableBranches = branches.filter(branch => branch.ref.split('/').pop().indexOf('content-') > -1);
        const branchesToDisplay = usableBranches.length === 0 ? null : (<div>
            <h3 className="card-title">Pick a Branch</h3>
            <div className="card-text">
                <ol>
                {usableBranches.map((branch, i) => {
                    const name = branch.ref.split('/').pop();
                    return (<li key={i}>
                        <strong data-name={branch.ref} style={{cursor: 'pointer'}} onClick={this.handleClick}>
                            {name}
                        </strong>
                    </li>);
                })}
                </ol>
            </div>
        </div>);

        const branchToCreate = (<div>
            <h3 className="card-title">Create a Branch</h3>
            <div className="card-text">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="new-branch-name">Branch Name</label>
                        <input type="text"
                            className="form-control"
                            id="new-branch-name"
                            onChange={this.handleChange}
                            value={this.state.branchName}
                            placeholder="enter branch name" />
                    </div>
                    <button type="submit" className="btn">Create</button>
                </form>
            </div>
        </div>);

        return (<div className="card text-white mb-12">
            <div className="card-header">Choose or Create Branch</div>
            <div className="card-body">
                {branchesToDisplay}
                {branchToCreate}
            </div>
        </div>);
    }

    renderLoading() {
        return <Loader />;
    }

    renderData() {
        return (<div>Test</div>)
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);
export default Home;
