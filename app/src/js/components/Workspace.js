import React, {Component} from 'react';
import { connect } from "react-redux";

import CenteredRow from "./partials/CenteredRow";
import Loader from "./partials/Loader";
import WrapEditor from "./WrapEditor";

import {
    addAccessToken,
} from '../actions/index';

import {
    request,
    getPath,
    save,
    getContent,
} from "../github";

import '../../css/workspace.css';

const mapStateToProps = state => {
  const {
    selected_branch, 
 } = state.genericReducer;

  return {
    selected_branch, 
  }
};

const mapDispatchToProps = dispatch => {
    return {
        addAccessToken: token => dispatch(addAccessToken(token)),
    };
};

class ConnectedWorkspace extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,
            activeItem: null,
            modalShowing: false,
            prTitle: "",
            prBody: "",
            prExists: false,
            html_url: null,
        }
    }
    componentDidMount() {
        const {selected_branch, match, history} = this.props;
        const {uuid} = match.params;
        if (!uuid) {
            this.props.history.push('/dashboard');
        }

        const localJSON = localStorage.getItem(uuid) || '[]';
        const localData = JSON.parse(localJSON);

        getContent(uuid, localData, selected_branch)
            .then(all => {
                this.setState({
                    isLoading: false,
                    activeItem: all[0].name,
                });
            });

        request(
            getPath("repos", "pulls"),
            "GET"
        ).then(({data}) => {
            return data.filter(pr => selected_branch.indexOf(pr.head.ref) > -1);
        })
        .then(([item]) => {
            if (!item) {
                return;
            }
            this.setState({
                prExists: true,
                html_url: item.html_url,
            })
        })
        .catch(e => {
            if (e.response.data.message === 'Bad credentials') {
                alert('Credentials expired!')
                this.props.addAccessToken(null);
                history.push("/");
            }
        });
    }

    updateActive(name) {
        this.setState({
            activeItem: name,
        })
    }

    save() {
        const {selected_branch, match} = this.props
        const {uuid} = match.params

        const localJSON = localStorage.getItem(uuid) || '{}';
        const localData = JSON.parse(localJSON);

        save(this.props.match.params.uuid,
            localData,
            selected_branch,
            `Updating problem ${uuid}`
        ).then(_ => alert("Successfully committed to Github"));
    }

    closeModal(e) {
        e.preventDefault();

        let currentNode = e.target;
        while (!currentNode.matches('body')) {
            if (currentNode.matches('.pr-form')) {
                e.stopPropagation();
                return false;
            }
            currentNode = currentNode.parentNode;
        }

        this.setState({
            modalShowing: false,
        });

    }

    handleChange(title, e) {
        this.setState({
            [title]: e.target.value,
        })
    }

    openPRModal(e) {
        e.preventDefault();
        this.setState({
            modalShowing: true,
        });
    }

    openPR() {
        const {selected_branch, match} = this.props
        const {uuid} = match.params
        const {prTitle, prBody} = this.state;

        if (!prTitle || !prBody) {
            alert('Title and body content required to open PR!');
            return;
        }

        request(
            getPath("repos", "pulls"),
            "POST",
            {},
            {},
            {
                "title": prTitle,
                "head": selected_branch,
                "base": "master",
                "body": prBody, 
            }
        ).then(({data}) => {
            const {html_url} = data;
            alert("Successfully opened PR!")
            this.setState({
                html_url,
                prExists: true,
            });
        }, e => {
            const message = e.response.data.errors.map(error => error.message).join('\n');
            alert(message);
        }).then(_ => {
            this.setState({
                prTitle: "",
                prBody: "",
                modalShowing: false,
            });
        });
    }

    render() {
        return (<div>
            {this.renderLoading()}
            {this.renderWorkspace()}
            {this.renderModal()}
        </div>);
    }
    renderLoading() {
        if (!this.state.isLoading) return null;
        return (<Loader />);
    }
    renderWorkspace() {
        if (this.state.isLoading) return null;
        const uuid = this.props.match.params.uuid;
        const json = localStorage.getItem(uuid);
        if (!json) return null;

        const data = JSON.parse(json);

        const WIDTH = 200;
        const leftColStyles = {
            width: `${WIDTH}px`,
            backgroundColor: '#303030',
        }

        const rightColStyles = {
            width: `calc(100% - ${WIDTH}px)`,
        }

        const listItemStyles = {
            paddingTop: '5px',
            paddingBottom: '5px',
            borderRadius: '0',
            borderColor: 'transparent',
        }

        return (<div className="workspace-wrapper">
            <div className="left-col" style={leftColStyles}>
                <ul className="list-group">
                {data.map((item, i) => {
                    const {name} = item;
                    const classNames = 'list-group-item d-flex justify-content-between align-items-center'.split(' ');
                    if (name === this.state.activeItem) {
                        classNames.push("active");
                    }
                    return (<li key={i} className={classNames.join(" ")} 
                        onClick={e => this.updateActive(name)}
                        style={listItemStyles}>
                        {name}
                    </li>);
                })}
                <li key={"save"} style={listItemStyles} className="list-group-item d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                </li>
                <li key={"PR"} style={listItemStyles} className="list-group-item d-flex justify-content-between align-items-center">
                    {this.renderBtnOrLink()}
                </li>
                </ul>
            </div>
            <div className="right-col" style={rightColStyles}>
                <WrapEditor uuid={uuid} name={this.state.activeItem} />
            </div>
        </div>)
    }

    renderBtnOrLink() {
        const {prExists, html_url} = this.state;
        if (!prExists) {
            return (<button className="btn btn-success" onClick={this.openPRModal.bind(this)}>Open PR</button>)
        }

        return (<a className="btn btn-success" href={html_url} target="_blank">Go To PR</a>)
    }
    renderModal() {
        if (!this.state.modalShowing) return null;

        const modalStyles = {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
        };
        return (<div style={modalStyles} onClick={this.closeModal.bind(this)}>
            <form className="pr-form" style={{"width": "50%"}}>
                <div className="form-group">
                    <label htmlFor="pr-title">Create a PR</label>
                    <p>
                        This will open a PR against <b>master</b>
                    </p>
                    <input type="text"
                        className="form-control"
                        id="pr-title"
                        onChange={e => this.handleChange("prTitle", e)}
                        value={this.state.prTitle}
                        placeholder="Enter title of PR" />
                    <small className="form-text text-muted">Title of your PR</small>
                    <input type="text"
                        className="form-control"
                        id="pr-body"
                        onChange={e => this.handleChange("prBody", e)}
                        value={this.state.prBody}
                        placeholder="Enter body content (comments, etc) for PR" />
                    <small className="form-text text-muted">Add any relevant comments as needed</small>
                </div>
                <button type="submit" className="btn" onClick={this.openPR.bind(this)}>Create PR</button>
            </form>
        </div>);
    }
}

const Workspace = connect(mapStateToProps, mapDispatchToProps)(ConnectedWorkspace);
export default Workspace;
