class User{
    #userName;
    #firstName;
    #lastName;
    #email;
    #friendsList;
    #location;
    #createdTimestamp;
    #profilePicture;
    #birthday;

	getUserName() {
		return this.#userName;
	}

	set userName(userName) {
        this.#userName = userName;
    }

	getFirstName() {
		return this.#firstName;
	}

	set FirstName(firstName) {
		this.#firstName = firstName;
	}

	getLastName() {
		return this.#lastName;
	}

	set LastName(lastName) {
		this.#lastName = lastName;
	}

	getEmail() {
		return this.#email;
	}

	set Email(email) {
		this.#email = email;
	}

	getFriendsList() {
		return this.#friendsList;
	}

	set FriendsList(friendsList) {
		this.#friendsList = friendsList;
	}

	getLocation() {
		return this.#location;
	}

	set Location(location) {
		this.#location = location;
	}

	getCreatedTimestamp() {
		return this.#createdTimestamp;
	}

	set CreatedTimestamp(createdTimestamp) {
		this.#createdTimestamp = createdTimestamp;
	}

	getProfilePicture() {
		return this.#profilePicture;
	}

	set ProfilePicture(profilePicture) {
		this.#profilePicture = profilePicture;
	}

	getBirthday() {
		return this.#birthday;
	}

	set Birthday(birthday) {
		this.#birthday = birthday;
	}



    constructor(userName, firstName){
        this.#userName = userName;
		this.#firstName = firstName;
        this.#friendsList;
        this.#email;
        this.#location;
        this.#createdTimestamp;
        this.#profilePicture = null;
        this.#birthday;

    }
}
module.exports = User;
const user = new User()