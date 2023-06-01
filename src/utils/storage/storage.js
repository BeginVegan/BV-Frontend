const Storage = {
  getItem: key => {
    localStorage.getItem(key);
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
};

export default Storage;