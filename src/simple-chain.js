const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    if (value === undefined) {
      this.chain.push('(  )');
    } else {
      this.chain.push(`( ${String(value)} )`);
    }
    return this; // Return this to allow chaining
  },

  removeLink(position) {
    if (!Number.isInteger(position) || position <= 0 || position > this.chain.length) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  
  reverseChain() {
    this.chain.reverse();
    return this; // Return this to allow chaining
  },

  finishChain() {
    const result = this.chain.join('~~');
    this.chain = []; // Reset the chain after finishing
    return result;
  }
};

module.exports = {
  chainMaker
};
