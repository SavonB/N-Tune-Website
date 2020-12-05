import React from "react";
import "./SongDashboard.css";
import { withRouter } from "react-router";

class SongDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            song: {}
        };
        this.wasLiked = this.wasLiked.bind(this);
        this.wasDisliked = this.wasDisliked.bind(this);

    }

    componentDidMount() {
        //create a url to get song /songs
        //str = str.replace(/\s+/g, '');
        let song = this.props.match.params.song.toLowerCase().replace(/\s+/g, '');
        let artists = this.props.match.params.artists.toLowerCase().replace(/\s+/g, '');
       
        let song_id=song+artists
        let url = `http://localhost:5000/songs?_id=${song_id}`;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                this.setState({ song: result[0] });
            })
        //fetch song from song DB where id = title.tolowercase+artists.tolowercase
        //put it into a state called song
    }

    wasLiked() {
        //if a song was liked modify the song 
        //in body only need uniqueid: song+artists likes: this.state.song.likes+1 dislikes: this.state.song.dislikes
        let song = this.props.match.params.song.toLowerCase().replace(/\s+/g, '');
        let artists = this.props.match.params.artists.toLowerCase().replace(/\s+/g, '');

        let song_id = song + artists
        console.log(song_id);
        ///updateSong
        let url = `http://localhost:5000/updateSong`;
       
        let updateBody = JSON.stringify({
            "uniqueid": song_id,

            "likes": this.state.song.likes + 1,
            "dislikes": this.state.song.dislikes

        });
        let options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: updateBody };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data));
        window.location.reload();


    }

    wasDisliked() {
        let song = this.props.match.params.song.toLowerCase().replace(/\s+/g, '');
        let artists = this.props.match.params.artists.toLowerCase().replace(/\s+/g, '');

        let song_id = song + artists
        console.log(song_id);
        ///updateSong
        let url = `http://localhost:5000/updateSong`;

        let updateBody = JSON.stringify({
            "uniqueid": "loseeachotherteyanataylor",

            "likes": this.state.song.likes,
            "dislikes": this.state.song.dislikes+1

        });
        let options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: updateBody
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data));
        window.location.reload();

    }
   

    render() {
        let genres = [];
        if (this.state.song.genres) {
            genres = this.state.song.genres; 
        }
        return (
            <div>
                <h1> {this.props.match.params.song} by {this.props.match.params.artists} </h1>
                <div className = "album-showcase"><ul>
                    <li>Album {this.state.song.album}</li>
                    <li>Year {this.state.song.year}</li>
                    <li>Genres
                        <ul>{genres.map(genre => <li>{genre}</li>)}</ul>
                    </li>
                    <li>Likes: {this.state.song.likes}</li>
                    <li>Dislikes: {this.state.song.dislikes}</li>
                    <li>Listen at <ul><li>{this.state.song.available_at}</li></ul></li>

                </ul></div>

                <button onClick={() => this.wasLiked()} > Like </button>
                <button onClick={() => this.wasDisliked()}> Dislike </button>

            </div>

        )
    }

};

export default withRouter(SongDashboard);