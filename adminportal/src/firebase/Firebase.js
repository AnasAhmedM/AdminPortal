import firebase from 'firebase'
const firebaseConfig = require('./config.json')

if (!firebase.apps.length) 
    firebase.initializeApp(firebaseConfig)
else 
    firebase.app()
 
const auth = firebase.auth()
export { auth };
