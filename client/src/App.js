import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Landing, Register, Error, ProtectedRoute} from "./pages/index";
import {AddJob, AllJobs, Profile, SharedLayout, Stats} from "./pages/dashboard/index";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}> {/* nested routes - parent */}
            <Route index element={<Stats />}/> {/* index = first page = parent url */}
            <Route path="all-jobs" element={<AllJobs />}/>
            <Route path="add-job" element={<AddJob />}/>
            <Route path="profile" element={<Profile />}/>
          </Route>
          <Route path="/register" element={<Register/>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
