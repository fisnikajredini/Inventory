import React from 'react';



const sales = () => {
    return (
        <>
            <div className="page-name">
                <h3>Shitjet</h3>
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
        </>

    )
}

export default sales
