import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import axios from 'axios';
import Swal from "sweetalert2";

function Products() {

    const [products, setProducts] = useState ([]);
    const [selected, setSelected] = useState("");

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

    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    function getByProduct(event){
        if(selected === "IMEI"){
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit"){ 
            getByNameProduct(event.target.value)
        } else if (selected === "Partneri") {
            getByPartnerProduct(event.target.value)

        } else if (selected === "Të gjithë produktet"){
            axios.get('/products/get').then(res=>{
                // partners = data.data.data
                 console.log(res.data.data)
                 setProducts(res.data.data)
             })
        }
    }
    
    function getByImeiProduct(event){
        let route = '/products/get/byimei' ;
        axios.post(route,{imei:event}).then(data=>{
            if(data.data.data !== null) {
                //console.log(data.data.data);
                setProducts([data.data.data]);
            }
        })
    }
    
    function getByNameProduct(event){
        let route = '/products/get/byname' ;
        axios.post(route,{name:event}).then(data=>{
            //console.log(data.data.data);
            setProducts(data.data.data);
        })
    }

    function getByPartnerProduct(event) {
        let route ='/products/get/bypartner' ;
        axios.post(route,{partnername:event}).then(data=>{
            //console.log(data.data.data)
            setProducts(data.data.data);
        })
    }

    function removeProduct(id) {
        Swal.fire({
          title:
            "Dëshironi të fshini produktin ? ",
          showDenyButton: true,
          confirmButtonText: `PO`,
          denyButtonText: `JO`,
        }).then((result) => {
          if (result.isConfirmed) {
            let route ='/product/delete/product';
            console.log(id)
            axios.post(route,{id:id}).then(data=>{
                axios.get('/products/get').then(res=>{
                // partners = data.data.data
                console.log(res.data.data)
                setProducts(res.data.data);
        })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
            Swal.fire("Produkti u fshi!", "", "success").then();
          } else if (result.isDenied) {
            Swal.fire("Produkti nuk u fshi!", "", "error");
          }
        });
      };

    return (
        <>
            <div className="page-name">
                <h3>Paisjet në dispozicion</h3>
            </div>
        <div className='sales pt2'>
            <div className="row col-sm-12">
                <div className="col-sm-3">
                    <select className="form-control" id="exampleFormControlSelect1" onChange={changeSelectOptionHandler}>
                        <option>Të gjithë produktet</option>
                        <option>IMEI</option>
                        <option>Emri Produktit</option>
                        <option>Partneri</option>
                    </select>
                </div>
                <div className="col-sm-9">
                    <input 
                        type="text" 
                        id="myInput" 
                        className="form-control search-bar"  
                        placeholder="Kërko paisjen..."
                        onChange={getByProduct}/>
                </div>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Emri produktit</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Data</th>
                    <th scope="col">Çmimi blerës</th>
                    <th scope="col">Çmimi shitës</th>
                    <th scope="col">Partneri / Personi</th>
                    <th scope="col">Nr. Fakturës / Nr. ID</th>
                    <th scope="col">Kategoria</th>
                    <th scope="col">Edit / Delete</th>
                    </tr>
                </thead>
                {[...products].reverse().map((product, id, key) =>
                <tbody>
                    <tr>
                    <th scope="row" key={product._id}>1</th>
                    <td>{product.product_name}</td>
                    <td>{product.imei}</td>
                    <td>{product.date}</td>
                    <td>{product.buying_price}</td>
                    <td>{product.selling_price}</td>
                    <td>{product.buyer || product.name_surname}</td>
                    <td>{product.facture_number || product.id_number}</td>
                    <td>{product.category}</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete" onClick={() => removeProduct(product._id)}><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                </tbody>
                )}
            </table>
        </div>
        </>
    )
}

export default Products
