import { observable, action, computed, runInAction } from 'mobx';

class EntriesStore {

  @observable _entries = [];

  @computed get entries() {
    return this._entries || [];
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
    runInAction("entry updating", () => {
      this.entries = this.entries.map((entry, i) => {
        if (i === index) {
          entry[propName] = value;
        }
        return entry;
      });
    });
  }

  @action addEmptyEntry(properties) {
    runInAction("adding new entry", () => {
      this.entries = [
        ...this.entries,
        this.propertiesToObject(properties, this.entries.length),
      ];
    });
  }

  @action dropEntry(index) {
    runInAction("adding new entry", () => {
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
