import React from 'react';


/**
 * @description describes a stateless component
 * that renders all the groups a user belongs to
 *
 * @return {jsx} jsx markup
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
