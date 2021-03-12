import React from 'react';
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as CgIcons from 'react-icons/cg';
import * as BiIcons from 'react-icons/bi';

const Termsbutton = styled(Link)`
`;
const AddaccountButton = styled(Link)`
`;

const information = () => {
    return (
        <>
        <div className="page-name">
            <h3>Informacioni i kompaniës</h3>
        </div>
        <div className='information pt2'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 info-profile">
                            <div className="img-holder">
                                <img src={logo} />
                            </div>
                        <div className="file btn btn-lg btn-primary btn-upload">Ngarko logo
                            <input type="file" name="file" className="btn-upload-input"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        
                    </div>
                    <div className="col-sm-4 left-buttons">
                        <Termsbutton type="button" className="btn btn-success btn-size-2" to={'./terms'} ><CgIcons.CgFileDocument /> Terms and Condition</Termsbutton>
                        <AddaccountButton type="button" className="btn btn-primary btn-size-3" to={'./newuser'} ><BiIcons.BiUserPlus /> Krijo përdorues të ri</AddaccountButton>
                    </div>
                </div>
                <div className="container input-group company-fields p2">
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Emri kompaniës</label>
                        <input type="input" placeholder="Mobiphone" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Qyteti</label>
                        <input type="input" placeholder="Tetove" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Telefoni fix</label>
                        <input type="number" placeholder="044617740" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Addresa</label>
                        <input type="input" placeholder="Kompleks Bazar" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">PIB</label>
                        <input type="number" placeholder="4028016529113" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Telefoni mobil</label>
                        <input type="number" placeholder="079227007" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div class="col-sm-4">
                        <label for="tabel" className="form-label">Email</label>
                        <input type="email" placeholder="mobiphonetetove@gmail.com" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                <div className="col-sm-12 align-btn-center p2">
                    <div class="col-sm-4">
                        <button type="button" className="btn btn-success btn-size">Ruaj të dhënat</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default information
