import * as firebase from 'firebase';

    export const storeUserData = (cluster, data) => {
      const user = firebase.auth().currentUser.uid; 
      const clusterRef = firebase.database().ref(cluster + "/" + user);
      for (const [key, value] of Object.entries(data)) {
          clusterRef.child(key).set(value), function(error) {
              if(error) {
                  alert(error);
              } else {
                  alert("Sucess!")
              }
          };
      }
    }

  export const storeStreakData = (cluster, data) => {
    const user = firebase.auth().currentUser.uid; 
    const clusterRef = firebase.database().ref(cluster + "/" + user);
    const addNewRef = clusterRef.push();
    for (const [key, value] of Object.entries(data)) {
        addNewRef.child(key).set(value), function(error) {
            if(error) {
                alert(error);
            } else {
                alert("Sucess!")
            }
        };
    }
  }

  export const getStreakData = () => {
    const user = firebase.auth().currentUser.uid; 
    const db = firebase.database().ref('/streaks/' + user);
    return db
    .once("value")
    .then(function(ref){
      return ref.val()
    })
  }  

export const addOneToCounter = (streakId) => {
  const user = firebase.auth().currentUser.uid; 
  const db = firebase.database().ref('/streaks/' + user + "/" + streakId);
  return db
  .once("value")
  .then(function(ref){
    const counter = ref.val().counter;
    return {
      counter: counter + 1,
      lastUpdate: Date.now()
    }
  }).then(function(data) {
    db.update(data)
  })
}