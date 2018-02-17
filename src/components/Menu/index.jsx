import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './styles.css';

const MenuItem = props => (
    <div
        role='button'
        tabIndex='-1'
        className={ cn('menu__item', { 'menu__item--selected': props.selected }) }
        onClick={ () => props.onClick() }
        onKeyDown={ () => {} }
    >
        { props.content }
    </div>
);

MenuItem.propTypes = {
    content: PropTypes.node.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

const Menu = props => (
    <div className='menu'>
        { props.items.map((item, index) => (
            <MenuItem
                key={ item }
                content={ item }
                selected={ props.selected === index }
                onClick={ () => props.onSelect(index) }
            />
        ))}
    </div>
);

Menu.propTypes = {
    selected: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Menu;
