const Storage = {
  getJsonItem: key => {
    return JSON.parse(localStorage.getItem(key));
  },

  setJsonItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem: key => {
    return localStorage.getItem(key);
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },

  removeItem: key => {
    localStorage.removeItem(key);
  },
};

export default Storage;
