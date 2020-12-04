import React from "react";
import "./SongDashboard.css";
import { withRouter } from "react-router";

class SongDashboard extends React.Component {
    constructor() {
        super();
        


    }



    render() {

        return (
            <div>
                <h1> {this.props.match.params.song} </h1>

            </div>

        )
    }

};

export default withRouter(SongDashboard);