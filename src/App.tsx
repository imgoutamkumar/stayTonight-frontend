import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/signIn";
import { AddHotel } from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import { Hotels } from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>home page</p>
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <Search/>
            </Layout>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/signIn" element={<SignIn />} />
       {/*  <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        /> */}

        {isLoggedIn && (
          <>
            <Route
              path="/addHotel"
              element={
                <Layout>
                  <AddHotel></AddHotel>
                </Layout>
              }
            />
            <Route
              path="/editHotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/myHotels"
              element={
                <Layout>
                  <Hotels></Hotels>
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
