const validStringLength = (userName, groupName) => {
  if (userName.length >= 1 && groupName.length >= 1) {
    return true;
  }
  return null;
};

const validStringContent = (userName, groupName) => {
  if (userName.match(/\W/) || groupName.match(/\W/)) {
    return false;
  }
  return true;
};


module.exports = {
  validStringLength,
  validStringContent,
};
