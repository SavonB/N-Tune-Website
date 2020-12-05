import React from "react";
import "./PlaylistDashboard.css";
import { withRouter } from "react-router";

class PlaylistDashboard extends React.Component {
    constructor() {
        super();

        this.state = {playlist:[]}

    }

    componentDidMount() {
        //take playlist id and search for playlist
        //put playlist in state
        let url = `http://localhost:5000/playlists?_id=${this.props.match.params.id}`;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                console.log(this.props.match.params.id);
                this.setState({ playlist: result[0] });
            })
        //fetch song from song DB where id = title.tolowercase+artists.tolowercase
        //put it into a state called song
    }
    //onclick of song we go to dashboard
    ///catalog/song /: song / artists /: artists
    _clicked_song = function (title) {
        window.location.href = `/search/songs/${title}`;

    }
    render() {

        //if playlist is true map the songs to a list
        let songs = [];
        if (this.state.playlist.songs) {
            console.log(this.state.playlist.songs);
            songs = this.state.playlist.songs;
        }
        return (
            <div>
                <h1> {this.props.match.params.playlist} </h1>
                <ul>
                    {songs.map((song) =>
                        <li onClick={() => this._clicked_song(song.title)} >{song.title}</li>
                )}
                </ul>
            </div>

        )
    }

};

export default withRouter(PlaylistDashboard);