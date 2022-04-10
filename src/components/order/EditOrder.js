import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import Swal from "sweetalert2";  

const EditOrder = () => {
    const token = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState({
        no: "",
        orderDate: "",
        totalPrice: 0,
    });

    const {no, orderDate, totalPrice } = order;

    useEffect(() => {
        loadOrder();
    }, []);

    const onInputChange = e => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/v1/order/upsert", order,{ headers: {"Authorization" : `Bearer ${token}`} });
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Succesfully',
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            navigate("/order");
        })
      
    };
  
    const loadOrder = async () => {
        const result = await axios.get(`/v1/order/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} });
        setOrder(result.data);
    }

    const goBack = () =>{
        navigate("/order");
    }

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit order</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter order no"
                            name="no"
                            value={no}
                            required
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            placeholder="Enter order date"
                            name="orderDate"
                            required
                            value={moment(orderDate).format('YYYY-MM-DD')}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="number"
                            step="0.1"
                            min='0'
                            disabled
                            className="form-control form-control-lg"
                            placeholder="Enter order total price"
                            name="totalPrice"
                            value={totalPrice}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block mt-4">Submit</button>
                </form>
                <button className="btn btn-primary btn-block mt-4" onClick={goBack}>Back</button>
            </div>
        </div>
    );
};
export default EditOrder;