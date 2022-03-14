import React from "react";
import { useState } from "react";
import "./calculater.css"
import { SendOutlined, EditOutlined, FilePdfOutlined, SplitCellsOutlined } from '@ant-design/icons';
import { DeleteOutline } from "@mui/icons-material";
// import React from "react";
import ReactToPdf from "react-to-pdf";
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';



const ref = React.createRef();


// 
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// 


export default function Calculater() {



    const [charge, setcharge] = useState("");
    const [amount, setamount] = useState("");
    const [allData, setallData] = useState([]);
    const [price, setprice] = useState(0);
    const [index, setIndex] = useState();
    const [editDelete, seteditDelete] = useState("AddData");
    const [able, setable] = useState("inline");
    const [cencalbtn, setcencalbtn] = useState("inline");








    function submit() {
        if (charge === "") {
            alert("please fill the charge")
        }


        else if (!isNaN(charge)) {
            alert("please fil name not a number")
        }

        else if (amount <= 0) {
            alert("please fill  Real Amount")
        }
        else if (amount === "dss") {
            alert("please fill amount price")
        }
        else {


            let chargeAndPrice = {
                charge: charge,
                amount: amount

            }
            let a = +amount;
            setprice(price + a);

            setcharge('');
            setamount('')
            setallData(allData.concat([chargeAndPrice]));
        }
    }


    function editupdate() {

        let b = allData[index].amount = amount;
        let c = +b;
        allData[index].charge = charge;
        allData[index].amount = amount;
        seteditDelete("AddData");
        setcharge("");
        setamount("");
        setprice(price + c);
        setable("inline")


    }
    // 
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className="maindiv">
                <>

                    {/*  */}
                </>

                <h1 className="heading"> BUDGET CALCULATER</h1>
                <div className="seconddiv">

                    {/*  */}
                    <div className="thirddiv">
                        <div className="inputdiv1">
                            <h4 className="charge">Charge</h4>
                            <input className="input" maxLength={10} onChange={(event) => { setcharge(event.target.value) }} type="text" value={charge} placeholder="e.g.Rent"></input>

                        </div>
                        <div className="inputdiv2">
                            <h4 className="amount">Amount</h4>
                            <input className="input" onChange={(event) => { setamount(event.target.value) }} type="number" value={amount} placeholder="e.g.400"></input>

                        </div>
                        <div className="buttondiv">
                            {editDelete === "AddData" ?


                                <button className="button" onClick={submit}>
                                    {editDelete}
                                    <SendOutlined style={{ color: "white", paddingLeft: "5px" }} />
                                </button> :
                                <>
                                    <button className="button" onClick={editupdate}>
                                        Update
                                        <SendOutlined style={{ color: "white", paddingLeft: "5px" }} />
                                    </button>



                                </>
                            }

                        </div>
                    </div>
                    {/*  */}

                    <div className="fourthdiv">








                        <div className="fifthdiv" >
                            {allData.length > 0 ?


                                allData.map(({ charge, amount }, index) => {

                                    return (


                                        < div key={index} className="datadiv">
                                            <div className="productdiv">
                                                <h4 className="product">{charge}</h4>
                                            </div>
                                            <div className="pricediv">

                                                <h4 className="price">{amount}</h4>
                                            </div>
                                            <div className="editdelete">

                                                <h4 className="edit" onClick={() => {
                                                    seteditDelete("update")
                                                    setIndex(index);
                                                    setamount(allData[index].amount)
                                                    setcharge(allData[index].charge)
                                                    setprice(price - allData[index].amount);
                                                    setable("none")
                                                }}><EditOutlined style={{ color: "rgb(49, 49, 126)", display: able }} /></h4>


                                                <h4 className="delete" >< DeleteOutline style={{ color: "rgb(49, 49, 126)", display: able }} onClick={() => {
                                                    // setallData()


                                                    if (index + 1 <= index) {
                                                        setallData([]);
                                                        setprice(0)
                                                    }
                                                    else {
                                                        allData.splice(index, 1)
                                                        // alert(index)
                                                        setIndex(index)
                                                        setprice(price - amount)
                                                    }

                                                }} /></h4>
                                            </div>

                                        </div>
                                    )
                                })



                                : null
                            }
                        </div>



                        {allData.length > 0 ?
                            <div className="buttondiv">
                                <button className="button" style={{ display: able }} onClick={() => { setallData([]); setprice(0) }}>
                                    Clear
                                    <DeleteOutline style={{ color: "white", paddingLeft: "5px" }} />
                                </button>
                                <button className="button" type="primary" onClick={showModal}>
                                    Open Invoice
                                </button>
                                {/* <Pdf targetRef={ref} filename="AllData.pdf">
                                    {({ toPdf }) => <FilePdfOutlined style={{ color: "rgb(49, 49, 126)", display: able, paddingLeft: "10px" }} onClick={toPdf} />}
                                </Pdf> */}


                            </div>

                            : null
                        }
                    </div>

                    {/* <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button> */}
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <table ref={ref} >
                        <h1 className="tableheadig">Invoice</h1>
                            <tbody>
                                <tr>
                                    <th>Sr#</th>
                                    <th>Charge</th>
                                    <th>Amount</th>
                                </tr>
                                {
                                    allData.map(({ charge, amount }, index) => (
                                        <tr key={charge + index}>
                                            <td>{index + 1}</td>
                                            <td>{charge}</td>
                                            <td>{amount}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>


                        <ReactToPdf targetRef={ref} x={5} y={5} scale={1.5} filename="AllData.pdf">
                            {({ toPdf }) =><button className="button">gentrate<FilePdfOutlined style={{ color: "white", display: able, paddingLeft: "10px" }} onClick={toPdf} /></button>}
                        </ReactToPdf>

                    </Modal>


                </div>
                {allData.length > 0 ?
                    <h1 className="heading1"> TOTAL SPEND:{price}</h1>

                    : null
                }

            </div>

        </>
    )
}