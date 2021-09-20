import axios from "axios"
import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EditUsers() {
  const [users, setUsers] = useState([])
  const [pages, setPages] = useState({
    currentPage: 0,
    prevPage: -1,
    nextPage: 1,
    maxUsers: 1
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/users?mostrar=${5}&saltearse=${pages.currentPage * 5}`)
      .then(({ data }) => {
        setUsers(data.users)
        setPages({ ...pages, maxUsers: data.users_aggregate.aggregate.count })
      })
    return () => {
      // cleanup
    }
  }, [pages])

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

      {users.length && users.map((user) => {
        return (
          <>
            <div key={user.id}>{user.email}</div>
            
          </>
        )
      }
      )}
    </React.Fragment>
  )
}