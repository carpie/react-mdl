import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import mdlUpgrade from './utils/mdlUpgrade';

class Textfield extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        error: PropTypes.node,
        expandable: PropTypes.bool,
        expandableIcon: PropTypes.string,
        floatingLabel: PropTypes.bool,
        id: PropTypes.string,
        inputClassName: PropTypes.string,
        label: PropTypes.string.isRequired,
        maxRows: PropTypes.number,
        onChange: PropTypes.func,
        pattern: PropTypes.string,
        required: PropTypes.bool,
        rows: PropTypes.number,
        style: PropTypes.object,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    componentDidUpdate(prevProps) {
        if(
            this.props.required !== prevProps.required ||
            this.props.pattern !== prevProps.pattern ||
            this.props.error !== prevProps.error
        ) {
            findDOMNode(this).MaterialTextfield.checkValidity();
        }
        if(this.props.disabled !== prevProps.disabled) {
            findDOMNode(this).MaterialTextfield.checkDisabled();
        }
        if(this.props.value !== prevProps.value && this.refs.input !== document.activeElement) {
            findDOMNode(this).MaterialTextfield.change(this.props.value);
        }
        if(this.props.error && !this.props.pattern) {
            // At every re-render, mdl will set 'is-invalid' class according to the 'pattern' props validity
            // If we want to force the error display, we have to override mdl 'is-invalid' value.
            const elt = findDOMNode(this);
            elt.className = classNames(elt.className, 'is-invalid');
        }
    }

    render() {
        const { className, inputClassName, id,
              error, expandable, expandableIcon,
              floatingLabel, label, maxRows,
              rows, style, ...otherProps } = this.props;

        const hasRows = !!rows;
        const customId = id || `textfield-${label.replace(/[^a-z0-9]/gi, '')}`;
        const inputTag = hasRows || maxRows > 1 ? 'textarea' : 'input';

        const inputProps = {
            className: classNames('mdl-textfield__input', inputClassName),
            id: customId,
            rows,
            ref: 'input',
            ...otherProps
        };

        const input = React.createElement(inputTag, inputProps);
        const labelContainer = <label className="mdl-textfield__label" htmlFor={customId}>{label}</label>;
        const errorContainer = !!error && <span className="mdl-textfield__error">{error}</span>;

        const containerClasses = classNames('mdl-textfield mdl-js-textfield', {
            'mdl-textfield--floating-label': floatingLabel,
            'mdl-textfield--expandable': expandable
        }, className);

        return expandable ? (
            <div className={containerClasses} style={style}>
                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={customId}>
                    <i className="material-icons">{expandableIcon}</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                    {input}
                    {labelContainer}
                    {errorContainer}
                </div>
            </div>
        ) : (
            <div className={containerClasses} style={style}>
                {input}
                {labelContainer}
                {errorContainer}
            </div>
        );
    }
}

export default mdlUpgrade(Textfield);
