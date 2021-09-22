import React, { useState, useEffect, useRef } from 'react';
import styled2 from 'styled-components';
import { styled } from '@mui/material/styles';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const EditProduct = styled2.nav`
  right: ${({ editproduct }) => (editproduct ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

function Products() {

    const [products, setProducts] = useState([]);
    const [partners, setPartners] = useState([]);
    const [editproduct, setEditProduct] = useState(false);
    const showEditProduct = () => setEditProduct(!editproduct);
    const [checked, setChecked] = useState("false");
    const [checked2, setChecked2] = useState("false");
    const [checked3, setChecked3] = useState("false");
    const [checked4, setChecked4] = useState("false");
    const [editItem, setEditItem] = useState([]);
    const [productsMatch, setProductMatch] = useState([]);
    const [text, setText] = useState("");
    const [inputFields, setInputFields] = useState([{
        productName: '',
        productImei: '',
        productCategory: '',
        productDate: '',
        productPartner: '',
        productBuyPrice: '',
        productSellPrice: '',
        productRecieptNumber: '',
        productPName: '',
        productPIdNr: ''
    }]);

    useEffect(() => {
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
            setProductMatch(res.data.data)
        }).then()
            .catch(err => {
                console.log(err)
            })
        axios.get('/partners/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        }).then()
            .catch(err => {
                console.log(err)
            })
    }, []);

    function onEdit(product) {
        Swal.fire({
            title:
                "Dëshironi të ndryshoni produktin? " + product.product_name + " " + product.imei,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                setEditItem([...editItem, product]);
                setInputFields([{
                    productName: product.product_name,
                    productImei: product.imei,
                    productCategory: product.category,
                    productDate: product.data,
                    productPartner: product.buyer,
                    productBuyPrice: product.buying_price,
                    productSellPrice: product.selling_price,
                    productRecieptNumber: product.facture_number,
                    productPName: product.name_surname,
                    productPIdNr: product.tel_num

                }])
                console.log(editItem)
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u selektua!", "", "error");
            }
        });
    };

    const onRemove = (productRemove) => {
        setEditItem(
            editItem.filter((product) => product !== productRemove)
        )
    }

    const onChangeText = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.date.toString().match(regex) || product.imei.toString().match(regex) || (product.buyer == null ? product.name_surname.match(regex) : product.buyer.match(regex)) || (product.facture_number == null ? product.id_number.match(regex) : product.facture_number.match(regex));
            });
        } else {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || (product.buyer == null ? product.name_surname.match(regex) : product.buyer.match(regex)) || (product.facture_number == null ? product.id_number.match(regex) : product.facture_number.match(regex));
            });
        }
        console.log('macthes', matches)
        // setProductMatch(products);
        setProductMatch(matches);
        setText(text);
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
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
                        setProducts(res.data.data)
                        setProductMatch(res.data.data)
                    })
                        .catch(err => {
                            console.log(err)
                        })
                })
                    .catch(err => {
                        console.log(err)
                    })
                Swal.fire({
                    icon: "success",
                    confirmButtonText: `OK`,
                    title: "Produkti u fshi!",
                    showConfirmButton: true,
                    timer: 1500,
                }).then();
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u fshi!", "", "error");
            }
        });
    };

    const handleColums = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked(false)
            // console.log("true")

        } else if (checked === false) {
            // console.log("false")
            setChecked(true)
        }

    }
    const handleColums2 = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked2(false)
            console.log("true")

        } else if (checked === false) {
            console.log("false")
            setChecked2(true)
        }

    }
    const handleColums3 = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked3(false)
            console.log("true")

        } else if (checked === false) {
            console.log("false")
            setChecked3(true)
        }

    }
    const handleColums4 = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked4(false)
            console.log("true")

        } else if (checked === false) {
            console.log("false")
            setChecked4(true)
        }

    }

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    function getTotalBuy() {
        let grandTotal = 0;
        const rowTotals = products.map(
          row => (row.buying_price) || 0
        );
        if (rowTotals.length > 0) {
          grandTotal = rowTotals.reduce((acc, val) => acc + val);
        }
        return grandTotal;
      }

    function getTotalSell() {
        let grandTotal = 0;
        const rowTotals = products.map(
          row => (row.selling_price) || 0
        );
        if (rowTotals.length > 0) {
          grandTotal = rowTotals.reduce((acc, val) => acc + val);
        }
        return grandTotal;
      }

    function updateProduct(id) {
        let changed_inputs = {
            id: id._id, fields: {
                product_name: inputFields[0].productName,
                imei: inputFields[0].productImei,
                category: inputFields[0].productCategory,
                date: inputFields[0].productDate,
                name_surname: inputFields[0].productPName,
                tel_num: inputFields[0].productPContactNr,
                id_number: inputFields[0].productPIdNr,
                buying_price: inputFields[0].productBuyPrice,
                selling_price: inputFields[0].productSellPrice,
                buyer: inputFields[0].productPartner,
                facture_number: inputFields[0].productRecieptNumber,
            }
        }
        axios.post('/product/edit', changed_inputs)
            .then(() => {
                axios.get('/products/get').then(res => {
                    // partners = data.data.data
                    console.log(res.data.data)
                    setProducts(res.data.data)
                    setProductMatch(res.data.data)
                }).then()
                    .catch(err => {
                        console.log(err)
                    })
            })
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
                    <FormGroup className="flex-row">
                        <FormControlLabel control={ <Switch onChange={handleColums2} name="gilad" size="small" /> } label="Nr. Kontaktit"/>
                        <FormControlLabel control={ <Switch onChange={handleColums} name="gilad" size="small" /> } label="Nr. Faktures"/>
                        <FormControlLabel control={ <Switch onChange={handleColums3} name="gilad" size="small" /> } label="Edit/Delete"/>
                        <FormControlLabel control={ <Switch onChange={handleColums4} name="gilad" size="small" /> } label="Çmimi blerës"/>
                    </FormGroup>
                        
                    {/* <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleColums2}></input>
                            <label class="form-check-label" for="inlineCheckbox1">Nr. Kontaktit</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Nr. Faktures</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleColums3}></input>
                            <label class="form-check-label" for="inlineCheckbox1">Edit/Delete</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums4}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Çmimi blerës</label>
                    </div> */}
                    </div> 
                    <div className="col-sm-9">
                        <div class="searchBox">
                            <input class="searchInput" type="text" name="" placeholder="Search" value={text} onChange={(e) => onChangeText(e.target.value)}/>
                            <button class="searchButton" href="#">
                            <AiIcons.AiOutlineSearch />
                            </button>
                        </div>
                        {/* <input
                             value={text}
                             type="text"
                             id="myInput"
                             className="form-control search-bar"
                             placeholder="Kërko paisjen..."
                             onChange={(e) => onChangeText(e.target.value)} /> */}
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow className="table-head">
                            <StyledTableCell>Emri produktit</StyledTableCell>
                            <StyledTableCell align="right">IMEI</StyledTableCell>
                            <StyledTableCell align="right">Data</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked4}>Çmimi blerës</StyledTableCell>
                            <StyledTableCell align="right">Çmimi shitës</StyledTableCell>
                            <StyledTableCell align="right">Partneri / Personi</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked}>Nr. Fakturës / Nr. ID</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked2}>Nr. Kontakti</StyledTableCell>
                            <StyledTableCell align="right">Kategoria</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked3}>Edit / Delete</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody className="table-data">
                        {productsMatch && [...productsMatch].reverse().map((product, id) => (
                            <TableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <StyledTableCell component="th" scope="row">{product.product_name}</StyledTableCell>
                            <StyledTableCell align="right">{product.imei}</StyledTableCell>
                            <StyledTableCell align="right">{product.date}</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked4}>{product.buying_price}</StyledTableCell>
                            <StyledTableCell align="right">{product.selling_price}</StyledTableCell>
                            <StyledTableCell align="right">{product.buyer || product.name_surname}</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked}>{product.facture_number || product.id_number}</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked2}>{product.tel_num || "Partner"}</StyledTableCell>
                            <StyledTableCell align="right">{product.category}</StyledTableCell>
                            <StyledTableCell className="edit-delete" hidden={checked3}><div className="edit" onClick={() => {
                                onEdit(product);
                                showEditProduct();
                            }}><FiIcons.FiEdit2 /></div><div className="delete" onClick={() => removeProduct(product._id)}><FiIcons.FiTrash /></div></StyledTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <table class="table table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Emri produktit</th>
                            <th scope="col">IMEI</th>
                            <th scope="col">Data</th>
                            <th scope="col" hidden={checked4}>Çmimi blerës</th>
                            <th scope="col">Çmimi shitës</th>
                            <th scope="col">Partneri / Personi</th>
                            <th scope="col" hidden={checked}>Nr. Fakturës / Nr. ID</th>
                            <th scope="col" hidden={checked2}>Nr. Kontakti</th>
                            <th scope="col">Kategoria</th>
                            <th scope="col" hidden={checked3}>Edit / Delete</th>
                        </tr>
                    </thead>
                    {productsMatch && [...productsMatch].reverse().map((product, id) => (
                        <tbody key={product._id}>
                            <tr>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td  hidden={checked4}>{product.buying_price}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.buyer || product.name_surname}</td>
                                <td hidden={checked}>{product.facture_number || product.id_number}</td>
                                <td hidden={checked2}>{product.tel_num || "Partner"}</td>
                                <td>{product.category}</td>
                                <td className="edit-delete" hidden={checked3}><div className="edit" onClick={() => {
                                    onEdit(product);
                                    showEditProduct();
                                }}><FiIcons.FiEdit2 /></div><div className="delete" onClick={() => removeProduct(product._id)}><FiIcons.FiTrash /></div></td>
                            </tr>
                        </tbody>
                    ))}
                    <tfoot class="table-dark">
                        <tr>
                            <td><strong>Totali:</strong></td>
                            <td></td>
                            <td></td>
                            <td hidden={checked4}><strong>{getTotalBuy()}</strong></td>
                            <td><strong>{getTotalSell()}</strong></td>
                            <td></td>
                            <td hidden={checked}></td>
                            <td hidden={checked2}></td>
                            <td></td>
                            <td hidden={checked3}></td>
                        </tr>
                    </tfoot>
                </table> */}
            </div>
            <EditProduct editproduct={editproduct} className="garantion-form">
                {editItem.map((product, idx) => (
                    <>
                    <div className="close-form" onClick={() => {
                        onRemove(product);
                        showEditProduct();
                    }}>X</div>
                        <div className="popup-form" key={idx}>
                            <div className="form-group">
                                <h3 className="title pt-2">Ndrysho produktin:</h3>
                            </div>
                            {inputFields.map((inputField, index) => (
                                <div key={index}>
                                    <div className="row garantion-inputs col-sm-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Emri i Produktit</label>
                                                <input type="input" name="productName"
                                                    value={inputField.productName}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    className="form-control"
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">IMEI</label>
                                                <input type="number" name="productImei" maxLength="15"
                                                    onInput={maxLengthCheck}
                                                    value={inputField.productImei}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    className="form-control small-input"
                                                    aria-describedby="imei"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Kategoria</label>
                                                <select className="form-control" name="productCategory"
                                                    value={inputField.productCategory}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra">
                                                    <option>Celular</option>
                                                    <option>Tablet</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Data</label>
                                                <input type="date" className="form-control"
                                                    name="productDate"
                                                    value={inputField.productDate}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                        {product.name_surname == null ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Blerësi</label>
                                                    <select className="form-control"
                                                        name="productPartner"
                                                        value={inputField.productPartner}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="shifra">
                                                        <option value="" disabled selected>Zgjidhe Partnerin</option>
                                                        {partners.map(partner => (
                                                            <option key={partner.id}>{partner.company_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div> :
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Blerësi</label>
                                                    <input type="text" className="form-control"
                                                        name="productPName"
                                                        value={inputField.productPName}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="emri-produktit"></input>
                                                </div>
                                            </div>
                                        }
                                        {product.id_number == null ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Nr. fakturës</label>
                                                    <input type="text" className="form-control"
                                                        name="productRecieptNumber"
                                                        value={inputField.productRecieptNumber}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="imei"></input>
                                                </div>
                                            </div> :
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Nr. Letërnjoftimit</label>
                                                    <input type="text" className="form-control"
                                                        name="productPIdNr"
                                                        value={inputField.productPIdNr}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="imei"></input>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Çmimi blerës</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="productBuyPrice"
                                                    value={inputField.productBuyPrice}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Çmimi shitës</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="productSellPrice"
                                                    value={inputField.productSellPrice}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                <Button variant="contained" 
                                    onClick={() => {
                                        updateProduct(product);
                                        onRemove(product);
                                        showEditProduct();
                                    }} >Ruaj ndryshimet</Button>
                                    {/* <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product);
                                        onRemove(product);
                                        showEditProduct();
                                    }}>Ruaj ndryshimet</button> */}
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