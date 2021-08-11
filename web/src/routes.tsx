import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingPage } from './pages/Landing';
import { BandMap1 } from './pages/BandMap1';
import { BandMap2 } from './pages/BandMap2';
import { CreateRoom } from './pages/CreateRoom';
import RoomDetails from './pages/RoomDetails';


function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/Map/Band1" component={BandMap1}/>
                <Route path="/Map/Band2" component={BandMap2}/>
                <Route path="/Map/CreateRoom" component={CreateRoom}/>
                <Route path="/Map/Room/:id" component={RoomDetails}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;