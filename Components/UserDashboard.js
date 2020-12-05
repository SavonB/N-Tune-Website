import React from "react";
import "./UserDashboard.css";
import { withRouter } from "react-router";

class UserDashboard extends React.Component {
    constructor() {
        super();
        this.inputRef_user = React.createRef();
        this.inputRef_song = React.createRef();
        this.inputRef_playlist = React.createRef();
        this.inputRef_playlistName = React.createRef();
        this.inputRef_Id = React.createRef();
        this.state = {
            user: {}
        }

    }
    componentDidMount() {
        //get user from database based on name
        let url = `http://localhost:5000/users?name=${this.props.match.params.user}`
        fetch(url)
            .then(response => response.json())
            .then(result => {


                this.setState({ user: result[0] });
               console.log(this.state.user);


            });
    }
    _clicked_user = function () {
        //console.log(this.inputRef.current.value);
        if(this.inputRef_user.current.value == "") { return;}
        window.location.href = `/search/users/${this.inputRef_user.current.value}`
        
    }
    _clicked_song = function () {
        ///search/songs /: song
        if(this.inputRef_song.current.value == "") { return; }

        window.location.href = `/search/songs/${this.inputRef_song.current.value}`;

    }
    _clicked_playlist = function () {
        window.location.href = `/search/playlist/${this.inputRef_playlist.current.value}`;

    }

    addPlaylist = function() {
        //app.post('/playlistAugs/add', jsonParser, addPlaylist)
        let url = `http://localhost:5000/playlistAugs/add`
        let updateBody = JSON.stringify({
            "_id": document.getElementById('pid').value,
            "name": document.getElementById('pname').value,
            "songs": []

        });
        let options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: updateBody
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    
    render() {
        let playlists = [];
        let connects = [];
        let preferences = [];
        let favorite_artists = [];
        if (this.state.user.playlists && this.state.user.connects && this.state.user.preferences && this.state.user["favorite-artists"]) {
            console.log(this.state.user["favorite-artists"]);
            playlists = this.state.user.playlists;
            connects = this.state.user.connects;
            preferences = this.state.user.preferences;
            favorite_artists = this.state.user["favorite-artists"];

        }
        return (
            <div className = 'user-dashboard'>

                <h1>{this.props.match.params.user}'s Dashboard</h1>
                
                <div className='user-search-bar'>
                    <input type='text' ref={this.inputRef_user}/>

                </div>
                <div className='user-search-button' onClick={() => this._clicked_user()}>
                    Search User
                </div>


                <div className='song-search-bar'>
                    <input type='text' ref={this.inputRef_song} />

                </div>
                <div className='song-search-button' onClick={() => this._clicked_song()}>
                    Search Song
                </div>



                <div className='playlist-search-bar'>
                    <input type='text' ref={this.inputRef_playlist} />

                </div>
                <div className='playlist-search-button' onClick={() => this._clicked_playlist()}>
                    Search Playlist
                </div>

                <h2>Playlists</h2>
                <ul>
                    {playlists.map((el) =>
                        <li onClick={()=>this.inputRef_playlist.current.value = el}>{ el}</li>)}
                </ul>


                <h2>Connects</h2>
                <ul>
                    {connects.map((el) =>
                        <li onClick={() => this.inputRef_user.current.value = el}>{el}</li>)}
                </ul>
                <h2>Preferences</h2>
                <ul>
                    {preferences.map((el) =>
                        <li>{el}</li>)}
                </ul>
                <h2>Favorite Artists</h2>
                <ul>
                    {favorite_artists.map((el) =>
                        <li onClick={() => this.inputRef_user.current.value = el}>{el}</li>)}
                </ul>

                <div>
                <h3> Add playlist </h3>
                    <input type='text' ref={this.inputRef_Id} id="pid"/><p>personalized Id</p>
                    <input type='text' ref={this.inputRef_playlistName} id="pname"/><p>playlist name</p>
                    <button onClick={()=>this.addPlaylist()}> add playlist </button>

                    

                </div>
            </div>

        )
    }

};

export default withRouter(UserDashboard);