import React from 'react';

/**
 * @description describes a reuseable component that used for for form
 * validation
 *
 * @return { void }
 *
 * @param { props } props
 *
 * @function Input
 */
const Input = props => ({
  render() {
    return (
        <div className='form-group'>
            <input
              name={props.name}
              type={props.type}
              className={props.className}
              placeholder={props.placeholder}
              pattern={props.pattern}
              value={props.value}
              onChange={props.action}
              title={props.title}
              required
            />
        </div>
    );
  }
});
export default Input;
