const hbsHelper = {
  lengthOfList: (list = []) => {
    return list.length;
  },
  eq: (val1, val2) => {
    return val1 === val2;
  },
  dateString: (isoString) => {
    return new Date(isoString).toLocaleDateString();
  },
};

module.exports = { hbsHelper };
