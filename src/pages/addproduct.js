import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

const Person_b = styled(Link)`
`;

const addproduct = () => {
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
                    <label for="tabel" className="form-label">Blerësi</label>
                        <select className="form-control" id="shifra" aria-describedby="shifra"></select>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Çmimi blerës</label>
                        <input type="number" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Çmimi shitës</label>
                        <input type="number" className="form-control" id="product-name" aria-describedby="emri-produktit"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Nr. fakturës</label>
                        <input type="number" className="form-control" id="imei" aria-describedby="imei"></input>
                    </div>
                    <div className="col-sm-4">
                            <button type="button" className="btn btn-success btn-size-2">
                            <AiIcons.AiOutlineAppstoreAdd />
                            Shto produkt
                            </button>
                    </div>
                    <div className="col-sm-12 align-btn-center pb2">
                        <button type="button" className="btn btn-success btn-size">Shto Produktin</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addproduct
