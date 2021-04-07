import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';

const allpartners = () => {
    return (
        <>
            <div className="page-name">
                <h3>Partnerët e biznesit</h3>
            </div>
        <div className='allpartners pt6'>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Partneri</th>
                    <th scope="col">Nr. Kontaktit</th>
                    <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>2B Media</td>
                    <td>070888888</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Firma 2</td>
                    <td>075668952</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Firma 6</td>
                    <td>076123456</td>
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default allpartners
