var express = require('express');
var app = module.exports = express();

var Firebase = require('firebase');

var FIREBASE_SECRET = 'Q5IIxZx6H3YrbERrnWpu0igqigyzuGwDjrY8a1c5';
var FIREBASE_URL = 'https://sharedcontact.firebaseio.com/contact';

function inTenYears() {
    var d = new Date();
    d.setFullYear( d.getFullYear() + 10 );
    return d.getTime() / 1000;
}

var firebase = new Firebase(FIREBASE_URL);

firebase.authWithCustomToken(FIREBASE_SECRET,function(error, authData) {
    if (error) {
        console.log("Authentication Failed!", error);
    } else {
        //console.log("Authenticated successfully with payload:", authData);
        console.log("Authenticated successfully with payload:");

        //init
        firebase.on('value', function(contactlist) {
            contacts = contactlist;
            initContactEvent(contactlist);
        });
        //add new a contact
        firebase.on('child_added', function(contact,prevChildKey) {
            newContactEvent(contact);
        });
        //update a contact
        firebase.on('child_changed', function (contact) {
            updateContactEvent(contact);
        });

        //remove a contact
        firebase.on('child_removed', function(contact) {
            removeContactEvent(contact);
        });
    }
});

function initContactEvent(contactlist) {
    //do nothing
}

function updateContactEvent(contact) {
    console.log("-------------");
    console.log("contact update");
    console.log("key: " + contact.key());
    console.log(contact.val());
    data = contact.val();
    if(data.name === "Giang") {
        console.log('update:' + data.name)
        fbchild = firebase.child(contact.key())
        fbchild.update({name: "Giangnew",updatetime: Firebase.ServerValue.TIMESTAMP});
    }
    console.log("-------------");
}

function newContactEvent(contact,prevChildKey) {
    console.log("-------------");
    console.log("contact added")
    console.log("key: " + contact.key());
    console.log(contact.val());
    console.log("-------------");
}

function removeContactEvent(oldcontact) {
    console.log("-------------");
    console.log("contact removed");
    console.log("key:" + oldcontact.key());
    console.log(oldcontact.val());
    console.log("-------------");
}