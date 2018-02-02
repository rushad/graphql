import React from 'react';

import { queryGraphQL } from '../../graphql';

import './styles.css';

class PickActor extends React.Component {
    state = {
        actors: [],
    };

    async componentWillMount() {
        const result = await queryGraphQL(`
            query actorsShortView {
                allActors(sortField: "lastName") {
                    id
                    firstName
                    lastName
                }
            }
        `);
        this.setState({ actors: result.data.allActors });
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

export default PickActor;