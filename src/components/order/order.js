import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/order.scss';

const Order = () => {
    const [orders, setOrder] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    //get orders
    const loadOrders = async () => {
        const token = JSON.parse(localStorage.getItem('user-info'));
        const result = await axios.get("/v1/order/all", { headers: { "Authorization": `Bearer ${token}` } });
        setOrder(result.data);

    }

    const DRAFT = 0;

    //delete order
    const deleteOrder = async id => {
        const token = JSON.parse(localStorage.getItem('user-info'));
        await axios.delete(`/v1/order/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        loadOrders();
    }

    const submitOrder = async id => {
        const token = JSON.parse(localStorage.getItem('user-info'));
        await axios.get(`/v1/order/submit/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        loadOrders();
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex justify-content-between">
                    <h1>Orders</h1>
                    <Link className="btn btn-outline-primary" to="/order/create">
                        <span className="add-order-button-text">Add order</span>
                    </Link>
                </div>

                <table className="table table-striped table-hover order-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">No</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.no}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{order.orderDate}</Moment>
                                    </td>
                                    <td className={order.status == DRAFT ? "text-danger" : "text-success"}>{order.status == DRAFT ? "DRAFT" : "SUBMITTED"}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2 action" to={`order/detail/${order.id}`}>Details</Link>
                                        <Link className="btn btn-outline-primary mr-2 action" to={`/order/edit/${order.id}`}>Edit</Link>
                                        <Link className="btn btn-danger" to="" onClick={() => deleteOrder(order.id)}>Delete</Link>
                                        {(() => {
                                            if (order.status == DRAFT) {
                                                return (
                                                    <Link className="btn btn-outline-success submit-btn" to="" onClick={() => submitOrder(order.id)}>Submit</Link>
                                                )
                                            }
                                        })()}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Order;