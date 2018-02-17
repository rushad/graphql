import React from 'react';

import { queryGraphQL } from '../../graphql';

import PickActor from '../../components/PickActor';

import './styles.css';

class Example2 extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedActorId: null,
            pictureUrl: null
        };
    }

    async selectActor(actorId) {
        this.setState({ selectedActorId: actorId });
        const result = await queryGraphQL(`
            query($id: ID!) {
                actor(id: $id) {
                    picture
                }
            }
        `, { id: actorId });
        this.setState({ pictureUrl: result.data.actor.picture });
    }

    render() {
        return (
            <div className='example2'>
                <PickActor
                    selected={ this.state.selectedActorId }
                    onChange={ actorId => this.selectActor(actorId) }
                />
                <img
                    className='example2__picture'
                    src={ this.state.pictureUrl }
                    alt=''
                />
            </div>
        );
    }
}

export default Example2;
