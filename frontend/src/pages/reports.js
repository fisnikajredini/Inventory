import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import ReactToExcel from 'react-html-table-to-excel';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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


function Reports() {

    const [products, setProducts] = useState([]);
    const [productsMatch, setProductMatch] = useState([]);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState("false");
    const [checked2, setChecked2] = useState("false");
    const [checked3, setChecked3] = useState("false");

    useEffect(() => {
        axios.get('/sales/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
            setProductMatch(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    function removeSale(id) {
        Swal.fire({
            title:
                "Dëshironi të fshini produktin ? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                let route = '/sales/delete/product';
                console.log(id)
                axios.post(route, { id: id }).then(data => {
                    axios.get('/sales/get').then(res => {
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

    function refreshPage() {
        window.location.reload(false);
    }

    function addToProductsTable(e) {
        // console.log("object",e)
        // console.log(productsMatch)
        let inputs = [e];
        let id_to_del = inputs[0]._id;
        Swal.fire({
            title:
                "Dëshironi të riktheni produktin? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/products/add/report', inputs)
                    .then(
                        // console.log("deleted pro", id_to_del, inputs)
                        axios.post('/sales/delete/product', { id: id_to_del }).then(() => {
                            axios.get('/sales/get').then(res => {
                                // partners = data.data.data
                                console.log(res.data.data)
                                setProducts(res.data.data)
                                setProductMatch(res.data.data)
                            })
                        })
                            .catch(err => {
                                console.log(err)
                            })
                    ).then()
                    .catch(err => console.log(err))
                } else if (result.isDenied) {
                    Swal.fire("Produkti nuk u rikthye!", "", "error");
                }
            });
    }

    const onChangeText = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || product.last_name.match(regex) || product.first_name.match(regex) || product.date.toString().match(regex) || product.client_tel_num.toString().match(regex);
            });
        } else {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || product.last_name.match(regex) || product.first_name.match(regex) || product.date.toString().match(regex) || product.client_tel_num.toString().match(regex);
            });
        }
        console.log('macthes', matches)
        // setProductMatch(products);
        setProductMatch(matches);
        setText(text);
    }

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

    function getTotalSell() {
        let grandTotal = 0;
        const rowTotals = productsMatch.map(
          row => (row.selled_price == null ? row.selling_price : row.selled_price) || 0
        );
        if (rowTotals.length > 0) {
          grandTotal = rowTotals.reduce((acc, val) => acc + val);
        }
        return grandTotal;
      }

    function createAndDownloadReport() {
        // let products;
        let pdf_values = { pro: productsMatch }
        console.log(pdf_values)
        axios.post('/create-report', pdf_values)
            .then(() => axios.get('fetch-report', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Raporti.pdf');
            })
    }

    function createAndDownloadReportDaily() {
        // let products;
        let newProducts = [];
        let today = new Date();
        productsMatch.map((prod)=>{
            let checkDate = new Date(prod.date);
            if(checkDate.getFullYear() === today.getFullYear() 
            && checkDate.getMonth() === today.getMonth() 
            && checkDate.getDate() === today.getDate()){
                newProducts.push(prod)
            }
        })
        let pdf_values = { pro: newProducts }
        console.log(pdf_values)
        axios.post('/create-report', pdf_values)
            .then(() => axios.get('fetch-report', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Raporti.pdf');
            })
    }

    return (
        <>
            <div className="page-name">
                <h3>Raporti i shitjeve</h3>
            </div>
            <div className='reports pt2' onSubmit={(e) => addToProductsTable(e)}>
                
                <div className="row col-sm-12 pb2">
                    <div className="col-sm-3 checkboxes">
                    <FormGroup className="flex-row">
                        <FormControlLabel control={ <Switch onChange={handleColums} name="gilad" size="small" /> } label="Shitësi"/>
                        <FormControlLabel control={ <Switch onChange={handleColums3} name="gilad" size="small" /> } label="Partneri"/>
                        <FormControlLabel control={ <Switch onChange={handleColums2} name="gilad" size="small" /> } label="Edit"/>
                    </FormGroup>
                        {/* <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleColums2}></input>
                            <label class="form-check-label" for="inlineCheckbox1">Edit</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Shitësi</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums3}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Partneri</label>
                        </div> */}
                    </div>
                    <div className="col-sm-8">
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
                    <div className="exportButtonContainer col-sm-1">
                {/* <Button variant="contained">Contained</Button> */}
                    {/* <Button id="exportButton1" variant="outlined" onClick={() => { createAndDownloadReport(); }}><FaIcons.FaFilePdf />Gjenero PDF</Button>
                    <ReactToExcel table="exportTable" filename="Raporti" sheet="sheet 1" buttonText="Exporto ne Excel"/>
                    <Button id="exportButton3" variant="outlined" onClick={() => { createAndDownloadReportDaily(); }}><HiIcons.HiOutlineDocumentReport /> Raporti Ditor</Button> */}
                    <div>
                    <Button
                        id="basic-button"
                        variant="outlined"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Export <AiIcons.AiFillCaretDown />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { createAndDownloadReport(); handleClose(); }}>Gjenero PDF</MenuItem>
                        <MenuItem onClick={handleClose}><ReactToExcel table="exportTable" className="btn-expr-excl" filename="Raporti" sheet="sheet 1" buttonText="Exporto ne Excel"/></MenuItem>
                        <MenuItem onClick={() => { createAndDownloadReportDaily(); handleClose(); }}>Raporti Ditor</MenuItem>
                    </Menu>
                    </div>
                </div>
                </div>
                <TableContainer component={Paper} id="exportTable">
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow className="table-head">
                            <StyledTableCell>Emri produktit</StyledTableCell>
                            <StyledTableCell align="right">IMEI</StyledTableCell>
                            <StyledTableCell align="right">Data</StyledTableCell>
                            <StyledTableCell align="right">Garancion</StyledTableCell>
                            <StyledTableCell align="right">Blerësi</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked3}>Partneri</StyledTableCell>
                            <StyledTableCell align="right">Çmimi shitës</StyledTableCell>
                            <StyledTableCell align="right">Nr. Klientit</StyledTableCell>
                            <StyledTableCell align="right" hidden="true">Çmimi Blerës</StyledTableCell>
                            <StyledTableCell align="right" hidden="true">Nr. Fakturës</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked}>Shitësi</StyledTableCell>
                            <StyledTableCell align="right" hidden={checked2}>Rikthe</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody className="table-data">
                    {productsMatch && [...productsMatch].reverse().map((product, id) => (
                        <TableRow
                        key={product._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                                <StyledTableCell>{product.product_name}</StyledTableCell>
                                <StyledTableCell align="right">{product.imei}</StyledTableCell>
                                <StyledTableCell align="right">{product.date}</StyledTableCell>
                                <StyledTableCell align="right">{product.garantion_date}</StyledTableCell>
                                <StyledTableCell align="right">{product.first_name} {product.last_name}</StyledTableCell>
                                <StyledTableCell align="right" hidden={checked3}>{product.buyer || product.name_surname}</StyledTableCell>
                                <StyledTableCell align="right">{product.selled_price || product.selling_price}</StyledTableCell>
                                <StyledTableCell align="right">{product.client_tel_num}</StyledTableCell>
                                <StyledTableCell align="right" hidden="true">{product.buying_price}</StyledTableCell>
                                <StyledTableCell align="right" hidden="true">{product.facture_number}</StyledTableCell>
                                <StyledTableCell align="right" hidden={checked}>Irfan Ferati</StyledTableCell>
                                {/* <td>{product.category}</td> */}
                                <StyledTableCell className="edit-delete" hidden={checked2}>
                                    <div className="edit"
                                        onClick={() => { addToProductsTable(product); }}>
                                        <RiIcons.RiArrowGoBackFill /></div>
                                    {/* <div className="delete"
                                        onClick={() => removeSale(product._id)}>
                    <FiIcons.FiTrash /></div> */}
                                        </StyledTableCell> 
                            
                        </TableRow>
                    ))}
                    </TableBody>
                        <TableHead>
                    <TableRow className="table-head">
                            <StyledTableCell><strong>Totali:</strong></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell hidden={checked3}></StyledTableCell>
                            <StyledTableCell align="right"><strong>{getTotalSell()}</strong></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell hidden={checked}></StyledTableCell>
                            <StyledTableCell hidden={checked2}></StyledTableCell>
                    </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Reports

