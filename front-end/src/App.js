import Home from './Pages/Home/Home';
import Blog from './Pages/Blog/Blog';
import Event from './Pages/Event/Event';
import HeaderComponent from './Components/Header/HeaderComponent';
import FooterComponent from './Components/Footer/FooterComponent';
import ManageUser from './Pages/Admin/MangeUser/MangaeUser';
import ManageBlog from './Pages/Admin/Blog/MangeBlog';
import ManageEvent from './Pages/Admin/Event/ManageEvent';
import Notfound from './Pages/NotFound/NotFound';
import ManageDetailUser from './Pages/Admin/MangeUser/ManageDetailUser';
import ManageBlogDetail from './Pages/Admin/Blog/ManageBlogDetail';
import ManageEventDetail from './Pages/Admin/Event/ManageEventDetail';
import BlogDetail from './Pages/Blog/BlogDetail';
import EventDetail from './Pages/Event/EventDetail';
import Profile from './Pages/Profile/Profile';
import './App.scss';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  useEffect(() => {
  }, [user])
  return (

    <>
      <HeaderComponent user={user} setUser={setUser} />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='profile' element={<Profile />} setUser={setUser}/>
          <Route path="event" element={<Event />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path='blog/:id' element={<BlogDetail />} />
          <Route path='admin'>
            <Route path='user' element={<ManageUser />} />
            <Route path='user/:id' element={<ManageDetailUser />} />
            <Route path='blog' element={<ManageBlog />} />
            <Route path='blog/:id' element={<ManageBlogDetail />} />
            <Route path='event' element={<ManageEvent />} />
            <Route path='event/:id' element={<ManageEventDetail />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
