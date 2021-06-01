import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';
import Swal from "sweetalert2";
// import * as AiIcons from 'react-icons/ai';


const RightbarNav = styled.nav` 
    right: ${({ rightbar }) => (rightbar ? '16px' : '-100%')};
    transition: 350ms;
    z-index: 10;
    height: 800px;
`;

const GarantionForm = styled.nav`
    right: ${({ garantionform }) => (garantionform ? '0px' : '-100%')};
    transition: 100ms;
    z-index: 11;
`;

function Sales() {
    const [rightbar, setRightbar] = useState(false);
    const showRightbar = () => setRightbar(!rightbar);
    const [garantionform, setGarantionfom] = useState(false);
    const showgarantionform = () => setGarantionfom(!garantionform);
    const [products, setProducts] = useState([]);
    //const [searchBar, setSearchBar] = useState("");
    const [selected, setSelected] = useState("IMEI");
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [recieve, setRecieve] = useState([]);

    const [garantionValues, setGarantionValues] = useState ([
        {firstName: '', lastName: '', contactNr: '', garantionDate: ''},  
    ]);

    // const onAdd = (product) => {
    //     const exist = cartItems.find(x => x.id === product._id);
    //     if(exist) {
    //         setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty +1} : x
    //             )
    //         );
    //     } else {
    //         setCartItems([...cartItems, {...product, qty: 1}]);
    //     }
    // }

    function onAdd(product) {
        Swal.fire({
            title:
                "Dëshironi të shitni produktin? " + product.product_name + " " + product.imei,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                const exist = cartItems.find(x => x.id === product._id);
                if (exist) {
                    setCartItems(cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                    )
                    );
                } else {
                    setCartItems([...cartItems, { ...product, qty: 1 }]);
                }
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u selektua!", "", "error");
            }
        });
    };


    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
            )
            );
        }
    }

    const itemPrice = cartItems.reduce((a, c) => a + c.selling_price * c.qty, 0);
    const discountPrice = itemPrice - discount;
    const change = recieve - discountPrice;

    useEffect(() => {
        axios.get('/products/get').then(res => {
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

    function getByProduct(event) {
        if (selected === "IMEI") {
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit") {
            getByNameProduct(event.target.value)
        }
    }

    function getByImeiProduct(event) {
        let route = '/products/get/byimei';
        axios.post(route, { imei: event }).then(data => {
            if (data.data.data !== null) {
                console.log(data.data.data);
                setProducts([data.data.data]);
            }
        })
    }

    function getByNameProduct(event) {
        let route = '/products/get/byname';
        axios.post(route, { name: event }).then(data => {
            console.log(data.data.data);
            setProducts(data.data.data);
        })
    }

    function addToSalesTable(product) {
        let inputs = product;
        axios.post('/sales/add', inputs, {
            first_name: garantionValues.firstName,
            last_name: garantionValues.lastName,
            client_tel_num: garantionValues.contactNr,
            garantion_date: garantionValues.garantionDate,
            selled_price: discountPrice
        })
        .then(
            console.log("product deleted and added successfully")
        )
        .catch(err => console.log(err))
        
    }

    // function handleChangeGarantion(event){
    //     setGranationValues({
    //         ...setGranationValues,
    //         //[event.target.name]: event.target.value
    //     })
    //     //save with use state 4 fields name surname date num tel and 
    //     //product.push(the 4 new values of the inputs)
    // }

    function handleChangeGarantion(index, event){
        const values = [...garantionValues];
        values[index][event.target.name] = event.target.value;
        setGarantionValues(values);

    }

    return (
        <>
            <div className="page-name">
                <h3>Shitjet</h3>
                <div className="cashier" onClick={showRightbar}><FaIcons.FaCashRegister /></div>
            </div>
            <div className='sales pt2' onAdd={onAdd}>
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
                            onChange={getByProduct} />
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
                            <th scope="col">Shite produktin</th>
                        </tr>
                    </thead>
                    {console.log(products)}
                    {products.map((product, key) =>
                        <tbody>
                            <tr>
                                <th scope="row" key={product.id}>1</th>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td>{product.buyer}</td>
                                <td>{product.selling_price}</td>
                                <td><button onClick={() => onAdd(product)} className="btn btn-success">Add To Cart</button></td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <RightbarNav rightbar={rightbar} className="sales-tab">
                <div cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} className="container pt2">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <div>{cartItems.length === 0 && <div>Nuk keni zgjedhur asnjë produkt</div>}</div>
                            {cartItems.map((product) => (
                                <div key={product.id} className="row">
                                    <div className="col-12 product-name">{product.product_name} <br /> {product.imei}</div>
                                    {/* <div className="col-2">
                                    <button onClick={()=>onAdd(product)} className="add">+</button>
                                    <button onClick={()=>onRemove(product)} className="btn btn-danger">-</button>
                                </div>
                                <div className="col-2">
                                    {product.selling_price.toFixed() + "€"}
                                </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    {cartItems.length !== 0 && (
                        <>
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
                                    <label for="tabel" className="form-label">Totali: {itemPrice.toFixed() + "€"}</label>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="tabel" className="form-label">Zbritje:</label>
                                    <input type="input" placeholder="0.00" className="form-control" id="shifra" onChange={event => setDiscount(event.target.value)} aria-describedby="shifra"></input>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label for="tabel" className="form-label product-name">Totali final: {discountPrice.toFixed() + "€"}</label>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label for="tabel" className="form-label">Pranoj:</label>
                                    <input type="input" placeholder="0.00" className="form-control" id="shifra" onChange={event => setRecieve(event.target.value)} aria-describedby="shifra"></input>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="tabel" className="form-label">Kusur: {change.toFixed() + "€"}</label>

                                </div>
                            </div>
                            <div className="cart_container_btn pt2">
                                <div className="col-sm-6 </div>">
                                    {cartItems.map((product) => (
                                        <button type="button" className="btn btn-danger" onClick={() => onRemove(product)} >Anulo</button>
                                    ))}
                                </div>
                                <div className="col-sm-6">
                                    <button type="button" className="btn btn-success" onClick={showgarantionform}>Vazhdo</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </RightbarNav>
            <GarantionForm garantionform={garantionform} className="garantion-form">
                <div className="close-form" onClick={showgarantionform}>X</div>
                <div className="popup-form" onSubmit={addToSalesTable} >
                    <div className="form-group">
                        <h3 className="title pt-2">Garancioni:</h3>
                    </div>
                    { garantionValues.map((garantionValue, index) => (
                       <div key={index}> 
                    <div className="row garantion-inputs col-sm-12">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="input" placeholder="Emri" name="firstName" className="form-control" id="shifra" aria-describedby="shifra" value={garantionValue.firstName} onChange={event => handleChangeGarantion(index, event)}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="input" placeholder="Mbiemri" name="lastName" className="form-control" id="shifra" aria-describedby="shifra" value={garantionValue.lastName} onChange={event => handleChangeGarantion(index, event)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row garantion-inputs col-sm-12">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="input" placeholder="Nr. Telefonit" name="contactNr" className="form-control" id="shifra" aria-describedby="shifra" value={garantionValue.contactNr} onChange={event => handleChangeGarantion(index, event)}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="input" placeholder="Garancion / Muaj" name="garantionDate" className="form-control" id="shifra" aria-describedby="shifra" value={garantionValue.garantionDate} onChange={event => handleChangeGarantion(index, event)}></input>
                            </div>
                        </div>
                    </div>
                    </div>
                            )) }
                    {cartItems.map((product) => (
                        <div className="col-md-12" key={product.id}>
                            <div className="form-group">
                                <label for="tabel" className="form-label garnacion-label">Produkti: <div className="garnacion-pdetails">{product.product_name}</div></label> <br />
                                <label for="tabel" className="form-label garnacion-label">IMEI:<div className="garnacion-pdetails">{product.imei}</div></label> <br />
                                <label for="tabel" className="form-label garnacion-label">Cmimi: <div className="garnacion-pdetails">{discountPrice.toFixed() + "€"}</div></label>
                            </div>
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={addToSalesTable(product)}>Ruaj</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </GarantionForm>
        </>

    )
}

export default Sales
