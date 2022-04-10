import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../../assets/styles/orderDetail.scss";


const OrderDetail = () => {
    const [items, setItem] = useState([]);
    const { id } = useParams();
    let [orderStatus, setOrderStatus] = useState();
    const DRAFT = 0;

    useEffect(() => {
        loadItems();
        getOrder();
    }, []);

    //get all order items
    const loadItems = async () => {
        debugger
        const token = JSON.parse(localStorage.getItem('user-info'));
        const result = await axios.get(`/v1/orderitem/getallbyorderid/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        setItem(result.data.reverse());
    }

    //delete order item
    const deleteItem = async id => {
        const token = JSON.parse(localStorage.getItem('user-info'));
        await axios.delete(`/v1/orderitem/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        loadItems();
    }

    const getOrder = async () => {
        debugger
        const token = JSON.parse(localStorage.getItem('user-info'));
        const result = await axios.get(`/v1/order/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        setOrderStatus(result.data.status)
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex justify-content-between">
                    <h1>Order details</h1>
                    <div className="add-and-back">
                        <Link className="btn btn-outline-primary back-button" to="/order">
                            <span className="add-order-button-text">Back</span>
                        </Link>
                        {(() => {
                            debugger
                            if (orderStatus == DRAFT) {
                                return (
                                    <Link className="btn btn-outline-success" to={`/order/detail/add/${id}`}>
                                        <span className="add-order-button-text">Add product</span>
                                    </Link>
                                )
                            }
                        })()}

                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product name</th>
                            <th scope="col">About product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Product price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.productName}</td>
                                    <td>{item.productDescription}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.productPrice}</td>

                                    {(() => {
                                        if (orderStatus == DRAFT) {
                                            return (
                                                <td>
                                                    <Link className="btn btn-outline-primary mr-2 action" to={`/order/detail/edit/${item.id}`}>Edit</Link>
                                                    <Link className="btn btn-danger" to="" onClick={() => deleteItem(item.id)}>Delete</Link>
                                                </td>
                                            )
                                        }
                                    })()}

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default OrderDetail;