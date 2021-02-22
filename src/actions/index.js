export const setUsername = (username) => {
  return {
    type : "SET_USERNAME",
    text : username,
  };
};

export const setLogStatus = (logStatus) => {
  return {
    type : "SET_LOG",
    logStatus : logStatus,
  };
};

export const setUserId = (id) => {
  return {
    type : "SET_UID",
    id : id,
  };
};
