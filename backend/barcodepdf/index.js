module.exports = ({ pro }) => {
  var JsBarcode = require('jsbarcode');
  const { DOMImplementation, XMLSerializer } = require('xmldom');
  const xmlSerializer = new XMLSerializer();
  const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  JsBarcode(svgNode, pro[0].imei, {
    xmlDocument: document,
    format: "CODE128",
    displayValue: true,
    fontSize: 12,
    textAlign: "center",
    width: 1,
    height: 20
  })

  const svgText = xmlSerializer.serializeToString(svgNode);


  return `
    <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>Barcodes</title>
         <style>
         .grid-container {
          display: grid;
          grid-template-columns: auto auto auto;
          padding: 5px;
          float: left;
          width: 30%;
          height: 128px;
        }
        .grid-item {
          border: 1px solid rgba(0, 0, 0, 0.8);
          padding: 10px;
          font-size: 12px;
          text-align: center;
          height: 97.8px;
        }
        .text-center{
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .text-center svg{
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          font-size:16px;
          padding-bottom:5px;
        }
        .price {
          font-size: 14px;
        }
         </style>
      </head>
      <body>
      ${pro.map((product, key) =>`
          <div class="grid-container" ${key=product._id}> 
              <div class="grid-item">
                  <div class="text-center">
                    <div class="title">${product.product_name.toUpperCase()}</div>
                    <div class="price">${product.selling_price * 61.5} MKD (${product.selling_price}€)</div>
                    <svg>${svgText}</svg>
                  </div>
              </div>
          </div>
        `)}
      </body>
    </html>
  `
};