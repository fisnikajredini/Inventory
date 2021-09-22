import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import axios from 'axios';
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';

const imei = require('node-imei');
const imeichecker = new imei();

const Person_b = styled(Link)`
`;

const FactureBox = styled.nav`
  right: ${({ facturebox }) => (facturebox ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

function Addproduct() {

    // axios.get('/partners/get').then(data=>{
    //     partners = data.data.data
    //     console.log(partnerList)
    // })
    //Default Date current day
    const someDate = new Date();
    someDate.setDate(someDate.getDate());
    const date = someDate.toISOString().substr(0, 10);


    const [inputFields, setInputFields] = useState([{
        productName: '',
        productImei: '',
        productCategory: 'Celular',
        productDate: date,
        productPartner: '',
        productBuyPrice: '',
        productSellPrice: '',
    }]);

    const [products, setProducts] = useState([]);
    const [partners, setPartners] = useState([]);
    const [imeiValid, setImeiValid] = useState();
    const [fieldCheck, setfieldCheck] = useState();
    const [factureCheck, setFactureCheck] = useState();
    const [factureName, setFactureName] = useState();
    const [facturebox, setFacturebox] = useState(false);
    const showFacturebox = () => setFacturebox(!facturebox);
    const [buyprice, setBuyprice] = useState();
    const [text, setText] = useState("");
    const [facturevalues, setFacturevalues] = useState([
        { facturepayment: '' },
    ]);

    useEffect(() => {
        axios.get('/partners/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
        }).then()
            .catch(err => {
                console.log(err)
            })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);

    function totalBuy() {
        let buy_price2 = 0;
        for (let i = 0; i < inputFields.length; i++) {
            buy_price2 += JSON.parse(inputFields[i].productBuyPrice);
        }
        setBuyprice(buy_price2);
    }

    function handleSubmit(e) {
        // e.preventDefault();
        if (
            inputFields[0].productName != null &&
            inputFields[0].productName != "" &&
            inputFields[0].productName != undefined &&
            inputFields[0].productImei != null &&
            inputFields[0].productImei != "" &&
            inputFields[0].productImei != undefined &&
            inputFields[0].productCategory != null &&
            inputFields[0].productCategory != "" &&
            inputFields[0].productCategory != undefined &&
            inputFields[0].productDate != null &&
            inputFields[0].productDate != "" &&
            inputFields[0].productDate != undefined &&
            inputFields[0].productPartner != null &&
            inputFields[0].productPartner != "" &&
            inputFields[0].productPartner != undefined &&
            inputFields[0].productBuyPrice != null &&
            inputFields[0].productBuyPrice != "" &&
            inputFields[0].productBuyPrice != undefined &&
            inputFields[0].productSellPrice != null &&
            inputFields[0].productSellPrice != "" &&
            inputFields[0].productSellPrice != undefined &&
            text!= null &&
            text != "" &&
            text != undefined

        ) {
            let buy_price = 0;
            for (let i = 0; i < inputFields.length; i++) {
                buy_price += JSON.parse(inputFields[i].productBuyPrice);
                // setBuyprice(buy_price);
                console.log("buy price", buy_price)
                axios.post('/products/add/company', {
                    product_name: inputFields[i].productName,
                    imei: inputFields[i].productImei,
                    category: inputFields[i].productCategory,
                    date: inputFields[0].productDate,
                    buyer: inputFields[0].productPartner,
                    buying_price: inputFields[i].productBuyPrice,
                    selling_price: inputFields[i].productSellPrice,
                    facture_number: text,

                }).then();
            }
            Swal.fire({
                icon: "success",
                confirmButtonText: `OK`,
                title: "Produkti u shtua me sukses",
                showConfirmButton: true,
                timer: 1500,
            }).then(
                axios.post('/factures/add', {
                    facture_id: text,
                    facture_date: inputFields[0].productDate,
                    facture_price: buy_price,
                    facture_payment: facturevalues.facturepayment,
                    facture_issuer: inputFields[0].productPartner,

                }).then(() => {
                    setInputFields([{
                        productName: '',
                        productImei: '',
                        productCategory: 'Celular',
                        productDate: date,
                        productPartner: '',
                        productBuyPrice: '',
                        productSellPrice: '',
                    }])
                    setFacturevalues([{ facturepayment: '' }])
                    setText("")
                })
            );
        } else {
            Swal.fire({
                icon: "error",
                title: "Plotësoni të gjitha fushat",
                showConfirmButton: true,
                timer: 1500,
            });
        }
        console.log("InputFields", inputFields);
    };

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    function handleChangeFacture(e) {
        const values = { ...facturevalues };
        values[e.target.name] = e.target.value;
        setFacturevalues(values);
        // console.log(values)

    }

    const handleChangeInputImei = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);

        if (imeichecker.isValid(event.target.value)) {

            setImeiValid(<AiIcons.AiFillCheckCircle />)
            setfieldCheck("valid")
            console.log("true")

        } else if (imeichecker.isValid(event.target.value) === false) {
            console.log("false")
            // console.log("false")
            setImeiValid(<ImIcons.ImCross />)
            setfieldCheck("invalid")
        }

    }

    const checkFacture = (text) => {
        let matches = []
        if (products && products.length) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                if (product.facture_number && product.facture_number.length) {
                    return product.facture_number.match(regex)
                } 
            });
            if (matches && matches.length) {
                console.log('true', matches)
                setFactureCheck("red-brd")
                setFactureName("invalid-fac")
            } else {
                console.log('false', matches)
                setFactureCheck("grn-brd")
                setFactureName("valid-fac")

            }
        } 
        // setProducts(matches);
        setText(text);
        // setInputFields([{productRecieptNumber: text}])
    }

    function refreshPage() {
        window.location.reload(false);
    }

    //Function to duplicate the fields
    const handleAddFields = () => {
        setInputFields([...inputFields, {
            productName: '',
            productImei: '',
            productCategory: 'Celular',
            productDate: inputFields[0].productDate,
            productPartner: inputFields[0].productPartner,
            productBuyPrice: '',
            productSellPrice: '',
        }])
    }
    //Function to remove the fields
    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    function DownloadFacture() {
        let pdf_values = { pro: [...inputFields] }
        // let products;
        // let pdf_values = { pro:inputFields }
        axios.post('/create-facture', pdf_values)
            .then(() => axios.get('fetch-facture', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Facture.pdf');
            })
    }


    return (
        <>
            <div className="page-name">
                <h3>Shto paisje</h3>
            </div>
            <div className='addproduct'>
                <div className='top-filter-cont'>
                    <div className="filter-product">
                        <div className="company-b"><BiIcons.BiBuildingHouse /> Kompani</div>
                        <Person_b className="person-b" to={'./addproduct-p'}> <HiIcons.HiOutlineUserAdd /> Person Fizik</Person_b>
                    </div>
                </div>
                <div className="form-container">
                    {inputFields.map((inputField, index) => (
                        <div className="product-fields container input-group" key={index}>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Emri i Produktit</label>
                                <input type="input" required name="productName" className="form-control" value={inputField.productName} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                            </div>
                            {inputField.productCategory == "Celular" ?
                                <div class="col-sm-4">
                                    <label for="tabel" className="form-label">IMEI</label>
                                    <div class="input-group mb-2 imei-field">
                                        <div class="input-group-prepend">
                                            {/* <div class="input-group-text">{imeiValid}</div> */}
                                            <div className={`${fieldCheck} input-group-text`}>{imeiValid}</div>
                                        </div>
                                        <input type="number"
                                            name="productImei"
                                            maxLength="15"
                                            onInput={maxLengthCheck}
                                            className="form-control small-input"
                                            value={inputField.productImei}
                                            id="inlineFormInputGroup"
                                            onChange={event => handleChangeInputImei(index, event)}
                                            aria-describedby="imei"></input>
                                    </div>
                                </div> :
                                <div class="col-sm-4">
                                    <label for="tabel" className="form-label">IMEI</label>
                                    <div class="input-group mb-2 imei-field">
                                        <input type="input"
                                            name="productImei"
                                            className="form-control"
                                            value={inputField.productImei}
                                            id="inlineFormInputGroup"
                                            onChange={event => handleChangeInput(index, event)}
                                            aria-describedby="imei"></input>
                                    </div>
                                </div>}
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Kategoria</label>
                                <select className="form-control" name="productCategory" value={inputField.productCategory} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                    <option>Celular</option>
                                    <option>Tablet</option>
                                </select>
                            </div>
                            {index == 0 ?
                                <div class="col-sm-4">
                                    <label for="tabel" className="form-label">Data</label>
                                    <input type="date" className="form-control" name="productDate" value={inputField.productDate} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                                </div> : null
                            }
                            {index == 0 ?
                                <div class="col-sm-4">
                                    <label for="tabel" className="form-label">Blerësi</label>
                                    <select className="form-control" name="productPartner" value={inputField.productPartner} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                        <option value="" disabled selected>Zgjidhe Partnerin</option>
                                        {partners.map(partner => (
                                            <option key={partner.id}>{partner.company_name}</option>
                                        ))}
                                    </select>
                                </div> : null
                            }
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Çmimi blerës</label>
                                <input type="number" className="form-control" name="productBuyPrice" value={inputField.productBuyPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                            </div>
                            <div class="col-sm-4">
                                <label for="tabel" className="form-label">Çmimi shitës</label>
                                <input type="number" className="form-control" name="productSellPrice" value={inputField.productSellPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                            </div>
                            {index == 0 ?
                                <div class="col-sm-4">
                                    <label for="tabel" className={`${factureName} form-label`}>Nr. fakturës</label>
                                    <input type="text" className={`${factureCheck} form-control`} name="productRecieptNumber" value={text} onChange={(e) => checkFacture(e.target.value)}  aria-describedby="imei"></input>
                                </div> : null
                            }
                            <div className="col-sm-12">
                                <Button variant="outlined" className="dupf-btn" color="error" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                    <AiIcons.AiOutlineMinusCircle />
                                </Button>
                                <Button variant="contained" className="dupf-btn" disableElevation onClick={handleAddFields}>
                                    <AiIcons.AiOutlinePlusCircle />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="col-sm-12 align-btn-center pb2">
                        <Button variant="contained" type="submit" onClick={
                            () => {
                                totalBuy();
                                showFacturebox();
                            }}>Shto Produktin</Button>
                        {/* <button type="submit" className="btn btn-success btn-size" onClick={
                            () => {DownloadFacture(); handleSubmit();}}>Shto Produktin</button> */}
                    </div>
                </div>
            </div>
            <FactureBox facturebox={facturebox} className="garantion-form" onSubmit={handleSubmit}>
                <div className="close-form" onClick={() => {
                    showFacturebox();
                }}>X</div>
                <div className="popup-form">
                    <div className="form-group">
                        <h3 className="title pt-2">Detajet e fakturës:</h3>
                    </div>
                    <div className="col-md-12 sales-p-box">
                        <div className="form-group gar-pro-det">
                            <label for="tabel" className="form-label garnacion-label">Nr fakturës: <div
                                className="garnacion-pdetails">{text}</div></label> <br />
                            <label for="tabel" className="form-label garnacion-label">Data:
                                <div className="garnacion-pdetails">{inputFields[0].productDate}</div>
                            </label> <br />
                            <label for="tabel" className="form-label garnacion-label">Vlera:
                                <div className="garnacion-pdetails">{buyprice}</div>
                            </label> <br />
                            <label for="tabel" className="form-label garnacion-label b-none pb-none">Partneri:
                                <div className="garnacion-pdetails">{inputFields[0].productPartner}</div>
                            </label> <br />
                        </div>
                    </div>
                    <div className="row garantion-inputs col-sm-12">
                        <div className="col-md-6">
                            <label for="tabel" className="form-label">Pagesa finale</label>
                        </div>
                        <div className="col-md-6">
                            <input type="number" class="form-control" id="inlineFormInputGroup"
                                name="facturepayment"
                                value={facturevalues.facturepayment}
                                onChange={e => handleChangeFacture(e)}
                                aria-describedby="emri-produktit"></input>
                        </div>
                    </div>
                    <div className="row garantion-inputs col-sm-12">
                        <div className="form-group">
                            <Button variant="contained"
                                onClick={() => {
                                    handleSubmit();
                                    showFacturebox();
                                    DownloadFacture();
                                }} >Ruaj ndryshimet</Button>
                            {/* <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product);
                                        onRemove(product);
                                        showEditProduct();
                                    }}>Ruaj ndryshimet</button> */}
                        </div>
                    </div>
                </div>
            </FactureBox>
        </>
    )
}

export default Addproduct;