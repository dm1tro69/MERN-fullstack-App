import {Route, Routes} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/comoponents/Navigation/MainNavigation";

function App() {
  return (
      <>
          <MainNavigation/>
        <main>
    <Routes>
      <Route path={'/'} element={<Users/>}/>
      <Route path={'/places/new'} element={<NewPlace/>}/>
        <Route path={'*'} element={<Users/>}/>
    </Routes>
        </main>
      </>
  );
}

export default App;
