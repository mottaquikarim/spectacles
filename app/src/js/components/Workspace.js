import React, {Component} from 'react';
import { connect } from "react-redux";

import CenteredRow from "./partials/CenteredRow";
import Loader from "./partials/Loader";
import CodeSpace from "./CodeSpace";

import {
    request,
    getPath,
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
        const uuid = this.props.match.params.uuid;
        if (!uuid) {
            this.props.history.push('/dashboard');
        }

        const localJSON = localStorage.getItem(uuid) || '[]';
        const localData = JSON.parse(localJSON);

        request(
            getPath('repos', 'contents/content/' + uuid), 
            "GET",
        ).then(({data}) => {
            return Promise.all(data.map(item => {
                const {path} = item;
                const hash = {};
                hash.name = path.split('/').pop();
                hash.type = hash.name.split('.').pop();
                return request(getPath("repos", "contents/" + path), "GET").then(({data}) => {
                    const {content} = data;
                    const localItem = localData.filter(item => item.name === data.name)
                    if (localItem.length) {
                        hash.content = localItem[0].content;
                    }
                    else {
                        const tformedContent = atob(content);
                        hash.content = tformedContent;
                    }
                    hash.sha = data.sha;
                    return hash;
                })
            })).then(all => {
                localStorage.setItem(uuid, JSON.stringify(all));
                this.setState({
                    isLoading: false,
                    activeItem: all[0].name,
                });
            });
        })
    }

    updateActive(name) {
        this.setState({
            activeItem: name,
        })
    }

    save() {
        const uuid = this.props.match.params.uuid;

        const localJSON = localStorage.getItem(uuid) || '{}';
        const localData = JSON.parse(localJSON);

        const commitSha = request(getPath("repos", "git/" + this.props.selected_branch), "GET")
            .then(({data}) => data.object.sha)

        const shaBaseTree = commitSha.then(sha => request(getPath("repos", "git/commits/" + sha), "GET"))
            .then(({data}) => data.sha);

        const shaNewTree = shaBaseTree.then(sha => request(
            getPath("repos", "git/trees"),
            "POST",
            {},
            {},
            {
                base_tree: sha,
                tree: localData.map(each =>({
                    mode: '100644',
                    type: 'blob',
                    path: 'content/' + uuid + "/" + each.name,
                    content: each.content,
                })),
            }
        )).then(({data}) => data.sha);

        const shaNewCommit = Promise.all([commitSha, shaNewTree])
            .then(([commitSha, shaNewTree]) => {
                return request(
                    getPath("repos", "git/commits"),
                    "POST",
                    {},
                    {},
                    {
                        parents: [commitSha],
                        tree: shaNewTree,
                        message: "Trying bulk level commit",
                    }
                );
            })
            .then(({data}) => data.sha);
        
        const finalStep = shaNewCommit.then(sha => request(
            getPath("repos", "git/" + this.props.selected_branch),
            "POST",
            {},
            {},
            {
                sha,
            }
        )).then(({data}) => console.log(data));

            /*
            .then(currentRef => {
                const sha = currentRef.object.sha;
                const ref = currentRef.ref;
                return Promise.all(localData.map(each => {
                    console.log(each.content)
                    return request(
                        getPath('repos', 'contents/content/' + uuid + "/" + each.name), 
                        "PUT",
                        {},
                        {},
                        {
                            "message": "testing!",
                            "content": btoa(each.content),
                            "sha": each.sha,
                            "branch": ref,
                        },
                    );
                }));
            }).then(all => console.log(all));
            */
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
