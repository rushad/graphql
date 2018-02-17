import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

async function getSource(file) {
    // eslint-disable-next-line
    const response = await fetch('/source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{ "file": "${file}" }`
    });
    return response.text();
}

class SourceView extends React.Component {
    constructor() {
        super();
        this.state = {
            source: ''
        };
    }

    componentWillMount() {
        this.loadSource(this.props.file);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.file !== nextProps.file) {
            this.loadSource(nextProps.file);
        }
    }

    async loadSource(file) {
        const source = await getSource(file);
        this.setState({ source });
    }

    render() {
        return (
            <SyntaxHighlighter
                language='javascript'
                style={ docco }
            >
                { this.state.source }
            </SyntaxHighlighter>
        );
    }
}

SourceView.propTypes = {
    file: PropTypes.string.isRequired
};

export default SourceView;
