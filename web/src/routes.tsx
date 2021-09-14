import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingPage } from './pages/Landing';
import { RoomMap } from './pages/RoomsMap';
import { CreateRoom } from './pages/CreateRoom';
import { DeleteRoom } from './pages/DeleteRoom';
import RoomDetails from './pages/RoomDetails';
import { RoomList } from './pages/RoomList';
import { LoginUser } from './pages/LoginUser';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/Map/Room/:latitude/:longitude" component={RoomMap}/>
                <Route path="/Map/Room/:id" component={RoomDetails}/>
                <Route path="/Map/RoomList" component={RoomList}/>
                <Route path="/Map/CreateRoom" component={CreateRoom}/>
                <Route path="/Map/DeleteRoom" component={DeleteRoom}/>

                <Route path="/User/Login" component={LoginUser}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;