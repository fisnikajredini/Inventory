import React, { useState, useEffect } from 'react';

function Printimei() {
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 print-product-card">
                    <label className="product-name-p">iPhone 11Pro Max 128gb White</label><br/>
                    <label className="product-imei-p">213123312312132</label>
                </div>
                <div className="col-sm-4 print-product-card">
                    <label className="product-name-p">iPhone 8 64gb Black</label><br/>
                    <label className="product-imei-p">213123312312132</label>
                </div>
                <div className="col-sm-4 print-product-card">
                    <label className="product-name-p">Samsung J8 128gb White</label><br/>
                    <label className="product-imei-p">213123312312132</label>
                </div>
            </div>
            <div className="row center">
                <button className="btn btn-success">Print</button>
            </div>
        </div>
    )
}

export default Printimei;