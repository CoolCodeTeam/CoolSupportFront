import BaseComponent from "../baseComponent";
const containerTemplate = require('./PrimaryContainer/container.pug');

import './PrimaryContainer/bemPrimaryContainer/bem-primary-container.css';
import './PrimaryContainer/bemPrimaryContainer/bemColumn/bem-column.css';

class BasicsComponent extends BaseComponent {

	render() {
		return `${containerTemplate(this._data)}`;
	}
}

export default BasicsComponent;