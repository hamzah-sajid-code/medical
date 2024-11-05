function addUser() {
    namel = document.getElementById('name').value;
    passwordl = document.getElementById('password').value;
    firebase.database().ref("/Accounts").on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                if (message_data['name'] == namel && message_data['password'] == passwordl) {
                    var user_name = document.getElementById('name').value;
                    localStorage.setItem('I-Chat Username', user_name);
                    localStorage.setItem("status", "VChatLoggedIn");
                    window.location = 'kwitter_room.html';
                } else {
                    document.getElementById('allLogin').innerHTML = 'Cannot Find This Username or Password';
                }
                //End code
            }
        });
    });
}

function reg() {
    window.location = 'register.html';
}


if (localStorage.getItem('status') == 'VChatLoggedIn') {
    //redirect to page
    window.location = 'kwitter_room.html';
} else if (localStorage.getItem('status') == 'VChatLoggedIn') {
    console.log("Is Login : False");
}