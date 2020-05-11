import * as firebase from 'firebase';

 export const storeUserData = (cluster, name, test) => {
    const user = firebase.auth().currentUser.uid; 
    firebase.database().ref(cluster + "/" + user).set({
        name: name,
        test: test
      }, function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      });
    }

  export const storeHabitData = (cluster, data) => {
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