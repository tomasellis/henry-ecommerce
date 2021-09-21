import axios from "axios"
import React, { useEffect, useState } from "react"
import { useAlert } from 'react-alert'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

export default function EditUsers() {
  const alertReact = useAlert()
  const [users, setUsers] = useState([])
  const [pages, setPages] = useState({
    currentPage: 0,
    prevPage: -1,
    nextPage: 1,
    maxUsers: 1
  })
  const [updated, setUpdated] = useState(0)



  const editBlock = async (id, status) => {
    let axiosResponseBlock, HasuraResponseBlock
    if (status.toLowerCase() === 'ok') {
      [axiosResponseBlock, HasuraResponseBlock] = await Promise.all([
        axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/blockUser?id=${id}&blocking=${true}`),
        axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/setUserBlock`,
          {
            auth0_id: id,
            status: 'blocked'
          })
      ])

    } else {
      [axiosResponseBlock, HasuraResponseBlock] = await Promise.all([
        axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/blockUser?id=${id}&blocking=${false}`),
        axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/setUserBlock`,
          {
            auth0_id: id,
            status: 'Ok'
          })
      ])
    }
    setUpdated(updated + 1)
    alertReact.success('Updated user')
    console.log(axiosResponseBlock.data, HasuraResponseBlock.data);
  }

  const editRole = async (id, role) => {
    let HasuraResponseRole
    if (role.toLowerCase() === 'user') {
      HasuraResponseRole = await axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/setUserAdmin`,
        {
          auth0_id: id,
          role: 'Admin'
        })
    } else {
      HasuraResponseRole = await axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/setUserAdmin`,
        {
          auth0_id: id,
          role: 'User'
        })
    }
    setUpdated(updated + 1)
    alertReact.success('Updated user')
    console.log(HasuraResponseRole.data);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/users?mostrar=${5}&saltearse=${pages.currentPage * 5}`)
      .then(({ data }) => {
        setUsers(data.users)
        setPages({ ...pages, maxUsers: data.users_aggregate.aggregate.count })
      })
    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [pages.currentPage, updated])

  return (
    <React.Fragment>
      <div> users </div>
      <button onClick={e => setPages({
        ...pages,
        currentPage: pages.currentPage - 1,
        prevPage: pages.prevPage - 1,
        nextPage: pages.nextPage - 1
      })} disabled={pages.prevPage < 0} >Prev</button>
      <button onClick={e => setPages({
        ...pages,
        currentPage: pages.currentPage + 1,
        prevPage: pages.prevPage + 1,
        nextPage: pages.nextPage + 1
      })} disabled={pages.nextPage > Math.ceil(pages.maxUsers / 5) - 1} >Next</button>


      {users.length ? <table>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>role</th>
            <th>status</th>
            <th>set role</th>
            <th>set status</th>
          </tr>

        </thead>
        <tbody>{users.map((user) => <tr key={user.id}>
          <td>{user.auth0_id}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.status}</td>
          <td>
            <button onClick={e => editRole(user.auth0_id, user.role)}>{user.role.toLowerCase() === 'user' ? 'set admin' : 'set user'}</button>
          </td>
          <td>
            <button onClick={e => editBlock(user.auth0_id, user.status)}>{user.status.toLowerCase() === 'ok' ? 'Block' : 'Unblock'}</button>
          </td>
        </tr>)}</tbody>
      </table> : null}
    </React.Fragment>
  )
}