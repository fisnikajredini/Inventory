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
                const exist = editItem.find(x => x.id === product._id);
                if (exist) {
                    setEditItem(editItem.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                    )
                    );
                } else {
                    setEditItem([...editItem, { ...product, qty: 1 }]);
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

    function updateProduct(product) {
        let inputs = products;
        inputs[0].product_name = product.product_name;
        inputs[0].imei = product.imei;
        inputs[0].date = product.date;
        inputs[0].facture_number = product.facture_number;
        inputs[0].buying_price = product.buying_price;
        inputs[0].selling_price = product.selling_price;

        axios.post('/product/edit', inputs)
        .then(console.log(inputs[0]))
        .catch(err => {
            console.log(err)
        })
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
                            <div>
                                <div className="row garantion-inputs col-sm-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">Emri i Produktit</label>
                                            <input type="input" required name="productName" defaultValue={product.product_name} className="form-control" aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">IMEI</label>
                                            <input type="number" name="productImei" maxLength="15" onInput={maxLengthCheck} defaultValue={product.imei} className="form-control small-input" aria-describedby="imei"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">Data</label>
                                            <input type="date" className="form-control" name="productDate" defaultValue={product.date} aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="tabel" className="form-label">Nr. fakturës</label>
                                            <input type="text" className="form-control" name="productRecieptNumber" defaultValue={product.facture_number || product.id_number} aria-describedby="imei"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="tabel" className="form-label">Çmimi blerës</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">€</div>
                                            </div>
                                            <input type="number" class="form-control" id="inlineFormInputGroup" defaultValue={product.buying_price} name="productBuyPrice" aria-describedby="shifra"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="tabel" className="form-label">Çmimi shitës</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">€</div>
                                            </div>
                                            <input type="number" class="form-control" id="inlineFormInputGroup" defaultValue={product.selling_price} name="productSellPrice" aria-describedby="emri-produktit"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product);
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
