import React from 'react';
import cn from 'classnames';

import { queryGraphQL } from '../../graphql';

import './styles.css';

const PER_PAGE = 5;

class Example3 extends React.Component {
    state = {
        page: 0,
        count: 0,
        actors: []
    };

    async loadPage() {
        const result = await queryGraphQL(`
            query($page: Int, $perPage: Int) {
                allActors(page: $page, perPage: $perPage, sortField: "lastName") {
                    firstName
                    lastName
                    gender
                    picture
                }
                _allActorsMeta {
                    count
                }
            }          
        `, {
            page: this.state.page,
            perPage: PER_PAGE
        });
        this.setState({ actors: result.data.allActors, count: result.data._allActorsMeta.count });
    }

    componentWillMount() {
        this.loadPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.loadPage();
        }
    }

    render() {
        const pagesCount = Math.floor((this.state.count + (PER_PAGE - 1)) / PER_PAGE);
        const isFirstPage = this.state.page < 1;
        const isLastPage = this.state.page >= pagesCount - 1;
        return (
            <div className='example3'>
                <div
                    className={ cn('example3__button', { 'example3__button--disabled': isFirstPage }) }
                    onClick={ () => !isFirstPage && this.setState({ page: this.state.page - 1 }) }
                >
                    &lt;&lt; Prev
                </div>
                <div className='example3__count'>[ { this.state.page + 1} / { pagesCount } ]</div>
                <div
                    className={ cn('example3__button', { 'example3__button--disabled': isLastPage }) }
                    onClick={ () => !isLastPage && this.setState({ page: this.state.page + 1 }) }
                >
                    Next &gt;&gt;
                </div>
                {
                    this.state.actors.map(actor => (
                        <div className='example3__actor'>
                            <img
                                className='example3__picture'
                                src={ actor.picture }
                                alt=''
                            />
                            <div className='example3__name'>{ actor.firstName } { actor.lastName }</div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Example3;