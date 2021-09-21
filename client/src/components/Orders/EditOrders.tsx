import axios from "axios"
import React, { useEffect, useState } from "react"
import { useAlert } from 'react-alert'
import '../Users/EditUsers.css'

export default function EditOrders() {
  const alertReact = useAlert()
  const [orders, setOrders] = useState([])
  const [pages, setPages] = useState({
    currentPage: 0,
    prevPage: -1,
    nextPage: 1,
    maxOrders: 1
  })
  const [updated, setUpdated] = useState(0)
  const statues=['approved','sended']


  const changeStatus = async (id, status, email) => {
    let axiosResponseBlock, HasuraResponseBlock

    switch (status.toLowerCase()) {
      case 'approved':
      //cambiar estado
      //enviar mail
      break

      case 'sended':
      //cambiar estado
      //enviar mail
      break

      //case 'received':
      //cambiar estado
      //enviar mail
      //break
      
    }
    if (status.toLowerCase() === 'ok') {
      [axiosResponseBlock, HasuraResponseBlock] = await Promise.all([
        axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/blockUser?id=${id}&blocking=${true}`),
        axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/getOrders`,
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


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/orders?mostrar=${5}&saltearse=${pages.currentPage * 5}`)
      .then(({ data }) => {
        setOrders(data.orders)
        setPages({ ...pages, maxOrders: data.orders_aggregate.aggregate.count })
      })
    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [pages.currentPage, updated])

  return (
    <React.Fragment>
      <div className='editUser'>
        <div> Orders </div>
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
        })} disabled={pages.nextPage > Math.ceil(pages.maxOrders / 5) - 1} >Next</button>


        {orders.length ? <table>
          <thead>
            <tr>
              <th>order id</th>
              <th>user email</th>
              <th>address</th>
              <th>updated at</th>
              <th>status</th>
              <th>change status</th>
            </tr>

          </thead>
          <tbody>{orders.map((order) => <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.email}</td>
            <td>{order.address}</td>
            <td>{order.updated_at.slice(0,10)}</td>
            <td>{order.status}</td>
            <td>
              {statues.includes(order.status.toLowerCase())? <button onClick={e => changeStatus(order.id, order.status, order.email)}>{order.status.toLowerCase() === 'approved' ? 'change to "sended"' : 'change to "received"'}</button>: <button disabled>No action</button>}
            </td>
          </tr>)}</tbody>
        </table> : null}
      </div>
    </React.Fragment>
  )
}