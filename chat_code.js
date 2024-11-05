roomid = localStorage.getItem('whichredirect').split('_').join(' ');
usernamesa = localStorage.getItem('I-Chat Username')
console.log(roomid)
console.log(usernamesa)
var message = '';

var synth = window.speechSynthesis;


function speak(text) {

  speak_data = text.split('_').join(' ');
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}
console.log("hi")
firebase.database().ref('/chat/').on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    childKey = childSnapshot.key;
    childData = childSnapshot.val();
    if (childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      //Start code
      console.log(firebase_message_id)
      console.log(message_data["Room Creator"])
      if (message_data["Room Creator"] != localStorage.getItem('I-Chat Username')) {
        document.getElementById("delBtn").style.display = "none"
      }
      if (message_data["Room Creator"] == localStorage.getItem('I-Chat Username')) {
        document.getElementById("delBtn").style.display = "inline-block"
      }
      //End code
    }
  });
});

function getData() {
  firebase.database().ref('/' + roomid + '/').on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        type = message_data
        // start

        if (name == usernamesa) {
          if (message_data['type'] == 'Msg') {
            replaceURLWithHTMLLinks(message)
            // <span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button>
            name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4' style='word-wrap: break-word;'>" + message + "</h4>";
            like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
            span_with_tag = "<button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button>";
            span_with_tag2 = "<button class='btn btn-success' id=" + message.split(' ').join('_') + " onclick='speak(this.id)'>Speak Aloud</button><hr><br>";
            row = name_with_tag + message_with_tag + span_with_tag + span_with_tag2;
            console.log('Msg')
            document.getElementById("output").innerHTML += row;
          } else if (message_data['type'] == 'Img') {
            document.getElementById("output").innerHTML += "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>" + '<img src=' + message_data['dataUriOfImage'] + ' class="img-responsive" height="200px" width="200px"><button class="btn btn-danger" id=' + firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';
            console.log('Img')
          } else if (message_data['type'] == 'Vid') {
            document.getElementById("output").innerHTML += "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>" + '<video src=' + message_data['dataUriOfVideo'] + ' class="img-responsive" height="400px" width="500px" controls></video><button class="btn btn-danger" id=' + firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';

          } else if (message_data['type'] == 'Aud') {
            document.getElementById("output").innerHTML += "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>" + "<audio controls><source src=" + message_data['dataUriOfAudio'] + "></audio><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button><hr><br><br>";

          } else if (message_data['type'] == 'file') {
            url1 = 'https://firebasestorage.googleapis.com/v0/b/i-chat-database.appspot.com/o/';
            url2 = '?alt=media';
            mainUrl = url1 + message_data['fileUrl'].split(' ').join('%20') + url2;
            console.log(message_data["fileUrl"])
            if (message_data['fileUrl'].includes('pdf')) {
              console.log(mainUrl)
              document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>" + "<embed src=" + mainUrl + " width='750' height='1000'><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletetfile(this.id)'>Delete</button><hr><br><br>";
            } else {
              slug = message_data['fileUrl'].split('.').pop();
              slug2 = message_data['fileUrl'].split('-').pop();
              console.log(slug2)
              str2 = slug.charAt(0).toUpperCase() + slug.slice(1);
              var fileName = message_data['fileName'].charAt(0).toUpperCase() + message_data['fileName'].slice(1);
              console.log(fileName)
              document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4>Download Button of your " + fileName + " file:<a href=" + mainUrl + "><button class='btn btn-info'><img src='download.svg'></img> Download</button></a><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletetfile(this.id)'>Delete</button></h4><hr><br><br>";

            }

          }
        }

        if (name != usernamesa) {
          // start
          if (message_data['type'] == 'Msg') {

            replaceURLWithHTMLLinks(message)
            // <span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button>
            name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4' style='word-wrap: break-word;'>" + message + "</h4>";
            like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
            span_with_tag2 = "<button class='btn btn-success' id=" + message.split(' ').join('_') + " onclick='speak(this.id)'>Speak Aloud</button><hr><br>";
            row = name_with_tag + message_with_tag + span_with_tag2;
            console.log('Msg')
            document.getElementById("output").innerHTML += row;
          } else if (message_data['type'] == 'Img') {
            document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>" + '<img src=' + message_data['dataUriOfImage'] + ' class="img-responsive" height="200px" width="200px"><button class="btn btn-danger" id=' + firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';
            console.log('Img')
          } else if (message_data['type'] == 'Vid') {
            document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>" + '<video src=' + message_data['dataUriOfVideo'] + ' class="img-responsive" height="400px" width="500px" controls><button class="btn btn-danger" id=' + firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';

          } else if (message_data['type'] == 'Aud') {
            document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>" + "<audio controls><source src=" + message_data['dataUriOfAudio'] + "></audio><hr><br><br>";

          } else if (message_data['type'] == 'file') {
            url1 = 'https://firebasestorage.googleapis.com/v0/b/i-chat-database.appspot.com/o/';
            url2 = '?alt=media';
            mainUrl = url1 + message_data['fileUrl'].split(' ').join('%20') + url2;
            console.log(message_data)
            if (message_data['fileUrl'].includes('pdf')) {
              console.log(mainUrl)
              document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>" + "<embed src=" + mainUrl + " width='750' height='1000'><hr><br><br>";
            } else {
              slug = message_data['fileUrl'].split('.').pop();
              slug2 = message_data['fileUrl'].split('-').pop();
              console.log(slug2)
              str2 = slug.charAt(0).toUpperCase() + slug.slice(1);
              var fileName = message_data['fileName'].charAt(0).toUpperCase() + message_data['fileName'].slice(1);
              console.log(fileName)
              document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4>Download Button of your " + fileName + " file:<a href=" + mainUrl + "><button class='btn btn-info'><img src='download.svg'></img> Download</button></a></h4><hr><br><br>";

            }

          }

        }

        // end
        window.scrollTo(0, document.body.scrollHeight);
        if (localStorage.getItem('TingOnOff') == 'Off') {
          console.log('No Sound')
        } else if (localStorage.getItem('TingOnOff') == 'On') {
          document.getElementById('ting12').play();

        }
        //End code
      }
    });
  });
}
getData();

function replaceURLWithHTMLLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  message = text.replace(exp, "<a href='$1' target='blank'>$1</a>");
  console.log(text)
}

function send() {
  messageval = document.getElementById('msg').value;
  if (messageval != "") {
    console.log('Nop !!!')
    document.getElementById('msg').value = "";
    firebase.database().ref(roomid).child('/').push({
      name: usernamesa,
      message: messageval,
      like: 0,
      type: 'Msg'
    });
  }
}

function logout() {
  localStorage.removeItem('I-Chat Username')
  localStorage.setItem("status", 'NotVChatLoggedIn');
  window.location = 'index.html';
}

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(roomid).child(message_id).update({
    like: updated_likes
  });

}

function deletet(message_idd) {
  console.log(w1);
  console.log(message_idd);
  var result = confirm("Want to delete?");
  if (result == true) {
    console.log(result)
    var w1 = localStorage.getItem('whichredirect').replace('_', ' ');
    console.log(w1);
    firebase.database().ref('/' + w1 + '/' + message_idd + '/').remove();
  } else if (result == false) {}
  console.log(result);

}

function deletetfile(message_idd) {

  var result = confirm("Want to delete?");

  if (result == true) {
    if (result == true) {
      var w1 = localStorage.getItem('whichredirect').replace('_', '');
      console.log(w1);
      firebase.database().ref('/' + w1 + '/' + message_idd).remove();
    } else if (result == false) {}

  }
}

function back() {
  window.location = 'kwitter_room.html';
}
document.getElementById('roomname').innerHTML = "#" + roomid;
window.addEventListener('keydown', ejd)

function ejd(e) {
  key = e.keyCode;
  console.log(key)
  if (key == '13') {
    console.log('Enter Pressed');
    send();
  }
}

// Image get it

function encodeImageFileAsURL(element) {
  console.log(element);
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    if (reader.result.includes('data:video')) {
      console.log('RESULT', reader.result)
      firebase.database().ref('/' + roomid + '/').push({
        dataUriOfVideo: reader.result,
        type: 'Vid',
        name: usernamesa

      });

    } else if (reader.result.includes('data:image')) {
      console.log('RESULT', reader.result)
      firebase.database().ref('/' + roomid + '/').push({
        dataUriOfImage: reader.result,
        type: 'Img',
        name: usernamesa

      });
    } else if (reader.result.includes('data:audio')) {
      console.log('RESULT', reader.result)
      firebase.database().ref('/' + roomid + '/').push({
        dataUriOfAudio: reader.result,
        type: 'Aud',
        name: usernamesa

      });
    }
  }
  reader.readAsDataURL(file);
}

// Get File

function getFile() {
  file = document.getElementById("myFile").files[0];

  name1 = +new Date() + "-" + file.name;

  const ref = firebase.storage().ref();
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name1).put(file, metadata);
  firebase.database().ref('/' + roomid + '/').push({
    fileUrl: name1,
    type: 'file',
    name: usernamesa,
    fileName: file['name']
  });
  setTimeout(() => {location.reload(true);}, 1000);
}
firebase.database().ref('/OnlineorOfflineStatus' + roomid + '/').on('value', function (snapshot) {
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

firebase.database().ref('/OnlineorOfflineStatus' + roomid + '/' + localStorage.getItem('I-Chat Username') + '/').update({
  Username: localStorage.getItem('I-Chat Username'),
  Online: 'True',
  Offline: 'False'

});
firebase.database().ref('/OnlineorOfflineStatus' + roomid + '/null').remove();
window.onbeforeunload = function () {
  firebase.database().ref('/OnlineorOfflineStatus' + roomid + '/' + localStorage.getItem('I-Chat Username') + '/').update({
    Username: localStorage.getItem('I-Chat Username'),
    Online: 'False',
    Offline: 'True'

  });
};

function offandonting() {
  getSelectedCheckboxValues('tingsss')
}

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  if (values[0] == null) {
    console.log('Off')
    localStorage.setItem('TingOnOff', 'Off')
  } else {
    console.log('On')
    localStorage.setItem("TingOnOff", "On");


  }
}
var tingsssval = document.getElementById('tingsss');

if (localStorage.getItem('TingOnOff') == 'Off') {
  console.log('No Sound')
  tingsssval.checked = false;
} else if (localStorage.getItem('TingOnOff') == 'On') {
  console.log('Sound')
  tingsssval.checked = true;
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function delRoome() {
  var r = confirm("Do you really want to delete this room");
  if (r == true) {
    firebase.database().ref('/chat/' + localStorage.getItem("whichredirect") + '/').remove()
    firebase.database().ref("/" + localStorage.getItem("whichredirect") + '/').remove()
    firebase.database().ref("/OnlineorOfflineStatus/" + localStorage.getItem("whichredirect") + '/').remove()
    window.location = 'kwitter_room.html'
  } else {
    console.log('ok u r lol')
  }
}