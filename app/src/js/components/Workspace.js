import React, {Component} from 'react';
import { connect } from "react-redux";

import CenteredRow from "./partials/CenteredRow";
import Loader from "./partials/Loader";
import CodeSpace from "./CodeSpace";

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

class ConnectedWorkspace extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,
            activeItem: null,
        }
    }
    componentDidMount() {
        const {selected_branch, match} = this.props;
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

    render() {
        return (<div>
            {this.renderLoading()}
            {this.renderWorkspace()}
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
                <li key={"test"} style={listItemStyles} className="list-group-item d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                </li>
                </ul>
            </div>
            <div className="right-col" style={rightColStyles}>
                <CodeSpace uuid={uuid} name={this.state.activeItem} />
            </div>
        </div>)
    }
}

const Workspace = connect(mapStateToProps)(ConnectedWorkspace);
export default Workspace;
