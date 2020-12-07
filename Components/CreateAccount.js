import React from "react";
import "./CreateAccount.css";
import { withRouter } from "react-router";

class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {}
        };

        this.inputRef_user = React.createRef();
        this.inputRef_art1 = React.createRef();
        this.inputRef_art2 = React.createRef();
        this.inputRef_art3 = React.createRef();
        this.inputRef_type = React.createRef();
        this.inputRef_gen1 = React.createRef();
        this.inputRef_gen2 = React.createRef();

        this.inputRef_gen3 = React.createRef();



    }

    _clicked = function () {
        //'/update/:username'
        //fetch the url and post a user
        /*name: req.body.name,
        preferences: req.body.preferences,
        type: req.body.type,
        connects: req.body.connects,
        playlists: req.body.playlists*/
        let url = `http://localhost:5000/update/${this.inputRef_user.current.value}`
        let updateBody = JSON.stringify({
            "name": document.getElementById("name").value,
            "preferences": [document.getElementById("g1").value, document.getElementById("g2").value, document.getElementById("g3").value],
            "favorite_artists": [document.getElementById("a1").value, document.getElementById("a2").value, document.getElementById("a3").value],

            "type": document.getElementById("type").value,
            "connects": [],
            "playlists": []

        });
        let options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: updateBody
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data));
        window.location.href = `http://localhost:3000/profile/${this.inputRef_user.current.value}`;


    }

    render() {
        return (
            <div>
            <h1> Create Account </h1>
    
                <input type='text' id="name" ref={this.inputRef_user}/>
            <p>Name</p>

                <input type='text' id="a1" ref={this.inputRef_art1}/>
                <input type='text' id="a2" ref={this.inputRef_art2}/>
                <input type='text' id="a3" ref={this.inputRef_art3}/><p>Top 3 Artists</p>

                <input type='text' id="type" ref={this.inputRef_type}/><p>Type</p>

                <input type='text' id="g1" ref={this.inputRef_gen1} />
                <input type='text' id="g2" ref={this.inputRef_gen2}/>
                <input type='text' id="g3" ref={this.inputRef_gen3}/><p>Favorite Genres</p>
                <button onClick={ ()=>this._clicked()}> Create Account </button>
            </div>
            )
    }
}

export default withRouter(CreateAccount)
