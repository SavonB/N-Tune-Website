import React from "react";
import "./UserDashboard.css";
import { withRouter } from "react-router";

class UserDashboard extends React.Component {
    constructor() {
        super();
        this.inputRef_user = React.createRef();
        this.inputRef_song = React.createRef();
        this.inputRef_playlist = React.createRef();


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
    render() {

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
            </div>

        )
    }

};

export default withRouter(UserDashboard);