import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import axios from 'axios';
import Swal from "sweetalert2";


const Person_b = styled(Link)`
`;

function Addproduct() {

    // axios.get('/partners/get').then(data=>{
    //     partners = data.data.data
    //     console.log(partnerList)
    // })
    //Default Date current day
    const someDate = new Date();
    someDate.setDate(someDate.getDate());
    const date = someDate.toISOString().substr(0, 10);

    
    const [inputFields, setInputFields] = useState ([{ 
        productName: '', 
        productImei: '', 
        productCategory:'Celular', 
        productDate: date, 
        productPartner: '', 
        productBuyPrice: '', 
        productSellPrice: '', 
        productRecieptNumber: ''
    }]);

    const [partners, setPartners] = useState ([])
    
    useEffect(() => {
        axios.get('/partners/get').then(res=>{
           // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);
     
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            inputFields[0].productName != null &&
            inputFields[0].productName != "" &&
            inputFields[0].productName != undefined &&
            inputFields[0].productImei != null &&
            inputFields[0].productImei != "" &&
            inputFields[0].productImei != undefined &&
            inputFields[0].productCategory != null &&
            inputFields[0].productCategory != "" &&
            inputFields[0].productCategory != undefined &&
            inputFields[0].productDate != null &&
            inputFields[0].productDate != "" &&
            inputFields[0].productDate != undefined &&
            inputFields[0].productPartner != null &&
            inputFields[0].productPartner != "" &&
            inputFields[0].productPartner != undefined &&
            inputFields[0].productBuyPrice != null &&
            inputFields[0].productBuyPrice != "" &&
            inputFields[0].productBuyPrice != undefined &&
            inputFields[0].productSellPrice != null &&
            inputFields[0].productSellPrice != "" &&
            inputFields[0].productSellPrice != undefined &&
            inputFields[0].productRecieptNumber != null &&
            inputFields[0].productRecieptNumber != "" &&
            inputFields[0].productRecieptNumber != undefined

            
          )  {
              
        axios.post('/products/add/company', {
            product_name: inputFields[0].productName,
            imei: inputFields[0].productImei,
            category: inputFields[0].productCategory,
            date: inputFields[0].productDate,
            buyer: inputFields[0].productPartner,
            buying_price: inputFields[0].productBuyPrice,
            selling_price: inputFields[0].productSellPrice,
            facture_number: inputFields[0].productRecieptNumber,
            
        }).then();
        Swal.fire({
            icon: "success",
            confirmButtonText: `OK`,
            title: "Produkti u shtua me sukses",
            showConfirmButton: true,
            timer: 1500,
          }).then();
        } else {
          Swal.fire({
            icon: "error",
            title: "Plotësoni të gjitha fushat",
            showConfirmButton: true,
            timer: 1500,
          });
        }
        console.log("InputFields", inputFields);
    };
    
    const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    }
    //Function to duplicate the fields
    const handleAddFields = () => {
        setInputFields([...inputFields, { 
            productName: '', 
            productImei: '', 
            productCategory:'Celular', 
            productDate: date, 
            productPartner: inputFields.productPartner, 
            productBuyPrice: '', 
            productSellPrice: '', 
            productRecieptNumber: inputFields.productRecieptNumber
        }])
    }
    //Function to remove the fields
    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }


    
    return (
            <>
            <div className="page-name">
                <h3>Shto paisje</h3>
            </div>
            <div className='addproduct'>
                <div className='top-filter-cont'>
                    <div className="filter-product">
                        <div className="company-b"><BiIcons.BiBuildingHouse /> Kompani</div>
                        <Person_b className="person-b" to={'./addproduct-p'}> <HiIcons.HiOutlineUserAdd /> Person Fizik</Person_b>
                    </div>
                </div>
                <div className="form-container" onSubmit={handleSubmit}>
                { inputFields.map((inputField, index) => (
                    <div className="product-fields container input-group" key={index}>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Emri i Produktit</label>
                            <input type="input" required name="productName" className="form-control" value={inputField.productName} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">IMEI</label>
                            <input type="number" name="productImei" className="form-control" value={inputField.productImei} onChange={event => handleChangeInput(index, event)} aria-describedby="imei"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Kategoria</label>
                            <select className="form-control" name="productCategory" value={inputField.productCategory} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                <option>Celular</option>
                                <option>Tablet</option>
                            </select>
                        </div>
                        {index==0 ?
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Data</label>
                            <input type="date" className="form-control" name="productDate" value={inputField.productDate} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div> :null
                            }
                            {index==0 ?
                        <div class="col-sm-4">
                        <label for="tabel" className="form-label">Blerësi</label>
                            <select className="form-control" name="productPartner" value={inputField.productPartner} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                <option value="" disabled selected>Zgjidhe Partnerin</option>
                                {partners.map(partner => (
                                <option key={partner.id}>{partner.company_name}</option> 
                                ))}
                            </select>
                        </div> :null
                            }
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Çmimi blerës</label>
                            <input type="number" className="form-control" name="productBuyPrice" value={inputField.productBuyPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Çmimi shitës</label>
                            <input type="number" className="form-control" name="productSellPrice" value={inputField.productSellPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div>
                            {index==0 ?
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Nr. fakturës</label>
                            <input type="number" className="form-control" name="productRecieptNumber" value={inputField.productRecieptNumber} onChange={event => handleChangeInput(index, event)} aria-describedby="imei"></input>
                        </div> :null
                            }
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-danger btn-size-4" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <AiIcons.AiOutlineMinusCircle />
                            </button>
                            <button type="button" className="btn btn-success btn-size-5" onClick={handleAddFields}>
                            <AiIcons.AiOutlinePlusCircle />
                            </button>
                        </div>
                    </div>
                    )) }
                    <div className="col-sm-12 align-btn-center pb2">
                        <button type="submit" className="btn btn-success btn-size" onClick={handleSubmit}>Shto Produktin</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct;