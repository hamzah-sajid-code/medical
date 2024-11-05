namee = localStorage.getItem('I-Chat Username');
var ppN = document.getElementById('pp').value;
console.log(ppN)
var fns = '';
var roomnameoffriendtalk = [];
document.getElementById('name').innerHTML = namee;
var gotFriendToAccept = '';

function logout() {
      localStorage.removeItem('I-Chat Username')
      localStorage.setItem("status", 'NotVChatLoggedIn');
      window.location = 'index.html';
}

function addRoom() {
      var ppN = document.getElementById('pp').value;
      console.log(ppN)
      if (ppN == 'public') {
            romnum = 1;
            roomname = document.getElementById('id_room').value;
            localStorage.setItem('roomname', roomname);
            firebase.database().ref('/chat').child(roomname).update({
                  'Room Name': roomname,
                  "Room Creator": namee
            });
      } else if (ppN == 'private') {

            pus = document.getElementById('pusa').value;
            if (pus == '') {
                  alert('Put a password')
                  console.log('Put pass')
            } else {
                  console.log('This is private room')
                  roomname = document.getElementById('id_room').value;
                  usernumm = localStorage.getItem('I-Chat Username')
                  localStorage.setItem(roomname, roomname);
                  firebase.database().ref('/pass').child(roomname).update({
                        'Room Name': roomname,
                        "Room Creator": namee
                  });
                  console.log('This is private room')
                  roomname = document.getElementById('id_room').value;

                  usernumm = localStorage.getItem('I-Chat Username')
                  localStorage.setItem(roomname, roomname);
                  firebase.database().ref('/pus').child(roomname).update({
                        'Password': pus
                  });
                  console.log('ok')

            }

      }
      document.getElementById('pusa').value = "";
      document.getElementById('id_room').value = "";
}

function getData() {
      firebase.database().ref("/chat").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names)
                  roomnamewithhash = "#" + Room_names;
                  outputthing = "<div id=" + Room_names.split(' ').join('_') + " onclick='redirectToRoomname(this.id)'>" + roomnamewithhash + "</div><hr>"
                  document.getElementById('output').innerHTML += outputthing;

                  //End code
            });
      });
      firebase.database().ref("/pass").on('value', function (snapshot) {
            document.getElementById("out2").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code

                  console.log(Room_names)
                  roomnamewithhash1 = "#" + Room_names;
                  outputthing1 = "<div id=" + Room_names.split(' ').join('_') + " onclick='redirectToRoomnamepass(this.id)'>" + roomnamewithhash1 + "</div><hr>"
                  document.getElementById('out2').innerHTML += outputthing1;

                  //End code
            });
      });
}

function redirectToRoomname(room_name_functio) {
      room_name_functio.split('_').join(' ')
      localStorage.setItem('whichredirect', room_name_functio)
      window.location = 'kwitter_page.html';
}

function redirectToRoomnamepass(room_name_functio) {
      room_name_functio = room_name_functio.split("_").join(" ")
      console.log(room_name_functio)
      poss = prompt("What's the room password:");
      firebase.database().ref("/pus/" + room_name_functio).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data)
                        if (poss == message_data) {
                              localStorage.setItem('whichredirect', room_name_functio)
                              console.log('Yes')
                              window.location = 'kwitter_page.html';
                        } else {
                              alert('Wrong password')
                              window.location = 'kwitter_room.html';
                        }
                  }
            });
      });
}
getData();
document.getElementById('pp').addEventListener('change', run)

function run() {
      fn = document.getElementById('pp').value;
      console.log(fn)
      if (fn == 'public') {
            document.getElementById('pusa').style.display = 'none'
      } else if (fn == 'private') {
            document.getElementById('pusa').style.display = 'inline-block'
      }
}

function sendFriendRequest() {
      fn = document.getElementById('firendName').value;
      firebase.database().ref("/Accounts/").on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data)
                        if (fn != message_data['name']) {
                              console.log('No Account Found');
                        } else if (fn == namee) {
                              console.log('You cannot send friend request to yourself')
                        } else {
                              firebase.database().ref('/' + fn + 'Friend/' + namee + '/').update({
                                    isFriend: 'false',
                                    showAsFriend: 'false',
                                    sender: namee
                              });
                              firebase.database().ref('/' + namee + '/' + fn).update({
                                    friendName: fn,
                                    declineoraccept: 'notnow'
                              });
                        }
                  }
            });
      });
      document.getElementById('firendName').value = '';
}
// console.log(fnS)


function getYourFriendsRequests() {
      fn = document.getElementById('firendName').value;
      firebase.database().ref('/' + namee + 'Friend/').on('value', function (snapshot) {
            document.getElementById("firendoutputreq").innerHTML = "";
            document.getElementById("firendoutput").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data)
                        console.log(firebase_message_id)
                        if (message_data['isFriend'] == 'True') {
                              roomnamewithhash = "#" + firebase_message_id;
                              outputthing = "<div id=" + firebase_message_id.split(' ').join('_') + " onclick='redirectToFriendChat(this.id)'>" + firebase_message_id + "</div><hr>"
                              document.getElementById('firendoutput').innerHTML += outputthing;
                        } else if (message_data['isFriend'] == 'false') {
                              // console.log(myid)
                              message_with_tag = "<h4 class='message_h4' style='word-wrap: break-word;'>" + firebase_message_id + "</h4>";
                              accept_button = "<button class='btn btn-success' onclick='acceptFriend(this.id)' id='" + firebase_message_id + "'>Accept</button>";
                              decline_button = "<button class='btn btn-danger' id='" + firebase_message_id + "' onclick='notAcceptFriend(this.id)'>Decline</button>";
                              span_with_tag = "<hr><br>";
                              fns = firebase_message_id;
                              row = message_with_tag + accept_button + decline_button + span_with_tag;
                              console.log('Msg')
                              document.getElementById("firendoutputreq").innerHTML += row;

                        }

                  }
            });
      });
}

