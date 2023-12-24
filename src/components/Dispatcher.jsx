import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import RecipePage from "./RecipePage";
import ProfilePage from "./ProfilePage";

const Dispatcher = ({ title, courses }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RecipePage />} />
      <Route path="/profile/" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
);

export default Dispatcher;
