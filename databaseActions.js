import * as firebase from 'firebase';

export const storeUserData = (cluster, data) => {
  const user = firebase.auth().currentUser.uid;
  const clusterRef = firebase.database().ref(cluster + "/" + user);
  for (const [key, value] of Object.entries(data)) {
    clusterRef.child(key).set(value), function (error) {
      if (error) {
        alert("error")
      } else {
        alert("Sucess!")
      }
    };
  }
}

export const storeStreakData = (cluster, data) => {
  const user = firebase.auth().currentUser.uid;
  let sucess = false;
  const clusterRef = firebase.database().ref(cluster + "/" + user);
  const addNewRef = clusterRef.push();
  for (const [key, value] of Object.entries(data)) {
    addNewRef.child(key).set(value, function (error) {
      if (error) {
        alert(error);
      } else {
        sucess = true;
      }
    });
  }
}

//Subscribe to all streaks @ logged in user, runs whenever there is new data
export const subToStreakData = (callback) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/streaks/' + user);
  db.on('value', function (snapshot) {
    callback(snapshot.val());
  });
}

//Subscribe to the current users data
export const subToUserData = (callback) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/users/' + user);
  db.on('value', function (snapshot) {
    callback(snapshot.val());
  });
}


//Function to get streak counter data and add one
export const addOneToCounter = (streakId) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/streaks/' + user + "/" + streakId);
  return db
    .once("value")
    .then(function (ref) {
      const counter = ref.val().counter;
      return {
        counter: counter + 1,
        lastUpdate: Date.now()
      }
    }).then(function (data) {
      db.update(data)
    })
}


//Substracts one from the counter
export const minusOneFromCounter = (streakId) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/streaks/' + user + "/" + streakId);
  return db
    .once("value")
    .then(function (ref) {
      const counter = ref.val().counter;
      return {
        counter: counter - 1,
        lastUpdate: Date.now()
      }
    }).then(function (data) {
      db.update(data)
    })
}

export const updateCounter = (streakId) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/streaks/' + user + "/" + streakId);
  return db.update({
    counter: 0
  }  
  )
}

//Delete a Streak from the db with given streakId
export const deleteOneStreak = (streakId) => {
  const user = firebase.auth().currentUser.uid;
  const db = firebase.database().ref('/streaks/' + user + "/" + streakId);
  db.remove(function (error) {
    if (error) {
      alert(error);
    } else {
      console.log("sucess")
    }
  });
}