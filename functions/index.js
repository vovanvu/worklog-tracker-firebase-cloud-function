const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//Get trigger when a user signs in for the first time using a federated identity provider.
exports.addAccount = functions.auth.user().onCreate(user => {
    var id = user.uid;
    var displayName = user.displayName;
    var db = admin.database();
    var refUser = db.ref("user");
    var refRecord = db.ref("record");
    var newUser = {};
    newUser[id] = {
        id: '',
        name: displayName,
        employee: '',
        permission: ''
    }
    var newUserRecord = {};
    newUserRecord[id] = "";
    refUser.update(newUser);
    refRecord.update(newUserRecord);
});