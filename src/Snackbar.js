import React, { PropTypes } from 'react';
import classNames from 'classnames';

// This component doesn't use the javascript from MDL.
// This is the expected behavior and the reason is because it's not written in
// a way to make it easy to use with React.
const ANIMATION_LENGTH = 250;

class Snackbar extends React.Component {
    static propTypes = {
        action: PropTypes.string,
        active: PropTypes.bool.isRequired,
        className: PropTypes.string,
        onActionClick: PropTypes.func,
        onTimeout: PropTypes.func.isRequired,
        timeout: PropTypes.number
    };

    static defaultProps = {
        timeout: 2750
    };

    constructor(props) {
        super(props);
        this.clearTimer = this.clearTimer.bind(this);
        this.timeoutId = null;
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.active
        });
    }

    componentDidUpdate() {
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if(this.props.active) {
            this.timeoutId = setTimeout(this.clearTimer, this.props.timeout);

            // Hack fix to re-center the snackbar based on its content
            this.refs.snackbar.style.marginLeft = `-${this.refs.snackbar.offsetWidth * 0.5}px`;
        }
    }

    clearTimer() {
        this.timeoutId = null;
        this.setState({ open: false });

        setTimeout(() => {
            this.props.onTimeout();
        }, ANIMATION_LENGTH);
    }

    render() {
        const { action, active, className, children,
            onActionClick, onTimeout, timeout, ...otherProps } = this.props;
        const { open } = this.state;

        const classes = classNames('mdl-snackbar', {
            'mdl-snackbar--active': open
        }, className);

        return (
            <div ref="snackbar" className={classes} aria-hidden={!open} {...otherProps}>
                <div className="mdl-snackbar__text">{active && children}</div>
                {active && action && <button className="mdl-snackbar__action" type="button" onClick={onActionClick}>{action}</button>}
            </div>
        );
    }
}

export default Snackbar;
