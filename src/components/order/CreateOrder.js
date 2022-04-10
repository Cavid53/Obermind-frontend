import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {

    const navigate = useNavigate();
    const [order, setOrder] = useState({
        no: "",
        orderDate: "",
        totalPrice: 0,
    });

    const { no, orderDate, totalPrice } = order;

    const onInputChange = e => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user-info'));
        await axios.post("/v1/order/upsert", order,{ headers: {"Authorization" : `Bearer ${token}`} });
        navigate('/order')
    };
    
    const goBack = () =>{
        navigate("/order");
    }

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Create order</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group mt-3 position-relative">
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
                            value={orderDate}
                            required
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
                    <button className="btn btn-success btn-block mt-4">Create</button>
                </form>
                <button className="btn btn-primary btn-block mt-4" onClick={goBack}>Back</button>
            </div>
        </div>
    );
};
export default CreateOrder;