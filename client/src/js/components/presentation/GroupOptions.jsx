import React from 'react';


/**
 * @description describes a stateless component
 * that renders all groups of a user
 *
 * @return { void }
 *
 * @function GroupOptions
 */
const GroupOptions = () => ({
  render() {
    return (
            <option>
                {this.props.keyName.groupName}
            </option>
    );
  }
});

export default GroupOptions;
