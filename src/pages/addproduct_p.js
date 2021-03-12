import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

const Company_b = styled(Link)`
`;

const addproduct_p = () => {
    return (
        <>
            <div className="page-name">
                <h3>Shto paisje</h3>
            </div>
            <div className='addproduct'>
                <div className='top-filter-cont'>
                    <div className="filter-product">
                        <Company_b className="company-b-2" to={'./addproduct'}><BiIcons.BiBuildingHouse /> Kompani</Company_b>
                        <div className="person-b-2"> <HiIcons.HiOutlineUserAdd /> Person Fizik</div>
                    </div>
                </div>
                <div className="product-fields container input-group">
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Shifra</label>
                        <input type="number" placeholder="Gjenerim Automatik" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Emri i Produktit</label>
                        <input type="input" className="form-control" id="product-name" aria-describedby="emri-produktit"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">IMEI</label>
                        <input type="number" className="form-control" id="imei" aria-describedby="imei"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Kategoria</label>
                        <select className="form-control" id="shifra" aria-describedby="shifra"></select>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Data</label>
                        <input type="date" className="form-control" id="product-name" aria-describedby="emri-produktit"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Emri dhe Mbiemri</label>
                        <input type="input" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Nr. Kontakti</label>
                        <input type="number" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Nr. Letërnjoftimit</label>
                        <input type="number" className="form-control" id="imei" aria-describedby="imei"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Çmimi blerës</label>
                        <input type="number" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Çmimi shitës</label>
                        <input type="number" className="form-control" id="product-name" aria-describedby="emri-produktit"></input>
                    </div>
                    <div className="col-sm-12 align-btn-center pb2">
                        <button type="button" className="btn btn-success btn-size">Shto Produktin</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addproduct_p
