import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";

const EditProduct = styled.nav`
  right: ${({ editproduct }) => (editproduct ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

function Products() {

    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState("");
    const [editproduct, setEditProduct] = useState(false);
    const showEditProduct = () => setEditProduct(!editproduct);
    const [editItem, setEditItem] = useState([]);

    const [inputFields, setInputFields] = useState([{
        productName: '',
        productImei: '',
        productDate: '',
        productBuyPrice: '',
        productSellPrice: '',
        productRecieptNumber: ''
    }]);

    useEffect(() => {
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
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

    function onEdit(product) {
        Swal.fire({
            title:
                "Dëshironi të ndryshoni produktin? " + product.product_name + " " + product.imei,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                const exist = editItem.find(x => x.id === product.id);
                if (exist) {
                    setEditItem(editItem.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                    )
                    );
                    console.log(editItem)
                } else {
                    setEditItem([...editItem, { ...product, qty: 1 }]);
                    console.log(editItem)
                }
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u selektua!", "", "error");
            }
        });
    };

    const onRemove = (product) => {
        const exist = editItem.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setEditItem(editItem.filter((x) => x.id !== product.id));
        } else {
            setEditItem(editItem.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
            )
            );
        }
    }

    function getByProduct(event) {
        if (selected === "IMEI") {
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit") {
            getByNameProduct(event.target.value)
        } else if (selected === "Partneri") {
            getByPartnerProduct(event.target.value)
        } else if (selected === "Nr. Faktures") {
            getByFactureProduct(event.target.value)

        } else if (selected === "Të gjithë produktet") {
            axios.get('/products/get').then(res => {
                // partners = data.data.data
                console.log(res.data.data)
                setProducts(res.data.data)
            })
        }
    }

    function getByImeiProduct(event) {
        let route = '/products/get/byimei';
        axios.post(route, { imei: event }).then(data => {
            if (data.data.data !== null) {
                //console.log(data.data.data);
                setProducts([data.data.data]);
            }
        })
    }

    function getByNameProduct(event) {
        let route = '/products/get/byname';
        axios.post(route, { name: event }).then(data => {
            //console.log(data.data.data);
            setProducts(data.data.data);
        })
    }

    function getByPartnerProduct(event) {
        let route = '/products/get/bypartner';
        axios.post(route, { partnername: event }).then(data => {
            //console.log(data.data.data)
            setProducts(data.data.data);
        })

    }
    function getByFactureProduct(event) {
        let route = '/products/get/byfacture';
        axios.post(route, { nrfaktures: event }).then(data => {
            //console.log(data.data.data)
            setProducts(data.data.data);
        })

    }

    function removeProduct(id) {
        Swal.fire({
            title:
                "Dëshironi të fshini produktin ? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                let route = '/product/delete/product';
                console.log(id)
                axios.post(route, { id: id }).then(data => {
                    axios.get('/products/get').then(res => {
                        // partners = data.data.data
                        console.log(res.data.data)
                        setProducts(res.data.data);
                    })
                        .catch(err => {
                            console.log(err)
                        })
                })
                    .catch(err => {
                        console.log(err)
                    })
                Swal.fire("Produkti u fshi!", "", "success").then();
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u fshi!", "", "error");
            }
        });
    };

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    function updateProduct(id) {
        let route = '/product/edit';
        axios.post(route, {
            product_name: inputFields[0].productName,
            imei: inputFields[0].productImei,
            date: inputFields[0].productDate,
            buying_price: inputFields[0].productBuyPrice,
            selling_price: inputFields[0].productSellPrice,
            facture_number: inputFields[0].productRecieptNumber,
        })
        .then(console.log(inputFields[0]))
        .catch(err => {
            console.log(err)
        })
    }
    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    return (
        <>
            <div className="page-name">
                <h3>Paisjet në dispozicion</h3>
            </div>
            <div className='sales pt2' onEdit={onEdit}>
                <div className="row col-sm-12">
                    <div className="col-sm-3">
                        <select className="form-control" id="exampleFormControlSelect1" onChange={changeSelectOptionHandler}>
                            <option>Të gjithë produktet</option>
                            <option>IMEI</option>
                            <option>Emri Produktit</option>
                            <option>Nr. Faktures</option>
                            <option>Partneri</option>
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
                <table class="table table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Emri produktit</th>
                            <th scope="col">IMEI</th>
                            <th scope="col">Data</th>
                            <th scope="col">Çmimi blerës</th>
                            <th scope="col">Çmimi shitës</th>
                            <th scope="col">Partneri / Personi</th>
                            <th scope="col">Nr. Fakturës / Nr. ID</th>
                            <th scope="col">Kategoria</th>
                            <th scope="col">Edit / Delete</th>
                        </tr>
                    </thead>
                    {[...products].reverse().map((product, id, key) =>
                        <tbody key={product._id}>
                            <tr>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td>{product.buying_price}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.buyer || product.name_surname}</td>
                                <td>{product.facture_number || product.id_number}</td>
                                <td>{product.category}</td>
                                <td className="edit-delete"><div className="edit" onClick={() => {
                                    onEdit(product);
                                    showEditProduct();
                                }}><FiIcons.FiEdit2 /></div><div className="delete" onClick={() => removeProduct(product._id)}><FiIcons.FiTrash /></div></td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <EditProduct editproduct={editproduct} className="garantion-form">
                {editItem.map((product) => (
                    <>
                        <div className="close-form" onClick={() => {
                            onRemove(product);
                            showEditProduct();
                        }}>X</div>
                        <div className="popup-form">
                            <div className="form-group">
                                <h3 className="title pt-2">Ndrysho produktin:</h3>
                            </div>
                            {inputFields.map((inputField, index) => (
                            <div key={index}>
                                <div className="row garantion-inputs col-sm-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">{product._id}</label>
                                            <input type="input" required name="productName" value={inputField.productName} onChange={event => handleChangeInput(index, event)}className="form-control" aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">IMEI</label>
                                            <input type="number" name="productImei" maxLength="15" onInput={maxLengthCheck} value={inputField.productImei} onChange={event => handleChangeInput(index, event)}className="form-control small-input" aria-describedby="imei"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">Data</label>
                                            <input type="date" className="form-control" name="productDate" value={inputField.productDate} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">Nr. fakturës</label>
                                            <input type="text" className="form-control" name="productRecieptNumber" value={inputField.productRecieptNumber} onChange={event => handleChangeInput(index, event)}aria-describedby="imei"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="tabel" className="form-label">Çmimi blerës</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">€</div>
                                            </div>
                                            <input type="number" class="form-control" id="inlineFormInputGroup"  value={inputField.productBuyPrice} onChange={event => handleChangeInput(index, event)}  name="productBuyPrice" aria-describedby="shifra"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="tabel" className="form-label">Çmimi shitës</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">€</div>
                                            </div>
                                            <input type="number" class="form-control" id="inlineFormInputGroup" value={inputField.productSellPrice} onChange={event => handleChangeInput(index, event)} name="productSellPrice" aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product.id);
                                        onRemove(product);
                                        showEditProduct();
                                    }}>Ruaj ndryshimet</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </EditProduct>
        </>
    )
}

export default Products