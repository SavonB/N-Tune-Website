import React from "react";
import "./SearchResultsUser.css";
import { withRouter } from "react-router";

class SearchResultsUser extends React.Component {

    constructor() {
        super();
        this.state = { users: [] };
        this.inputRef = React.createRef();

    }

    componentDidMount() {

        let url = `http://localhost:5000/users?name=${this.props.match.params.user}`;
        fetch(url)
            .then(response => response.json())
            .then(result => {


                this.setState({ users: result });
                console.log(this.state.users);


            });

    }

    _clicked(name) {

        //when user is clicked send us to his profile  /profile/:user
        window.location.href = `http://localhost:3000/profile/${name}`;
        console.log(name);


    }

    render() {
        const listItems = this.state.users.map((result) => 
            <li id={result.name} onClick={() => this._clicked(result.name)}>
                {result.name}
            </li>
        
        );



        return (
            <div>

                <h1>users named "{this.props.match.params.user}"</h1>
                <ul>
                    {listItems}
                </ul>
            </div>

        )
    }

};

export default withRouter(SearchResultsUser);