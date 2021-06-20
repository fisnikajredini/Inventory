module.exports = ({ gar, cart_items, firstName, lastName, garantionDate, product_name, imei, logo }) => {
   const today = new Date();
   return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 12px;
             line-height: 16px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 40px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 25px;
             line-height: 25px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             .item-terms {
                 font-size: 9px !important;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
            <h1 class="justify-center">Garancion</h1>
             <table cellpadding="0" cellspacing="0" >
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="http://5guardian.store/wp-content/uploads/2021/06/logo.png"
                               style="width:100%; max-width:100px;"></td>
                            <td>
                               Data: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`} <br/>
                               Mobiphone - Tetove <br/>
                               Kompleks Bazar, Tetove <br/>
                               079227007 <br/>
                               mobiphonetetovo@gmail.com
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Klienti: ${gar.firstName} ${gar.lastName}  <br/>
                            </td>
                            <td>
                               PIB: 4028016529113
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Produkti:</td>
                   <td>Detajet e produktit</td>
                </tr>
                <tr class="item">
                   <td>Emri i produktit:</td>
                   <td>${cart_items[0].product_name}</td>
                </tr>
                <tr class="item">
                   <td>IMEI: </td>
                   <td>${cart_items[0].imei}</td>
                </tr>
             </table>
             <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                              <strong> Garancioni vlen deri: ${gar.garantionDate}</strong>
                            </td>
                         </tr>
                      </table>
                      <br/>
                      <ul class="item">
                 <li>Garantniot rok na proizvodot e 12 meseci od datumot naveden vo garantniot list.</li>
                 <li>Dopolnitelnata oprema *baterija, polnaci, kabli, slusalka, ne podelexi na garancija.</li>
                 <li>Softverski instalacija ne podelezhat na garancija.</li>
                 <li>Garancija ne vazhi vo slucaj na oshtetuvana predizvik od mehaniko ili termiko oshtetuvane od elikricen udar od grom, pozhardozhd, blaga.</li>
                 <li>Garancija ne vazhi se zabelezhat bilo kakvi izmeni, prepravki ili falsifikuvana.</li>
                 <li>Garancija ne vazhi dokolku korisnikot instalira softver koj e neovlasten od strana na proizvoditelot.</li>
                 <li>Garancijata prestanuva da vazi dokolku uredot bil servisiran vo drug servis.</li>
                 <li>Vo slucaj na defekt na proizvodot od strana na izdavacot vo rok od 30 dena od denot na podnesuvanje na reklamacijata defektot treba da bide ostranet dokolku defektot ne moze da se ostrani vo ovaj period proizvodot treba da se zameni so drug proizvod.</li>
                 <li>Klijentot se obvrzuva da gi ispolni uslovite na garancijata da rakuva pravilno so uredot i ke go upotreba isklucivo spored upatstvata dadeni of proizvoditelot.</li>
             </ul>
                   </td>
                </tr>
             <br />
             
             <!-- <h1 class="justify-center">Total price: 98989</h1> -->
          </div>
       </body>
    </html>
    `;
};