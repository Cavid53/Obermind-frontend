import React,{ useState } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";  

const AddItem = () => {
    const token = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState({
        orderId: id,
        productName: "",
        productDescription: "",
        quantity:"",
        productPrice: "",
    });

    const { productName, productDescription, quantity, productPrice, orderId } = item;

    const onInputChange = e => {
       setItem({ ...item, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/v1/orderitem/upsert", item, { headers: { "Authorization": `Bearer ${token}` } });
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Succesfully',
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            navigate("/order/detail/" + id);
        })
    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add product</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter product name"
                            name="productName"
                            value={productName}
                            required
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter order description"
                            name="productDescription"
                            required
                            value={productDescription}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="number"
                            min='0'
                            className="form-control form-control-lg"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={quantity}
                            required
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="number"
                            min='0'
                            className="form-control form-control-lg"
                            placeholder="Enter order total price"
                            name="productPrice"
                            required
                            value={productPrice}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-success btn-block mt-4">Add</button>
                </form>
            </div>
        </div>
    );
};
export default AddItem;