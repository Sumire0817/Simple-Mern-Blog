import Navbar from "./components/Nav";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import IndividualPosts from "./components/IndividualPosts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar appears on all pages */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CreatePost />
              <Posts />
            </>
          }
        />
        <Route path="/post/:id" element={<IndividualPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
