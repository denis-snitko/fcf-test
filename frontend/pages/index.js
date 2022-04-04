import React from 'react'
import axios from 'axios'

export default function Home() {
  const [users, setUsers] = React.useState([])

  const URL = 'http://865531-cs02320.tmweb.ru:4205'


  const fetchJSON = async () => {
    try {
      const response = await axios(`${URL}/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button className='p-4 rounded-md border-2' onClick={fetchJSON}>Get Data</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.userName}</li>
        ))}
      </ul>
    </>
  )
}
