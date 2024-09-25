import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import UserList from '../../components/userList';
const url = 'https://66ced668901aab24841fc54d.mockapi.io/user';
function Home() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('')
  const filterUsers = useCallback(() => {
    return users.reduce((acc, user) => {
      if (user.name.toLowerCase().includes(filter.toLowerCase())) {
        acc.push(user)
      }
      return acc
    },[])
  }, [filter, users])
  const filteredUsers = useMemo(() => filterUsers(), [filterUsers]);
  async function getUser() {
    try {
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUser()
  },[])
  return <div>
    <h1>Filter User</h1>
    <input type="text"
      value={filter }
      onChange={ e => setFilter(e.target.value)}
      placeholder='input for filtering'
    />
          <UserList users={filteredUsers} />
   
  </div>;
}
export default Home;
