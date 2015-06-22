module.exports = {
  fns: [],
  on: function(name, fn) {
    this.fns.push({name: name, fn: fn});
  },
  off: function(name) {
    this.fns = this.fns.filter(function(row) {
      return name === row.name;
    });
  },
  broadcast: function(name) {
    this.fns.forEach(function(row) {
      if (row.name === name) {
        row.fn();
      }
    });
  }
};
