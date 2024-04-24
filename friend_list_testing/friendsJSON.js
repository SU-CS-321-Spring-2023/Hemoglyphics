const file = require('fs');
const args = process.argv;
const UID = args[2];

// Read the global user list
file.readFile('./data.json', 'utf8', (err, jsonData) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        // parse the data
        jsonData = JSON.parse(jsonData); 
        // iterate through the data
        for (let key in jsonData) {
            // if the UID of the search matches the entered UID
            if (key == UID) {
                // access the users friends list
                file.readFile('./currFriends.json', 'utf8', (err, friends) => {
                    if(err){
                        console.log(err);
                    }
                    try {
                        // parse the friends list
                        friends = JSON.parse(friends);
                        var isAdded = false;
                        for(let nKey in friends["friends"]){
                            // if the UID is already in the users friend list
                            if (nKey == UID){
                                console.log("friend already added")
                                isAdded = true;
                                return;
                            }
                        }    
                        if(!isAdded){
                            // create a new entry
                            friends["friends"][UID] = jsonData[key]; 
                            // stringify the users friends list with the addition of the new entry
                            const newAddition = JSON.stringify(friends);
                            // overwrite the old entry
                            file.writeFile("./currFriends.json", newAddition, 'utf-8', (err) => {
                                if (err) {
                                    console.error('Error writing to file:', err);
                                }
                                else {
                                    console.log(jsonData[key] + " has been added to the users friend list");
                                }
                                return;
                            })

                        }

                        
                    }
                    catch (error) {
                        console.error('Error parsing the users friends list: ', error)
                    }
                })
            } 
        }
    } catch (error) {
        console.error('Error parsing global user list:', error);
    }
});

