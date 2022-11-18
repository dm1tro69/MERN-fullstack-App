import {Route, Routes} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/comoponents/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {
  return (
      <>
          <MainNavigation/>
        <main>
    <Routes>
      <Route path={'/'} element={<Users/>}/>
      <Route path={'/:userId/places'} element={<UserPlaces/>}/>
      <Route path={'/places/new'} element={<NewPlace/>}/>
      <Route path={'/places/:placeId'} element={<UpdatePlace/>}/>
        <Route path={'*'} element={<Users/>}/>
    </Routes>
        </main>
      </>
  );
}

export default App;
