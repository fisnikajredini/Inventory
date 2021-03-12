import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';

const products = () => {
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
                    <th scope="col">Blerësi</th>
                    <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>iPhone 8 plus</td>
                    <td>545466548786</td>
                    <td>12.05.2019</td>
                    <td>120</td>
                    <td>150</td>
                    <td>Fisnik</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Samsung s5</td>
                    <td>546865421100</td>
                    <td>16.09.2020</td>
                    <td>500</td>
                    <td>1200</td>
                    <td>Niki</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Huawei</td>
                    <td>7687541286453</td>
                    <td>28.09.2021</td>
                    <td>600</td>
                    <td>900</td>
                    <td>Buda</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default products
