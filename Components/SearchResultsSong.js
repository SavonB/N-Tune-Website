import React from "react";
import "./SearchResultsSong.css";
import { withRouter } from "react-router";

class SearchResultsSong extends React.Component {

    constructor() {
        super();
        this.state = { songs: [] };
        this.inputRef = React.createRef();

    }

    componentDidMount() {

        let url = `http://localhost:5000/songs?title=${this.props.match.params.song}`;
        fetch(url)
            .then(response => response.json())
            .then(result => {


                this.setState({ songs: result });
                console.log(this.state.songs);


            });

    }

    _clicked(result) {

        //when song is clicked send us to song page
        window.location.href = `http://localhost:3000/catalog/song/${result.title}/artists/${result.artists}`;


    }

    render() {
        
        const listItems = this.state.songs.map((result) =>
            <li id={result.title} onClick={() => this._clicked(result)}>
                {result.title} By {result.artists}
            </li>

        );
        


        return (
            <div>

                <h1>Songs named "{this.props.match.params.song}"</h1>
                <ul>
                    {listItems}
                </ul>
            </div>

        )
    }

};

export default withRouter(SearchResultsSong);