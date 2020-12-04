import React from "react";
//import "./SearchResultsPlaylist.css";
import { withRouter } from "react-router";

class SearchResultsPlaylists extends React.Component {

    constructor() {
        super();
        this.state = { playlists: [] };

    }

    componentDidMount() {

        let url = `http://localhost:5000/playlists?name=${this.props.match.params.playlist}`;
        fetch(url)
            .then(response => response.json())
            .then(result => {


                this.setState({ playlists: result });


            });

    }

    _clicked(name,id) {

        //when playlist is clicked send to playlist dashboard
        window.location.href = `http://localhost:3000/playlist/${name}/id/${id}`;
        console.log(name);
        

    }

    render() {
        const listItems = this.state.playlists.map((result) =>
            <li id={result.name} onClick={() => this._clicked(result.name, result._id)}>
                {result.name} id is "{result._id}"
            </li>

        );



        return (
            <div>

                <h1>Playlists named "{this.props.match.params.playlist}"</h1>
                <ul>
                    {listItems}
                </ul>
            </div>

        )
    }

};

export default withRouter(SearchResultsPlaylists);