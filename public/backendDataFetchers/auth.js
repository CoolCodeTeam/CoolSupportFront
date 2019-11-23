import {bus, FetchModule, data} from "../main";
import {API} from "../constants/config";

async function checkLogin () {
	try {
		const response = await FetchModule._doGet(
			{path: API.auth}
		);
		switch (response.status) {
		case 401:
			bus.emit('setLoggedIn', null, false);
			break;
		case 200:
			const user = await response.json();
			data.setUser(user);
			break;
		default:
			throw new Error(
				`Could't check logged in status : ${response.status}`
			);
		}
	} catch (error) {
		console.error(error);
	}
}
export {checkLogin};