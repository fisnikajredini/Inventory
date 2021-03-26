import React, {useState} from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const RightbarNav = styled.nav` 
    right: ${({ rightbar }) => (rightbar ? '16px' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const Sales = () => {
    const [rightbar, setRightbar] = useState(false)
    const showRightbar = () => setRightbar(!rightbar)

    return (
        <>
            <div className="page-name">
                <h3>Shitjet</h3>
                <div className="cashier" onClick={showRightbar}><FaIcons.FaCashRegister/></div>
            </div>
        <div className='sales pt2'>
            <input type="text" id="myInput" className="form-control search-bar" placeholder="Kërko paisjen..."></input>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Emri produktit</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Data</th>
                    <th scope="col">Blerësi</th>
                    <th scope="col">Çmimi</th>
                    <th scope="col">Sasia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>iPhone 8 plus</td>
                    <td>545466548786</td>
                    <td>12.05.2019</td>
                    <td>Fisnik</td>
                    <td>150</td>
                    <td>1</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Samsung s5</td>
                    <td>546865421100</td>
                    <td>16.09.2020</td>
                    <td>Niki</td>
                    <td>1200</td>
                    <td>1</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Huawei</td>
                    <td>7687541286453</td>
                    <td>28.09.2021</td>
                    <td>Buda</td>
                    <td>900</td>
                    <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RightbarNav rightbar={rightbar} className="sales-tab">
            <div className="container pt2">
                <div className="col-sm-12">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Mënyra e pagesës:</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Para në dorë</option>
                            <option>Kartelë</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="tabel" className="form-label">Totali:</label>
                        <input type="input" placeholder="automatik prej listes" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="tabel" className="form-label">Zbritje:</label>
                        <input type="input" placeholder="0.00" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="tabel" className="form-label">Totali final:</label>
                        <input type="input" placeholder="totali final " className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="tabel" className="form-label">Pranoj:</label>
                        <input type="input" placeholder="0.00" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="tabel" className="form-label">Kusur:</label>
                        <input type="input" placeholder="0.00" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div className="cart_container_btn pt2">
                    <div class="col-sm-6 </div>">
                        <button type="button" class="btn btn-danger">Anulo</button>
                    </div>
                    <div class="col-sm-6 </div>">
                        <button type="button" class="btn btn-success">Vazhdo</button>
                    </div>
                </div>
            </div>
        </RightbarNav>
        </>

    )
}

export default Sales
