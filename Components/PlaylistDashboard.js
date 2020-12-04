import React from "react";
import "./PlaylistDashboard.css";
import { withRouter } from "react-router";

class PlaylistDashboard extends React.Component {
    constructor() {
        super();



    }



    render() {

        return (
            <div>
                <h1> {this.props.match.params.playlist} </h1>

            </div>

        )
    }

};

export default withRouter(PlaylistDashboard);