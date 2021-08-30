import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingPage } from './pages/Landing';
import { RoomMap } from './pages/RoomsMap';
import { CreateRoom } from './pages/CreateRoom';
import RoomDetails from './pages/RoomDetails';
import { RoomList } from './pages/RoomList';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/Map/Room/:latitude/:longitude" component={RoomMap}/>
                <Route path="/Map/Room/:id" component={RoomDetails}/>
                <Route path="/Map/CreateRoom" component={CreateRoom}/>
                <Route path="/Map/RoomList" component={RoomList}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;