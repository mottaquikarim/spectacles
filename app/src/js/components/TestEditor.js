import React, {Component} from 'react';

import Editor from './Editor';

const getIframe = uuid => {
    return `<iframe
        src="test-runner.html?uuid=${uuid}" 
        style="width: 100%; height: 100%; border: none;"
    ></iframe>`;
}

class TestEditor extends Editor {
    constructor(props) {
        super(props);

        this.wrapStyles = {
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
        };

        this.fullWidth = {
            width: '100%',
            transition: 'height 0.5s',
        }

        this.ribbon = this.extendStyles(
            this.fullWidth,
            {
                backgroundColor: "#00bc8c",
                height: '20px',
                position: 'relative',
                zIndex: '9',
            }
        );

        this.arrow = this.extendStyles({
            padding: '10px',
            position: 'absolute',
            top: '-10px',
            backgroundColor: "#00bc8c",
            height: 'calc(100% + 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px',
            cursor: 'pointer',
        });

        this.state = {
            topHeight: 70,
        }
    }
    increase() {
        const {topHeight} = this.state;
        if (this.state.topHeight < 100) {
            this.setState({
                topHeight: topHeight + 25,
            })
            setTimeout(this.resizeEditor, 500)
        }
    }
    decrease() {
        const {topHeight} = this.state;
        if (this.state.topHeight > 0) {
            this.setState({
                topHeight: topHeight - 25,
            })
            setTimeout(this.resizeEditor, 500)
        }
    }
    resizeEditor() {
        const editor = ace.edit('editor');
        editor.resize();
    }
    extendStyles(...rest) {
        return Object.assign({}, ...rest);
    }
    updateEditor(props) {
        super.updateEditor(props)
        const testRunner = document.getElementById('test-runner');
        const editor = ace.edit('editor');

        const editorSession = editor.getSession()
        editorSession.setUseWrapMode(true);
        testRunner.innerHTML = getIframe(props.uuid) 

        let timeout = null;
        editorSession.on('change', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                testRunner.innerHTML = getIframe(props.uuid);
            }, 500);
        });
    }
    render() {
        const styles = {
            width: '50%',
            height: '100%',
        }

        const {topHeight} = this.state;
        return (<div style={this.wrapStyles}>
            <div id="editor" style={this.extendStyles(
                this.fullWidth, 
                {height: topHeight+'%'}
            )}>
            </div>
            
            <div style={this.ribbon}>
                <div onClick={this.decrease.bind(this)}
                style={this.extendStyles(
                    this.arrow,
                    {
                        left: 'calc((100% - 54px) / 2)',
                    }
                )}>▲</div>
                <div onClick={this.increase.bind(this)}
                style={this.extendStyles(
                    this.arrow,
                    {
                        right: 'calc((100% - 69px) / 2)',
                    }
                )}>▼</div>
            </div>
            <div id="test-runner" style={this.extendStyles(
                this.fullWidth, 
                {height: (100 - topHeight)+"%"}
            )}></div>
        </div>);
    }
}

export default TestEditor
