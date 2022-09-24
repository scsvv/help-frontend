import { useState } from 'react';
import { auth } from '../firebaseConfig'
import Form from './components/Form'
import Login from './components/Login'

function App() {

  const [user, setUser] = useState({}); 
  return (
    
    <div className='container mx-auto py-4'>
      <Login user={user} setUser={setUser} />
      {auth.currentUser && <Form />}
    </div>
  )
}

export default App
