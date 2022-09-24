import { useState } from 'react';
import { auth } from '../firebaseConfig'
import Form from './components/Form'
import Login from './components/Login'
import TableRow from './components/TableRow';
import { Routes, Route, Outlet, Link } from "react-router-dom";

function App() {

  const [user, setUser] = useState({}); 
  return (
    
    <div className='container mx-auto py-4'>
      <Login user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<>
          {auth.currentUser && <Form />}
        </>} />
        <Route path='/table' element={ <>{auth.currentUser && <TableRow />}</>} />
        <Route path="*" element={<>
          <p>Not Founded</p>
        </>} />

      </Routes>
    </div>
  )
}

export default App
