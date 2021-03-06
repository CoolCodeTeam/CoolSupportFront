class BaseComponent {
    constructor(data, parent) {
        this._data = data;
        this._parent = parent;

    }
    get data() {
        return this._data;
    }

    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        this._parent = parent;
    }

    render() {
    }
}

export default BaseComponent;