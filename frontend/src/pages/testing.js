import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';
// import * as AiIcons from 'react-icons/ai';


const RightbarNav = styled.nav` 
    right: ${({ rightbar }) => (rightbar ? '16px' : '-100%')};
    transition: 350ms;
    z-index: 10;
    height: 800px;
`;

function Sales() {
    const [rightbar, setRightbar] = useState(false);
    const showRightbar = () => setRightbar(!rightbar);
    const [products, setProducts] = useState ([]);
    //const [searchBar, setSearchBar] = useState("");
    const [selected, setSelected] = useState("");


    useEffect(() => {
        axios.get('/products/get').then(res=>{
           // partners = data.data.data
            console.log(res.data.data)
            // setProducts(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);

    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    function getByProduct(event){
        if(selected === "IMEI"){
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit"){ 
            getByNameProduct(event.target.value)
        }
    }
    
    function getByImeiProduct(event){
        let route = '/products/get/byimei' ;
        axios.post(route,{imei:event}).then(data=>{
            console.log(data.data.data);
            setProducts(data.data.data);
        })
    }
    
    function getByNameProduct(event){
        let route = '/products/get/byname' ;
        axios.post(route,{name:event}).then(data=>{
            console.log(data.data.data);
            setProducts(data.data.data);
        })
    }
    

    return (
        <>
            <div className="page-name">
                <h3>Shitjet</h3>
                <div className="cashier" onClick={showRightbar}><FaIcons.FaCashRegister/></div>
            </div>
        <div className='sales pt2'>
            <div className="row col-sm-12">
                <div className="col-sm-3">
                    <select className="form-control" id="exampleFormControlSelect1" onChange={changeSelectOptionHandler}>
                        <option>IMEI</option>
                        <option>Emri Produktit</option>
                    </select>
                </div>
                <div className="col-sm-9">
                    <input 
                        type="text" 
                        id="myInput" 
                        className="form-control search-bar"  
                        placeholder="Kërko paisjen..."
                        onChange={getByProduct}/>
                </div>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Emri produktit</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Data</th>
                    <th scope="col">Blerësi</th>
                    <th scope="col">Çmimi</th>
                    </tr>
                </thead>
                {products.map((product, key) => 
                <tbody>
                    <tr>
                    <th scope="row" key={product.id}>1</th>
                    <td>{product.product_name}</td>
                    <td>{product.imei}</td>
                    <td>{product.date}</td>
                    <td>{product.buyer}</td>
                    <td>{product.selling_price}</td>
                    </tr>
                </tbody>
                )}
            </table>
        </div>
        <RightbarNav rightbar={rightbar} className="sales-tab">
            <div className="container pt2">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Mënyra e pagesës:</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>Para në dorë</option>
                            <option>Kartelë</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
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
                <div className="col-sm-12">
                    <div className="form-group">
                        <label for="tabel" className="form-label">Totali final:</label>
                        <input type="input" placeholder="totali final " className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
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
                    <div className="col-sm-6 </div>">
                        <button type="button" className="btn btn-danger">Anulo</button>
                    </div>
                    <div className="col-sm-6 </div>">
                        <button type="button" className="btn btn-success">Vazhdo</button>
                    </div>
                </div>
            </div>
        </RightbarNav>
        </>

    )
}

export default Sales
