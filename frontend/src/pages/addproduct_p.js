import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import axios from 'axios';
import Swal from "sweetalert2";

const Company_b = styled(Link)`
`;

function Addproduct_p({partners}) {
    console.log(partners)
    //Default Date current day
    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var date = someDate.toISOString().substr(0, 10);

    const [inputFields, setInputFields] = useState([
        {
            productName: '',
            productImei: '',
            productCategory: '',
            productDate: '',
            productPName: '',
            productPContactNr: '',
            productPIdNr: '',
            productBuyPrice: '',
            productSellPrice: ''
        },
    ]);

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
            inputFields[0].productPName != null &&
            inputFields[0].productPName != "" &&
            inputFields[0].productPName != undefined &&
            inputFields[0].productPIdNr != null &&
            inputFields[0].productPIdNr != "" &&
            inputFields[0].productPIdNr != undefined &&
            inputFields[0].productPContactNr != null &&
            inputFields[0].productPContactNr != "" &&
            inputFields[0].productPContactNr != undefined &&
            inputFields[0].productBuyPrice != null &&
            inputFields[0].productBuyPrice != "" &&
            inputFields[0].productBuyPrice != undefined &&
            inputFields[0].productSellPrice != null &&
            inputFields[0].productSellPrice != "" &&
            inputFields[0].productSellPrice != undefined 
          ) {
        axios.post('/product/add/person', {
                product_name: inputFields[0].productName,
                imei: inputFields[0].productImei,
                category: inputFields[0].productCategory,
                date: inputFields[0].productDate,
                name_surname: inputFields[0].productPName,
                tel_num: inputFields[0].productPContactNr,
                id_number: inputFields[0].productPIdNr,
                buying_price: inputFields[0].productBuyPrice,
                selling_price: inputFields[0].productSellPrice,
            }
        ).then()
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

    return (
        <>
            <div className="page-name">
                <h3>Shto paisje</h3>
            </div>
            <div className='addproduct'>
                <div className='top-filter-cont'>
                    <div className="filter-product">
                        <Company_b className="company-b-2"
                                   to={'./addproduct'}><BiIcons.BiBuildingHouse/> Kompani</Company_b>
                        <div className="person-b-2"><HiIcons.HiOutlineUserAdd/> Person Fizik</div>
                    </div>
                </div>
                <div className="form-container" onSubmit={handleSubmit}>
                    {inputFields.map((inputField, index) => (
                        <div className="product-fields container input-group" key={index}>
                            {/* <div class="col-sm-4">
                            <label for="tabel" className="form-label">Shifra</label>
                            <input type="number" placeholder="Gjenerim Automatik" className="form-control" id="shifra" aria-describedby="shifra"></input>
                        </div> */}
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Emri i Produktit</label>
                                <input type="input" name="productName" className="form-control"
                                       value={inputField.productName}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="emri-produktit"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">IMEI</label>
                                <input type="number" name="productImei" className="form-control"
                                       value={inputField.productImei}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="imei"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Kategoria</label>
                                <select className="form-control" name="productCategory"
                                        value={inputField.productCategory}
                                        onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                    <option>Celular</option>
                                    <option>Tablet</option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Data</label>
                                <input type="date" className="form-control" name="productDate"
                                       value={inputField.productDate + date}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="emri-produktit"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Emri dhe Mbiemri</label>
                                <input type="input" className="form-control" name="productPName"
                                       value={inputField.productPName}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="shifra"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Nr. Kontakti</label>
                                <input type="number" className="form-control" name="productPContactNr"
                                       value={inputField.productPContactNr}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="shifra"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Nr. Letërnjoftimit</label>
                                <input type="number" className="form-control" name="productPIdNr"
                                       value={inputField.productPIdNr}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="imei"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Çmimi blerës</label>
                                <input type="number" className="form-control" name="productBuyPrice"
                                       value={inputField.productBuyPrice}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="shifra"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Çmimi shitës</label>
                                <input type="number" className="form-control" name="productSellPrice"
                                       value={inputField.productSellPrice}
                                       onChange={event => handleChangeInput(index, event)}
                                       aria-describedby="emri-produktit"></input>
                            </div>
                        </div>
                    ))}
                    <div className="col-sm-12 align-btn-center pb2">
                        <button type="submit" className="btn btn-success btn-size" onClick={handleSubmit}>Shto
                            Produktin
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct_p;
