import React from 'react';

const Loader = () => {
    const wrapStyles = {
        display: 'flex',
        height: '300px',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (<div style={wrapStyles}>
        <div id="loading"></div>
    </div>);
};

export default Loader;
