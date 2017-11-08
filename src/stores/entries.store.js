import { observable, action, computed, runInAction } from 'mobx';
const uuidv1 = require('uuid/v1');

class EntriesStore {

  @observable _entries = [];

  @computed get entries() {
    return (this._entries || []).map(el => {
      el.uid = uuidv1();

      return el;
    });
  }

  set entries(data) {
    return this._entries = data;
  }

  propertiesToObject(properties, entriesLength) {
    return properties.reduce((intial, currentValue) => {
      currentValue.name === 'id'
        ? intial.id = entriesLength + 1
        : intial[currentValue.name] = null;
      return intial;
    }, {});
  }

  @action entryUpdate(value, propName, index) {
    runInAction("entryItem updating", () => {
      this.entries = this.entries.map((entry, i) => {
        if (i === index) {
          entry[propName] = value;
        }
        return entry;
      });
    });
  }

  @action addEmptyEntry(properties) {
    runInAction("adding new entryItem", () => {
      this.entries = [
        ...this.entries,
        this.propertiesToObject(properties, this.entries.length),
      ];
    });
  }

  @action dropEntry(index) {
    runInAction("adding new entryItem", () => {
      this.entries = this.entries.filter((el, i) => i !== index);
    });
  }

  @action resetEntries() {
    runInAction('resetting entries', () => {
      this.entries = [];
    });
  }
}

export default EntriesStore;
