import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import axios from 'axios';

function Products() {

    const [products, setProducts] = useState ([])

    useEffect(() => {
        axios.get('/products/get').then(res=>{
           // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);
    return (
        <>
            <div className="page-name">
                <h3>Paisjet në dispozicion</h3>
            </div>
        <div className='products pt6'>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Emri produktit</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Data</th>
                    <th scope="col">Çmimi blerës</th>
                    <th scope="col">Çmimi shitës</th>
                    <th scope="col">Partneri</th>
                    <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                {products.reverse().map(product => (
                <tbody>
                    <tr>
                    <th scope="row" key={product.id}>1</th>
                    <td>{product.product_name}</td>
                    <td>{product.imei}</td>
                    <td>{product.date}</td>
                    <td>{product.buying_price}</td>
                    <td>{product.selling_price}</td>
                    <td>{product.buyer}</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
        </>
    )
}

export default Products
