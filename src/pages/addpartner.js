import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Partnerbutton = styled(Link)`
`;

const addpartner = () => {
    return (
        <>
            <div className="page-name">
                <h3>Shto partner</h3>
            </div>
        <div className='addpartner pt2'>
            <div className="partner-container container input-group">
                <div className="col-sm-4">
                    <label for="tabel" className="form-label">Shifra</label>
                    <input type="number" placeholder="Gjenerim Automatik" className="form-control" id="shifra" aria-describedby="shifra"></input>
                </div>
                <div className="col-sm-4">
                    <label for="tabel" className="form-label">Emri partnerit</label>
                    <input type="input" className="form-control" id="shifra" aria-describedby="shifra"></input>
                </div>
                <div className="col-sm-4">
                    <label for="tabel" className="form-label">Nr. Kontakti</label>
                    <input type="number" className="form-control" id="shifra" aria-describedby="shifra"></input>
                </div>
                <div className="col-sm-12 align-btn-center p2">
                    <div className="col-sm-4">
                        <Partnerbutton type="button" className="btn btn-warning btn-size" to={'./allpartners'} >Shiko partnerët</Partnerbutton>
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-success btn-size">Shto partnerin</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default addpartner
