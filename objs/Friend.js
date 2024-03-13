class FriendObj{
    #userName;
    #firstName;
    #lastName
    #friendshipTimestamp
    #profilePicture
    #birthday

    constructor(user){
        this.userName = user.getUsername();;
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.profilePicture = user.getProfilePicture();
        this.birthday = user.getBirthday();
        this.friendshipTimestamp = 0;
    }


    // this might not be called much, but if the user changes their first name, we will need to call this function on each users friend object
    setFirstName(name){
        this.#firstName = name;
    }

    getFirstName(){
        return this.#firstName;
    }

    // I don't think we will be changing user names
    getUsername(){
        return this.#userName;
    }

    setLastName(name){
        this.#lastName = name;
    }

    getLastName(){
        return this.#lastName;
    }

    setProfilePicture(picture){
        this.#profilePicture = picture;
    }

    getProfilePicture(){
        return this.#profilePicture;
    }

    setBirthday(date){
        this.#birthday = date;
    }

    getBirthday(){
        return this.#birthday;
    }

    // maybe we just increment this every month?
    setFriendshipTimestamp(time){
        this.#friendshipTimestamp = time;
    }

    getFriendshipTimestamp(){
        return this.#friendshipTimestamp;
    }
}
