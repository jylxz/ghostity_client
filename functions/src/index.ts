/* eslint-disable import/prefer-default-export */
import * as functions from "firebase-functions";

const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

export const createUserFollowsDocument = functions.auth
  .user()
  .onCreate((user) => {
    db.collection("follow")
      .doc(user.uid)
      .set({
        channel_ids: []
      });
  });
