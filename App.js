import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import Home from './Components/Home/Home.js';
import SearchResultsUser from './Components/SearchResultsUser/SearchResultsUser.js';
import SearchResultsSong from './Components/SearchResultsSong/SearchResultsSong.js';
import SearchResultsPlaylist from './Components/SearchResultsPlaylist/SearchResultsPlaylist.js';
import SongDashboard from './Components/SongDashboard/SongDashboard.js'
import PlaylistDashboard from './Components/PlaylistDashboard/PlaylistDashboard.js'
import CreateAccount from './Components/CreateAccount/CreateAccount.js'
import UserDashboard from './Components/UserDashboard/UserDashboard.js';
function App() {
    return (
        <Router>

            {
                <Switch>


                    
                    <Route path="/createAccount">
                        <CreateAccount />
                    </Route>
                    <Route path="/profile/:user">
                        <UserDashboard />
                    </Route>

                    <Route path="/catalog/song/:song/artists/:artists">
                        <SongDashboard />
                    </Route>

                    <Route path="/playlist/:playlist/id/:id">
                        <PlaylistDashboard />
                    </Route>

                    <Route path="/search/users/:user">
                        <SearchResultsUser />
                    </Route>

                    <Route path="/search/songs/:song">
                        <SearchResultsSong />
                    </Route>

                    <Route path="/search/playlist/:playlist">
                        <SearchResultsPlaylist />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            }
        </Router>
        
        )  
}

export default App;
