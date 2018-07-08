const uuid4 = require('uuid/v4');

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
    addContentrc,
} from '../actions/index';

import {
    SPEC_DEFAULTS,
} from "../constants/spec-defaults";

import {
    request,
    getPath,
    save,
} from "../github";

import WideRow from "./partials/WideRow";

const mapStateToProps = state => {
  const {
    personal_access_token,
    selected_branch, 
    contentrc,
 } = state.genericReducer;

  return {
    personal_access_token,
    selected_branch, 
    contentrc,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        addContentrc: content => dispatch(addContentrc(content)),
    };
};

class ConnectedDashboard extends Component {
    constructor() {
        super()

        this.state = {
            selectedTag: null,
            tags: {},
            title: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({
            title: e.target.value,
        })
    }
    handleSubmit(e) {
        e.preventDefault()

        const {title} = this.state;
        const {selected_branch, match} = this.props
        const uuid = uuid4();

        const localData = SPEC_DEFAULTS.map(item => {
            if (item.name === "meta.json") {
                item.content = JSON.stringify({title,});
            }
            return item;
        });

        save(uuid,
            localData,
            selected_branch,
            `Updating problem ${uuid}`
        ).then(_ => alert("Successfully committed to Github"))
         .then(_ => this.props.history.push('/workspace/'+uuid))

        this.setState({
            title: "",
        })
    }
    componentDidMount() {
        const {
            selected_branch,
            personal_access_token,
            history,
        } = this.props;

        if (!personal_access_token) {
            history.push("/");
        }

        if (!selected_branch) {
            history.push("/home");
        }

        request(
            getPath("repos", "contents/content/.contentrc"),
            "GET",
            {ref: selected_branch}
        ).then(({data}) => {
            const {content} = data;

            const tformedContent = JSON.parse(atob(content));

            this.props.addContentrc(tformedContent);
        });
    }

    getContentItems(e, tag, data) {
        e.preventDefault();
        const {
            selected_branch,
        } = this.props;

        this.setState({selectedTag: tag});
        if (this.state.tags[tag]) return;

        const dataContent = data.map(item => {
            return request(
                getPath("repos", "contents/content/" + item + "/meta.json"),
                "GET",
                {ref: selected_branch}
            ).then(({data}) => {
                const {content} = data;
                const tformedContent = JSON.parse(atob(content));
                return {tformedContent, data, uuid: item};
            });
        });

        Promise.all(dataContent).then(([...all]) => {
            this.setState({
                tags: Object.assign({}, this.state.tags, {
                    [tag]: all
                }),
            });
        });
    }

    render() {
        return (<WideRow>
            {this.renderTags()}
            <br />
            <br />
            {this.renderTagList()}
            <br />
            <br />
            {this.renderCreateNew()}
        </WideRow>);
    }

    renderTags() {
        const {contentrc} = this.props;
        const {selectedTag} = this.state;
        if (!contentrc) {
            return null;
        }

        if (contentrc.tagsDict.length === 0) {
            return (<div>No tags found</div>);
        }

        const tags = Object.keys(contentrc.tagsDict).map((tag, i) => {
            const data = contentrc.tagsDict[tag];
            const btnType = tag === selectedTag ? "btn-success" : "btn-info";
            return (<div className="btn-group"
                onClick={e => this.getContentItems(e, tag, data)}
                key={i}
                style={{margin: "10px"}}>
                <button className={"btn btn-sm active " + btnType}>{tag}</button>
                <button className={"btn btn-sm " + btnType}>{data.length}</button>
            </div>);
        });

        return (<div>
            <h2>Tags</h2>
            {tags}
        </div>)
    }

    renderTagList() {
        const {selectedTag, tags} = this.state;
        if (!selectedTag || !tags[selectedTag]) return null;

        return tags[selectedTag].map((item, i) => {
            console.log(item, selectedTag);
            const {tformedContent, data, uuid} = item;
            return (<div className="card text-white mb-12" key={i}>
                <div className="card-header">
                    <Link to={"/workspace/"+uuid}>{tformedContent.title}</Link>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <strong>UUID: </strong> {uuid}
                    </div>
                    <div className="card-text">
                        <strong>TAGS: </strong> {tformedContent.tags.map((tag, j) => {
                            return <span
                                key={j}>{tag + (j === tformedContent.tags.length - 1 ? "" : ", ")}</span>
                        })}
                    </div>
                </div>
            </div>)
        });
    }

    renderCreateNew() {
        return (<div>
            <h2>Create New</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-problem-title">Title</label>
                    <input type="text"
                        className="form-control"
                        id="new-problem-title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        placeholder="Enter title" />
                </div>
                <button type="submit" className="btn">Create</button>
            </form>
        </div>)
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(ConnectedDashboard);
export default Dashboard;
