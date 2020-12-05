




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://knxwledge:1988@ntune-cluster.ryvsd.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });




function checkNullBody(body) {
    for (let member in body) {
        if (body[member] == null) { return true; }
    }
    return false;
}
async function connectDB() {
    await client.connect();

    database = client.db(`Ntune-Database`);

    userTable = database.collection('users');
    songTable = database.collection('songs');
    playlistTable = database.collection('playlists');
} 
async function getUsers(req, res){
    let response = await userTable.find(req.query).toArray();
    res.json(response);
    
}
async function getPlaylists(req, res) {
    response = await playlistTable.find(req.query).toArray();
    res.json(response);
}
async function getSongs(req, res) {
    response = await songTable.find(req.query).toArray();
    res.json(response);
}
async function updateAddUser(req, res) {

    //get username
    username = req.params.username;

    //if the body doesnt have a name then it is invalid
    if (req.body.name === null) {
        res.json({ 'matched': 'invalid entry', 'added': 'invalid entry' });
        return;
    }

    if (req.body.name === undefined) {
        res.json({ 'matched': 'invalid entry', 'added': 'invalid entry' });
        return;
    }

    let findQuery = { name: req.params.username };
    let updateQuery = {
        $set: {
        name: req.body.name,
        preferences: req.body.preferences,
        type: req.body.type,
        connects: req.body.connects,
        playlists: req.body.playlists
    }
    }

    //upsert just means if it doesn't exist we will add it in thus this works as an
    //update function and add function only use upsert on unique query id's in our case name.
    let options = { upsert: true };

    let response = await userTable.updateOne(findQuery, updateQuery, options);

    res.json({ 'matched': response.matchedCount,'added':response.upsertedCount });

}
async function addPlaylist(req, res) {
    //if we match the id of a playlist return playlist already exists
    //let exists = await playlistTable.find({ 'name': req.body.name });
    let exists = await playlistTable.find({ _id: req.body._id });
    let arr = await exists.toArray();
    if (arr.length > 0 || checkNullBody(req.body)==true) {
        
        let response = { 'success': 'No, playlist already exists or body has a null value' };
        res.json(response);
        return;
    }
    //else add playlists and return that we did
    rewrap = { _id: req.body._id, name: req.body.name, songs: req.body.songs };

    let response = await playlistTable.insertOne(rewrap);
    res.json({ 'success': 'Playlists Added' });
}
async function modifyPlaylist(req, res) {
    //to modify a playlist u must pass in a new playlist. It is essentially add playlist, but we allow for changes on already existing playlists
    //note u cannt change the id of a playlist, BUT you must search by id.
    //note In the playlist table, all the song objects only contain artists and title. The rest of the songs data will be held in songs database

    //search for playlist by the id with searchQuery
    let searchQuery = { _id: req.params.uniqueid }   

    //if playlist doesnt exist then we return 
    playlist = await playlistTable.find(searchQuery).toArray();
    console.log(playlist);
    if (playlist.length == 0) {
        //playlist doesn't exist
        let response = { 'success': 'Can\'t modify a nonexistent playlist, check id' };
        res.json(response);
        return;

    }

    updateQuery = { $set: {
        name: req.body.name,
        songs: req.body.songs
    }
    };    
    let response = await playlistTable.updateOne(searchQuery, updateQuery);
    res.json({ 'success': 'Playlists Updated' });
    return
}
async function addSong(req, res) {
    //if we match the id of a song return playlist already exists
    let exists = await songTable.find({ _id: req.body._id });
    let arr = await exists.toArray();
    if (arr.length > 0 || (checkNullBody(req.body)==true)) {

        let response = { 'success': 'No, song already exists or body has null values' };
        res.json(response);
        return;
    }
    //else add Song and return that we did
    let rewrap = {
        _id: req.body._id, //artist + song maybe
        title: req.body.title, //string
        artists: req.body.artists, //array
        year: req.body.year, //0 < int < today
        genres: req.body.genres, //array of genres it fall in
        album: req.body.album, //string
        likes: req.body.likes, //float > 0
        dislikes: req.body.dislikes, //float > 0
        available_at: req.body.available_at //Array of places to listen
    }

    let response = await songTable.insertOne(rewrap);
    res.json({ 'success': 'Song Added' });
}
async function modifySong(req, res) {
    
    //search for playlist by the id with searchQuery
    let searchQuery = { _id: req.body.uniqueid }

    //if playlist doesnt exist then we return 
    song = await songTable.find(searchQuery).toArray();
    console.log(song, req.body);
    if (song.length == 0) {
        //song doesn't exist
        let response = {
            'success': 'Can\'t modify a nonexistent song, check id',
            'id': req.body.uniqueid};
        res.json(response);
        return;

    }

    updateQuery = {
        $set: {
            likes: req.body.likes,
            dislikes: req.body.dislikes
        }
    };
    let response = await songTable.updateOne(searchQuery, updateQuery);
    res.json({ 'success': 'Song Updated' });
    return
}







let database = 0;
let userTable = 0;
let songTable = 0;
let playlistTable = 0;

connectDB();
app.get('/users', getUsers); /* get users with optional name supplied*/
app.get('/playlists',getPlaylists) /*get playlists with optional parameters supplied*/
app.get('/songs',getSongs) /*get Songs with optional parameters supplied*/

/*add or update users. it ensures uniqueness
because we can only add users by updating ones that dont exist */
app.post('/update/:username', jsonParser, updateAddUser);

/* when adding playlist we must supply the unique name*/
app.post('/playlistAugs/add', jsonParser, addPlaylist)

/*when modifying we must supply that same name*/
app.post('/playlistAugs/update/:uniqueid', jsonParser, modifyPlaylist)

app.post('/addSong', jsonParser, addSong)
app.post('/updateSong', jsonParser, modifySong);




app.listen(5000, function () { console.log(5000); });
