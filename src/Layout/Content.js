import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Content = props => {
    const { children, className, component, ...otherProps } = props;

    const classes = classNames('mdl-layout__content', className);

    return React.createElement(component || 'div', {
        className: classes,
        ...otherProps
    }, [
        children,
        <div key="hack" className="react-mdl-header-tabs-hack" id="undefined" />
    ]);
};

Content.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.func
    ])
};

export default Content;
