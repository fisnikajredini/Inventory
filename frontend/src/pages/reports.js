import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";


function Reports() {

    const [products, setProducts] = useState ([]);

    useEffect(() => {
        axios.get('/sales/get').then(res=>{
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

    function removeSale(id) {
        Swal.fire({
          title:
            "Dëshironi të fshini produktin ? ",
          showDenyButton: true,
          confirmButtonText: `PO`,
          denyButtonText: `JO`,
        }).then((result) => {
          if (result.isConfirmed) {
            let route ='/sales/delete/product';
            console.log(id)
            axios.post(route,{id:id}).then(data=>{
                axios.get('/sales/get').then(res=>{
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
                <h3>Raporti i shitjeve</h3>
            </div>
        <div className='reports pt2'>
            <div className="exportButtonContainer">
                <button id="exportButton1" class="btn btn-lg btn-warning clearfix"><FaIcons.FaFilePdf /> Export to PDF</button>
                <button id="exportButton2" class="btn btn-lg btn-success clearfix"><RiIcons.RiFileExcel2Fill /> Export to Excel</button>
            </div>
            <table id="exportTable"  class="table table-hover table-sm">
                <thead class="table-dark">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Emri produktit</th>
                <th scope="col">IMEI</th>
                <th scope="col">Data</th>
                <th scope="col">Garancion</th>
                <th scope="col">Blerësi</th>
                <th scope="col">Partneri</th>
                <th scope="col">Çmimi shitës</th>
                <th scope="col">Shitësi</th>
                <th scope="col">Edit/Delete</th>
                </tr>
            </thead>
            {[...products].reverse().map((product, id, key) =>
                <tbody>
                    <tr>
                    <th scope="row" key={product._id}>1</th>
                    <td>{product.product_name}</td>
                    <td>{product.imei}</td>
                    <td>{product.date}</td>
                    <td>{product.garantion_date}</td>
                    <td>{product.first_name} {product.last_name}</td>
                    <td>{product.buyer || product.name_surname}</td>
                    <td>{product.selled_price || product.selling_price}</td>
                    <td>Get Sales Username</td>
                    {/* <td>{product.category}</td> */}
                    <td className="edit-delete"><div className="edit"><RiIcons.RiArrowGoBackFill /></div><div className="delete" onClick={() => removeSale(product._id)}><FiIcons.FiTrash /></div></td>
                    </tr>
                </tbody>
                )}
            </table>
            </div>
        </>
    )
}

export default Reports

