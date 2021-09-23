import axios from "axios"
import React, { useEffect, useState } from "react"
import { useAlert } from 'react-alert'
import '../Users/EditUsers.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
  const statues = ['approved', 'shipped']


  const submit = (id, status, email, name) => {
    confirmAlert({
      title: "Confirm to change order's status",
      // message: 'this action no can reverted',
      buttons: [
        {
          label: 'Yes',
          onClick: () => changeStatus(id, status, email, name)
        },
        {
          label: 'No',
          onClick: () => alertReact.show('aborted action')
        }
      ]
    });
  };

  const changeStatus = async (id, status, email, name) => {

    let HasuraResponseBlock, type_message, nextStatus

    switch (status.toLowerCase()) {
      case 'approved':
        nextStatus = 'shipped'
        type_message = 'ORDER_SHIPPED'
        break

      case 'shipped':
        nextStatus = 'delivered'
        type_message = 'ORDER_DELIVERED'
        break

      //case 'received':
      //cambiar estado
      //enviar mail
      //break

      default: return;
    }

    axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/sendMail`, {
      // const { user_email, user_name, type_message, order } = request.body;
      user_email: email,
      user_name: name,
      type_message: type_message,
      order: id
    }).then(response => console.log('mail enviado:',response.data))

    HasuraResponseBlock = await axios.post(`${process.env.REACT_APP_BASE_REST_API_HASURA}/update_order`,
      {
        order_id: id,
        status: nextStatus
      })


    setUpdated(updated + 1)
    alertReact.success('Updated order')
    console.log(HasuraResponseBlock.data);
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
            <td>{order.updated_at.slice(0, 10)}</td>
            <td>{order.status}</td>
            <td>
              {statues.includes(order.status.toLowerCase()) ? <button onClick={e => submit(order.id, order.status, order.email, order.email)}>{order.status.toLowerCase() === 'approved' ? 'change to "shipped"' : 'change to "received"'}</button> : <button disabled>No action</button>}
            </td>
          </tr>)}</tbody>
        </table> : null}
      </div>
    </React.Fragment>
  )
}