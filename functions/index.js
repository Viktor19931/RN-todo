const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
    projectId: "auth-react-cbf3e",
    keyFilename: "places.json"
};

const gcs = require("@google-cloud/storage")(gcconfig);

admin.initializeApp({
    credential: admin.credential.cert(require("./places"))
});

exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if  (!request.headers.autorization ||
            !request.headers.authorization.startsWith("Bearer ")
        ) {
            console.log("NO token present !");
            response.status(403).json({error: "Unauthorized"});
            return;
        }
        let idToken;
        idToken = request.headers.authorization.split("Bearer")[1];
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                const body = JSON.parse(request.body);
                fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                    console.log(err);
                    console.log(2);
                    return response.status(500).json({ error: err });
                });
                const bucket = gcs.bucket("auth-react-cbf3e.appspot.com");
                const uuid = UUID();

                bucket.upload(
                    "/tmp/uploaded-image.jpg",
                    {
                        uploadType: "media",
                        destination: "/places/" + uuid + ".jpg",
                        metadata: {
                            metadata: {
                                contentType: "image/jpeg",
                                firebaseStorageDownloadTokens: uuid
                            }
                        }
                    },
                    (err, file) => {
                        console.log(file);
                        if (!err) {
                            response.status(201).json({
                                imageUrl:
                                "https://firebasestorage.googleapis.com/v0/b/" +
                                bucket.name +
                                "/o/" +
                                encodeURIComponent(file.name) +
                                "?alt=media&token=" +
                                uuid
                            });
                        } else {
                            console.log(err);
                            console.log(2);
                            response.status(500).json({ error: err });
                        }
                    }
                );
                return decodedToken;
            })
            .catch(error => {
                console.log("token is invalid");
                response.status(403).json({error: "Unauthorized"});
            });
    });
});
