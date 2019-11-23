import ChatsColumnComponent from "../components/ChatsColumn/ChatsColumnComponent";
import ChatComponent from "../components/ChatBlock/ChatComponent";

class ComponentsStorage {
	constructor(leftColumn = null, mainPage = null, chatBlock = null, typingBl, rightColumn = null, profileBlock = null) {
		if (ComponentsStorage.__instance) {
			return ComponentsStorage.__instance;
		}

		this.mainPage = mainPage;
		this.leftColumn = leftColumn;
		this.rightColumn = rightColumn;
		this.chatBlock = chatBlock;
		this.profileBlock = profileBlock;

		ComponentsStorage.__instance = this;
	}
	clear() {
		this.mainPage = null;
		this.leftColumn = null;
		this.rightColumn = null;
		this.chatBlock = null;
		this.profileBlock = null;
	}

	setRightColumn(rightColumn) {
		this.rightColumn = rightColumn;
	}

	getMainPage() {
		return this.mainPage;
	}

	setMainPageColumn(mainPage) {
		this.mainPage = mainPage;
	}

	getRightColumn() {
		return this.rightColumn;
	}

	setLeftColumn(leftColumn) {
		try {
			if (leftColumn instanceof ChatsColumnComponent) {
				this.leftColumn = leftColumn;
			} else{
				throw new Error('Can\'t set leftColumn component');
			}
		} catch (error) {
			console.log(error);
		}

	}

	getLeftColumn() {
		return this.leftColumn;
	}

	setChatBlock(chatBlock) {
		try {
			if (chatBlock instanceof ChatComponent ||
				chatBlock instanceof ChannelComponent) {
				this.chatBlock = chatBlock;
			} else{
				throw new Error('Can\'t set chatBlock component');
			}
			this.setRightColumn(chatBlock);
		} catch (error) {
			console.log(error);
		}

	}

	getChatBlock() {
		return this.chatBlock;
	}

	setProfileBlock(profileBlock) {
		try {
			if (profileBlock instanceof ProfilePageComponent) {
				this.profileBlock = profileBlock;
			} else{
				throw new Error('Can\'t set profilePage component');
			}
			this.setRightColumn(profileBlock);
		} catch (error) {
			console.log(error);
		}

	}

	getProfileBlock() {
		return this.profileBlock;
	}
}

export default ComponentsStorage;