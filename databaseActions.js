import * as firebase from 'firebase';

/*  export const storeUserData = (firstName, email, firstSignIn, deviceModel) => {
    const user = firebase.auth().currentUser.uid; 
    firebase.database().ref("users/" + user).set({
        firstName,
        email,
        firstSignIn,
        deviceModel
      }, function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      });
    } */

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
    var query = firebase.database().ref('streaks/' + user).orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
           console.log(childSnapshot.key);
        console.log(childSnapshot.val());
    
      });
    });
} 

