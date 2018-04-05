import React from 'react';
import PropTypes from 'prop-types';

import { queryGraphQL } from '../../graphql';

import './styles.css';

class PickActor extends React.Component {
    constructor() {
        super();
        this.state = {
            actors: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const result = await queryGraphQL(`
            query {
                actors(sortField: "lastName") {
                    id
                    firstName
                    lastName
                }
            }
        `);
        this.setState({ actors: result.data.actors });
    }

    render() {
        return (
            <select
                className='pick-actor'
                value={ this.props.selected || 'placeholder' }
                onChange={ e => this.props.onChange(e.target.value) }
            >
                <option
                    key='placeholder'
                    value='placeholder'
                    disabled
                >
                    Pick Actor
                </option>
                { this.state.actors.map(actor => (
                    <option key={ actor.id } value={ actor.id }>
                        { actor.firstName } { actor.lastName }
                    </option>
                ))}
            </select>
        );
    }
}

PickActor.propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

PickActor.defaultProps = {
    selected: null
};

export default PickActor;
