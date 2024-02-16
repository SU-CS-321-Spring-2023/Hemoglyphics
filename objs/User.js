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

    setUserName(userName) {
		this.#userName = userName;
	}

	getFirstName() {
		return this.#firstName;
	}

	setFirstName(firstName) {
		this.#firstName = firstName;
	}

	getLastName() {
		return this.#lastName;
	}

	setLastName(lastName) {
		this.#lastName = lastName;
	}

	getEmail() {
		return this.#email;
	}

	setEmail(email) {
		this.#email = email;
	}

	getFriendsList() {
		return this.#friendsList;
	}

	setFriendsList(friendsList) {
		this.#friendsList = friendsList;
	}

	getLocation() {
		return this.#location;
	}

	Location(location) {
		this.#location = location;
	}

	getCreatedTimestamp() {
		return this.#createdTimestamp;
	}

	setCreatedTimestamp(createdTimestamp) {
		this.#createdTimestamp = createdTimestamp;
	}

	getProfilePicture() {
		return this.#profilePicture;
	}

	setProfilePicture(profilePicture) {
		this.#profilePicture = profilePicture;
	}

	getBirthday() {
		return this.#birthday;
	}

	setBirthday(birthday) {
		this.#birthday = birthday;
	}



    user(){
        this.#firstName;
        this.#userName;
        this.#lastName;
        this.#friendsList;
        this.#email;
        this.#location;
        this.#createdTimestamp;
        this.#profilePicture = null;
        this.#birthday;

    }
}