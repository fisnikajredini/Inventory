import React, { useState, useEffect } from 'react';
import styled2 from 'styled-components';
import { styled } from '@mui/material/styles';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import logo from '../logo.png'
// import * as AiIcons from 'react-icons/ai';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const RightbarNav = styled2.nav`
  right: ${({ rightbar }) => (rightbar ? '16px' : '-100%')};
  transition: 350ms;
  z-index: 10;
  height: 800px;
`;

const GarantionForm = styled2.nav`
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
    const [productsMatch, setProductMatch] = useState([]);
    const [text, setText] = useState("");

    const [garantionValues, setGarantionValues] = useState([
        { firstName: '', lastName: '', contactNr: '', garantionDate: '', sold_price: '', },
    ]);

    function onAdd(product) {
        Swal.fire({
            title:
                "Dëshironi të shitni produktin? " + product.product_name + " " + product.imei,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("cartitems", cartItems)
                const exist = cartItems.find(x => x.id === product._id);
                if (exist) {
                    console.log("1")
                    setCartItems(cartItems.map(x => x.id === product._id ? { ...exist, qty: exist.qty + 1 } : x
                    )
                    );
                    console.log(cartItems)
                } else {
                    console.log("2",cartItems)
                    setCartItems([...cartItems, { ...product, qty: 1 }]);
                    console.log("----",[...cartItems, { ...product, qty: 1 }])
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
        setGarantionValues('')
    }

    // const itemPrice = cartItems.reduce((a, c) => a + c.selling_price * c.qty, 0);

    useEffect(() => {
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            // console.log(res.data.data)
            setProducts(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);

    const onChangeText = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex);
            });
        }
        console.log('macthes', matches)
        setProductMatch(matches);
        setText(text);
    }

    // const changeSelectOptionHandler = (event) => {
    //     setSelected(event.target.value);
    // };

    // function getByProduct(event) {
    //     if (selected === "IMEI") {
    //         getByImeiProduct(event.target.value);
    //     } else if (selected === "Emri Produktit") {
    //         getByNameProduct(event.target.value)
    //     }
    // }

    // function getByImeiProduct(event) {
    //     let route = '/products/get/byimei';
    //     axios.post(route, { imei: event }).then(data => {
    //         if (data.data.data !== null) {
    //             // console.log(data.data.data);
    //             setProducts([data.data.data]);
    //         }
    //     })
    // }

    // function getByNameProduct(event) {
    //     let route = '/products/get/byname';
    //     axios.post(route, { name: event }).then(data => {
    //         // console.log(data.data.data);
    //         setProducts(data.data.data);
    //     })
    // }

    function addToSalesTable(e) {
        const exist = productsMatch.find(x => x._id === cartItems[0]._id);
        let inputs = [exist];

        var d = new Date();
        d.setMonth(d.getMonth() + JSON.parse(garantionValues.garantionDate));   
        
        var gardate = new Date(d)
        garantionValues.garantionDate = `${gardate.getDate()}-${gardate.getMonth()+1}-${gardate.getFullYear()}`;

        inputs[0].first_name = garantionValues.firstName;
        inputs[0].last_name = garantionValues.lastName;
        inputs[0].date = new Date().getTime();
        inputs[0].client_tel_num = garantionValues.contactNr;
        inputs[0].garantion_date = d;
        inputs[0].selled_price = garantionValues.sold_price;

        let id_to_del = inputs[0]._id;

        axios.post('/sales/add', inputs)
            .then(
                axios.post('/product/delete/product', { id: id_to_del }).then(() => {
                    axios.get('/products/get').then(res => {
                        // partners = data.data.data
                        // console.log(res.data.data)
                        setProducts(res.data.data)
                        setText('')
                        setProductMatch('')
                    })
                })
                    .catch(err => {
                        console.log(err)
                    })
            )
            .catch(err => console.log(err))

    }

    function handleChangeGarantion(e) {
        const values = { ...garantionValues };
        values[e.target.name] = e.target.value;
        setGarantionValues(values);
        // console.log(values)

    }

    function createAndDownloadPdf() {
        // let products;
        let pdf_values = { gar:garantionValues, 
        cart_items: cartItems}
        axios.post('/create-pdf', pdf_values)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Garancioni.pdf');
            })
    }

    return (
        <>
            <div className="page-name">
                <h3>Shitjet</h3>
                {/* <div className="cashier" onClick={showRightbar}><FaIcons.FaCashRegister /></div> */}
            </div>
            <div className='sales pt2' onAdd={onAdd}>
                <div className="row col-sm-12 search-place">
                        <input
                            value={text}
                            type="text"
                            id="myInput"
                            className="form-control search-bar"
                            placeholder="Kërko paisjen..."
                            onChange={(e) => onChangeText(e.target.value)} />
                            <div className="search-icon">
                            <AiIcons.AiOutlineSearch />
                            </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className="table-head">
                                <StyledTableCell>Emri produktit</StyledTableCell>
                                <StyledTableCell align="right">IMEI</StyledTableCell>
                                <StyledTableCell align="right">Data</StyledTableCell>
                                <StyledTableCell align="right">Partneri</StyledTableCell>
                                <StyledTableCell align="right">Çmimi</StyledTableCell>
                                <StyledTableCell align="right">Shite produktin</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-data">
                        {/* {console.log(products)} */}
                            {productsMatch && [...productsMatch].reverse().map((product, id) => (
                                <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <StyledTableCell>{product.product_name}</StyledTableCell>
                                        <StyledTableCell align="right">{product.imei}</StyledTableCell>
                                        <StyledTableCell align="right">{product.date}</StyledTableCell>
                                        <StyledTableCell align="right">{product.buyer || product.name_surname}</StyledTableCell>
                                        <StyledTableCell align="right">{product.selling_price}</StyledTableCell>
                                        <StyledTableCell align="right">
                                        <Button variant="contained" color="info" onClick={() => {
                                                onAdd(product);
                                                showgarantionform();}}>Add To Cart</Button>
                                            {/* <button onClick={() => {
                                                onAdd(product);
                                                showgarantionform();
                                            }} className="btn btn-success">Add To Cart
                                        </button> */}
                                        </StyledTableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <GarantionForm garantionform={garantionform} onRemove={onRemove} onSubmit={(e) => addToSalesTable(e)}
                className="garantion-form">
                {cartItems.map((product) => (
                    <>
                        <div className="close-form" onClick={() => {
                            onRemove(product);
                            showgarantionform();
                        }}>X
                        </div>
                        <div className="popup-form">
                            <div className="form-group">
                                <h3 className="title pt-2">Garancioni:</h3>
                            </div>
                            <div>
                                <div className="col-md-12 sales-p-box">
                                    <div className="form-group gar-pro-det">
                                        <label for="tabel" className="form-label garnacion-label">Produkti: <div
                                            className="garnacion-pdetails">{product.product_name}</div></label> <br />
                                        <label for="tabel" className="form-label garnacion-label b-none pb-none">IMEI:
                                            <div className="garnacion-pdetails">{product.imei}</div>
                                        </label> <br />
                                    </div>
                                </div>
                                <div className="row garantion-inputs col-sm-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="input" placeholder="Emri" name="firstName"
                                                className="form-control" id="firstName" aria-describedby="shifra"
                                                value={garantionValues.firstName}
                                                onChange={e => handleChangeGarantion(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="input" placeholder="Mbiemri" name="lastName"
                                                className="form-control" id="lastName" aria-describedby="shifra"
                                                value={garantionValues.lastName}
                                                onChange={e => handleChangeGarantion(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row garantion-inputs col-sm-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="input" placeholder="Nr. Telefonit" name="contactNr"
                                                className="form-control" id="contactNr" aria-describedby="shifra"
                                                value={garantionValues.contactNr}
                                                onChange={e => handleChangeGarantion(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="number" placeholder="Garancion / Muaj" name="garantionDate"
                                                className="form-control" id="garantionDate" aria-describedby="shifra"
                                                value={garantionValues.garantionDate}
                                                onChange={e => handleChangeGarantion(e)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12" key={product.id}>
                                <div className="form-group gar-pro-det-2">
                                    <div className="form-label garnacion-label b-none pb-none center-input"> 
                                    <div className="garnacion-pdetails"><input type="number" name="sold_price"
                                            className="form-control" id="sold_price"
                                            placeholder="Zbritje/Çmimi në €"
                                            onChange={e => handleChangeGarantion(e)}
                                            defaultValue={garantionValues.sold_price} /></div></div>
                                </div>
                                <div className="row garantion-inputs col-sm-12">
                                    <div className="form-group">
                                    <Button variant="contained" type="submit" 
                                    onClick={() => {
                                        addToSalesTable(product);
                                            createAndDownloadPdf();
                                            onRemove(product);
                                            showgarantionform();}}>Përfundo shitjen</Button>
                                        {/* <button type="button" className="btn btn-success" onClick={() => {
                                            addToSalesTable(product);
                                            createAndDownloadPdf();
                                            onRemove(product);
                                            showgarantionform();
                                        }}>Ruaj
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                ))}

            </GarantionForm>
        </>

    )
}

export default Sales

