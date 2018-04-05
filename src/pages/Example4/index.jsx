import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { queryGraphQL } from '../../graphql';

import './styles.css';

const PER_PAGE = 5;

const Button = ({ disabled, onClick, children }) => (
    <div
        role='button'
        tabIndex={ -1 }
        className={ cn('example4__button', { 'example4__button--disabled': disabled }) }
        onClick={ () => !disabled && onClick() }
        onKeyDown={ () => {} }
    >
        { children }
    </div>
);

Button.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

class Example4 extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 0,
            count: 0,
            actors: []
        };
    }

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.loadPage();
        }
    }

    async loadPage() {
        const result = await queryGraphQL(`
            query($page: Int, $perPage: Int) {
                actors(page: $page, perPage: $perPage, sortField: "lastName") {
                    id
                    firstName
                    lastName
                    gender
                    picture
                    casts {
                        role
                        movie {
                            name
                            year
                        }
                    }
                }
                totalActors
            }          
        `, {
            page: this.state.page,
            perPage: PER_PAGE
        });
        this.setState({ actors: result.data.actors, count: result.data.totalActors });
    }

    render() {
        const pagesCount = Math.floor((this.state.count + (PER_PAGE - 1)) / PER_PAGE);
        return (
            <div className='example4'>
                <Button
                    disabled={ this.state.page < 1 }
                    onClick={ () => this.setState({ page: this.state.page - 1 }) }
                >
                    ⇦
                </Button>
                <div className='example4__count'>[ { this.state.page + 1} / { pagesCount } ]</div>
                <Button
                    disabled={ this.state.page >= pagesCount - 1 }
                    onClick={ () => this.setState({ page: this.state.page + 1 }) }
                >
                    ⇨
                </Button>
                {
                    this.state.actors.map(actor => (
                        <div key={ actor.id } className='example4__actor'>
                            <img
                                className='example4__picture'
                                src={ actor.picture }
                                alt=''
                            />
                            <div className='example4__info'>
                                <div>{ actor.firstName } { actor.lastName }</div>
                                { actor.casts.map(cast => (
                                    <div className='example4__movie'>
                                        { cast.movie.name } ({ cast.movie.year }): { cast.role }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Example4;
