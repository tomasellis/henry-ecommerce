import axios from "axios"
import React, { useEffect, useState } from "react"
import { useAlert } from 'react-alert'
import './EditUsers.css'

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
        axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/setRoleUser`,
        {
          auth0_id: id,
          role: 'Admin'
        }).then(response => console.log("user seteado como admin", response.data))
    } else {
      HasuraResponseRole = await axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/setUserAdmin`,
        {
          auth0_id: id,
          role: 'User'
        })
        axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/setRoleUser`,
        {
          auth0_id: id,
          role: 'User'
        }).then(response => console.log("user seteado como User", response.data))
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
      <div className='editUser'>
      <h1> Users </h1>
      {users.length ? <table id="ordersOrUsers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Set role</th>
            <th>Set status</th>
          </tr>

        </thead>
        <tbody>{users.map((user) => <tr key={user.id}>
          <td>{user.auth0_id}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.status}</td>
          <td>
            <button className="button-change" onClick={e => editRole(user.auth0_id, user.role)}>{user.role.toLowerCase() === 'user' ? 'set admin' : 'set user'}</button>
          </td>
          <td>
            <button className="button-change" onClick={e => editBlock(user.auth0_id, user.status)}>{user.status.toLowerCase() === 'ok' ? 'Block' : 'Unblock'}</button>
          </td>
        </tr>)}</tbody>
      </table> : null}
      <div className="pagination">
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
      </div>
      </div>
    </React.Fragment>
  )
}