function acceptFriend(friendName) {
      genrateId = '_' + Math.random().toString(36).substr(2, 9);
      firebase.database().ref('/' + namee + 'Friend/' + friendName).remove();
      console.log('Accepted ' + friendName);
      firebase.database().ref('/chatFriends/' + genrateId + '/').update({
            FriendNames: namee + ' and ' + friendName
      });
      firebase.database().ref('/' + namee + 'Friends/' + friendName).update({
            Friend: 'True',
            FriendChatRoomId: genrateId
      });
      firebase.database().ref('/' + friendName + 'Friends/' + namee).update({
            Friend: 'True',
            FriendChatRoomId: genrateId
      });
      firebase.database().ref('/' + genrateId + '/').child('tester').push({
            chat: 'HI'
      });
      firebase.database().ref('/' + friendName + '/' + namee + '/').update({
            declineoraccept: 'accepted'
      });
}

function notAcceptFriend(friendName) {
      firebase.database().ref('/' + friendName + '/' + namee + '/').update({
            declineoraccept: 'decline'
      });

}

firebase.database().ref('/' + namee + '/').on('value', function (snapshot) {
      document.getElementById("firendouturputreq").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;
                  console.log(message_data)
                  console.log(firebase_message_id)
                  if (message_data['declineoraccept'] == "notnow") {
                        firendOut = '<div>Ongoing Friend Request To ' + message_data['friendName'] + '</div><hr>';
                        document.getElementById('firendouturputreq').innerHTML += firendOut;
                  }
                  if (message_data['declineoraccept'] == "decline") {
                        firendOut = '<div>Your Friend Request To ' + message_data['friendName'] + ' is Declined</div><hr>';
                        document.getElementById('firendouturputreq').innerHTML += firendOut;
                        firebase.database().ref('/' + namee + 'urdeclinedfriendrequest/').push({
                              diclined: 'decline',
                              name: fn
                        });
                        firebase.database().ref('/' + fn + 'Friend/' + namee).remove()
                        firebase.database().ref('/' + namee + '/' + fn).remove()
                  }
            }
      });
});
firebase.database().ref("/" + namee + 'urdeclinedfriendrequest/').on('value', function (snapshot) {
      document.getElementById("friendreqhis").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;
                  //Start code
                  firendOut = '<div>' + message_data['name'] + ' Declined Your Friend Request</div><hr>';
                  document.getElementById('friendreqhis').innerHTML += firendOut;

                  //End code
            }
      });
});

function getFriendData() {

      firebase.database().ref('/' + namee + 'Friends/').on('value', function (snapshot) {
            // document.getElementById("firendoutputreq").innerHTML = "";
            document.getElementById("firendoutput").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data)
                        console.log(firebase_message_id)
                        console.log(message_data['Friend'])
                        if (message_data['Friend'] == 'True') {
                              firendOut = '<div id=' + firebase_message_id.split(' ').join('_') + '.' + message_data['FriendChatRoomId'] + ' onclick="redirectToFriendChat(this.id)">' + firebase_message_id + '</div><hr>';
                              document.getElementById('firendoutput').innerHTML += firendOut;

                              friendName = firebase_message_id;
                              roomnameoffriendtalk = message_data;
                        }
                  }
            });
      });
}

function redirectToFriendChat(id) {
      editval1 = id.split('_').join(' ').substring(id.indexOf("."));
      editval2 = editval1.split('. ').join('');
      localStorage.setItem('friendNameRedirect', id.substring(0, id.indexOf('.')).split('_').join(' '));
      localStorage.setItem('whichredirect', editval2)
      window.location = 'friend.html';
}
getYourFriendsRequests();
getFriendData();


firebase.database().ref('/OnlineorOfflineStatus' + "lobby" + '/').on('value', function (snapshot) {
      document.getElementById("output2").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;
                  //Start code
                  console.log(firebase_message_id)
                  console.log(message_data)
                  nameofuser = message_data['Username'];
                  if (message_data['Online'] == 'False') {
                        document.getElementById('output2').innerHTML += '<h3>' + nameofuser + ' is <span style="height: 15px;width: 15px;background-color: red;border-radius: 50%;display: inline-block;"></span> Offline</h4>'
                  } else if (message_data['Online'] == 'True') {
                        document.getElementById('output2').innerHTML += '<h3>' + nameofuser + ' is <span style="height: 15px;width: 15px;background-color: lime;border-radius: 50%;display: inline-block;"></span> Online</h4>'

                  }
                  //End code
            }
      });
});

firebase.database().ref('/OnlineorOfflineStatus' + "lobby" + '/' + localStorage.getItem('I-Chat Username') + '/').update({
      Username: localStorage.getItem('I-Chat Username'),
      Online: 'True',
      Offline: 'False'

});
firebase.database().ref('/OnlineorOfflineStatus' + "lobby" + '/null').remove();
window.onbeforeunload = function () {
      firebase.database().ref('/OnlineorOfflineStatus' + "lobby" + '/' + localStorage.getItem('I-Chat Username') + '/').update({
            Username: localStorage.getItem('I-Chat Username'),
            Online: 'False',
            Offline: 'True'

      });
};

function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
}

firebase.database().ref("/Accounts").on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;

                  //Start code
                  if (message_data['name'] == namee) {
                        if (message_data['type'] == 'God') {
                              localStorage.setItem("AccountType", "God")
                        }
                        if (message_data['type'] == 'Normal') {
                              localStorage.setItem("AccountType", "Normal")
                        }
                        console.log(message_data["type"]);
                  }
                  //End code
            }
      });
});