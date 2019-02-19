import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
	/**
	 * Call the onChange function of the parent
	 */
	onChange: PropTypes.func,
	/**
	 * Call the onBlur function of the parent
	 */
	onBlur: PropTypes.func,
	/**
	 * Call the onFocus function of the parent
	 */
	onFocus: PropTypes.func,
	/**
	 * Allow only the letter and number to display in the input field
	 */
	onKeyPress: PropTypes.func,
	/**
	 * Parse the clipboard so there is only number and letter
	 */
	onPaste: PropTypes.func,
	/**
	 * Placeholder of the input field
	 */
	placeholder: PropTypes.string,
	/**
	 * Id of the input
	 */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * Name of the input
	 */
	name: PropTypes.string,
	/**
	 * Value of the input
	 */
	value: PropTypes.string,
	/**
	 * Reference of the input field
	 */
	alphaNumericRef: PropTypes.func,
	/**
	 * If the input is disabled
	 */
	disabled: PropTypes.bool,
	/**
	 * If the input is readonly
	 */
	readonly: PropTypes.bool,
	/**
	 * Max number of characters
	 */
	maxNumberOfCharacters: PropTypes.number,
};

const defaultProps = {
	className: '',
	onChange: () => { },
	onBlur: () => { },
	onFocus: () => { },
	onKeyPress: () => { },
	onPaste: () => { },
	placeholder: '',
	id: 'alphaNumericField',
	name: 'alphaNumericField',
	value: '',
	alphaNumericRef: () => { },
	disabled: false,
	readonly: false,
	maxNumberOfCharacters: Infinity,
};

const AlphaNumericBaoField = ({
	                           placeholder, onBlur, onKeyPress, onPaste, onFocus, className, onChange, value,
	                           id, alphaNumericRef, name, disabled, readonly, maxNumberOfCharacters,
                           }) => {
	function getForbiddenCharacters() {
		return /([^a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒA-Z'-])/g;
	}

	function onInputChange(event) {
		event.target.value = event.target.value.replace(getForbiddenCharacters(), '');
		const valueIsModified = event.target.value !== value;
		const valueIsShortEnough = event.target.value.length <= maxNumberOfCharacters;
		if (valueIsModified && valueIsShortEnough) {
			onChange(event);
		}
	}



	return (
		<input
			type="text"
			name={name}
			id={id}
			className={className}
			value={value}
			placeholder={placeholder}
			onKeyPress={event => onKeyPress(event)}
			onPaste={event => onPaste(event)}
			onChange={event => onInputChange(event)}
			onBlur={event => onBlur(event)}
			onFocus={event => onFocus(event)}
			ref={(inputRef) => { alphaNumericRef(inputRef); }}
			disabled={disabled}
			readOnly={readonly}
		/>
	);
};

AlphaNumericBaoField.defaultProps = defaultProps;
AlphaNumericBaoField.propTypes = propTypes;
export default AlphaNumericBaoField;
