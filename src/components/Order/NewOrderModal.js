import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, FormControl, FormGroup, InputGroup, ListGroup, Row} from "react-bootstrap";

import axios from "axios";
import {API_URL, defaultCustomer, defaultOrder, defaultProduct} from "../../Constants";
import {AiOutlineDelete, BiMinus, BiPlus, BiSend, BsCheck, BsPencil, MdPlusOne} from "react-icons/all";

function NewOrderModal() {

    const [customerDetails, setCustomerDetails] = useState(defaultCustomer);

    const [customerSearchState, setCustomerSearchState] = useState({
        searchString: "",
        resultList: [defaultCustomer],
        searchCompleted: true
    });

    const [orderList, setOrderList] = useState({orders: [defaultOrder]});

    useEffect(() => {
        let timeOut
        (customerSearchState.searchCompleted || customerSearchState.searchString === "") ?
            setCustomerSearchState({...customerSearchState, resultList: []})
            : timeOut = setTimeout(() => {
                axios.post(API_URL + "/customer/search", {
                    customerName: customerSearchState.searchString,
                    customerPhone: customerSearchState.searchString
                })
                    .then(res => setCustomerSearchState({...customerSearchState, resultList: res.data}))
                    .catch(err => console.log(err))
            }, 500)
        return () => clearTimeout(timeOut)
        // eslint-disable-next-line
    }, [customerSearchState.searchCompleted, customerSearchState.searchString]);

    const handleSearchResultClick = (value) => {
        setCustomerSearchState({...customerSearchState, searchCompleted: true})
        setCustomerDetails(value)
    }

    const addNewProduct = () => {
        let newOrder = {
            id: Math.max(...orderList.orders.map(value => value.id), 0) + 1,
            customer: defaultCustomer,
            product: defaultProduct,
            productCount: 0,
            sellingPrice: 0,
            orderDate: ""
        }
        setOrderList({orders: [...orderList.orders, newOrder]})
        console.log(orderList)
    }

    const removeProduct = (keyVal) => {
        let newOrder = orderList.orders.filter((value) => value.id !== keyVal)
        setOrderList({orders: newOrder});
    }

    const updateOrder = (keyVal, product, count) => {
        let newOrder = orderList.orders
        newOrder.forEach(order => {
            if (order.id === keyVal) {
                order.product = product
                order.productCount = count
            }
        })
        setOrderList({orders: newOrder})
    }

    const completeOrder = () => {

        let finalOrder = orderList.orders
        finalOrder.forEach(order => order.customer = customerDetails)
        console.log(JSON.stringify(finalOrder))
        axios.post(API_URL + "/order/createOrder", finalOrder).then(
            res => res.data === "New Order Added" ?
                alert("Order successfully created") : alert("Order Failed")
        ).catch(err => alert(err))
    }

    return (
        <ListGroup variant={"flush"}>
            <ListGroup.Item>
                <Form>
                    <FormGroup className={"mb-2"}>
                        <Card>
                            <Card.Header>
                                <FormControl type={"text"} placeholder="Type to search"
                                             value={customerSearchState.searchString}
                                             onChange={e => setCustomerSearchState({
                                                 ...customerSearchState,
                                                 searchString: e.target.value,
                                                 searchCompleted: false
                                             })}/>
                            </Card.Header>
                            <div hidden={customerSearchState.searchCompleted} className={"d-grid"}>
                                {customerSearchState.resultList.map(value =>
                                    <Button onClick={() => handleSearchResultClick(value)} variant={"light"}
                                            className={"shadow-none"}>
                                        <Row>
                                            <Col>Name: {value.customerName}</Col>
                                            <Col>Phone : {value.customerPhone}</Col>
                                        </Row>
                                    </Button>)}
                            </div>
                        </Card>

                    </FormGroup>
                    <Row className={"row-cols-1 row-cols-lg-2"}>
                        <FormGroup as={Col} className={"mb-2 mb-lg-3"}>
                            <FormControl type={"text"} placeholder="Customer Phone"
                                         value={customerDetails.customerPhone}
                                         onChange={e => setCustomerDetails({
                                             ...customerDetails,
                                             customerPhone: e.target.value
                                         })}/>

                        </FormGroup>
                        <FormGroup as={Col} className={"mb-2 mb-lg-3 "}>
                            <FormControl type={"text"} placeholder="Customer Name" value={customerDetails.customerName}
                                         onChange={e => setCustomerDetails({
                                             ...customerDetails,
                                             customerName: e.target.value
                                         })}/>

                        </FormGroup>
                    </Row>
                    <Row className={"row-cols-1 row-cols-lg-2"}>
                        <Col className={"mb-2 mb-lg-3 mb-lg-0 col-lg-8"}>
                            <FormGroup>
                                <FormControl type={"text"} value={customerDetails.customerAddress}
                                             placeholder="Customer Address"
                                             onChange={e => setCustomerDetails({
                                                 ...customerDetails,
                                                 customerAddress: e.target.value
                                             })}/>
                            </FormGroup>
                        </Col>
                        <Col className={"mb-2 mb-lg-3 d-grid col-lg-4"}>
                            <Button variant={"success"}>Add Customer</Button>
                        </Col>
                    </Row>
                </Form>
            </ListGroup.Item>
            <ListGroup.Item>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col className={"d-flex align-items-center col-7"}>Add Products</Col>
                            <Col className={"d-flex"}>
                                <InputGroup>
                                    <Button onClick={addNewProduct} className={"col-6"}><MdPlusOne/></Button>
                                    <Button variant={"success"} className={"col-6"}
                                            onClick={completeOrder}><BiSend/></Button>
                                </InputGroup>
                            </Col>

                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {orderList.orders.map(order =>
                            <ItemForm key={order.id} keyVal={order.id} order={order} removeItem={removeProduct}
                                      updateOrder={updateOrder}/>)}
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        </ListGroup>
    );
}

function ItemForm(props) {

    const [productState, setProductState] = useState(defaultProduct);
    const [productSearchState, setProductSearchState] = useState({
        searchString: "",
        resultList: [defaultProduct],
        searchCompleted: true
    });
    const [productCount, setProductCount] = useState(0);
    const [formEditable, setFormEditable] = useState(true);
    useEffect(() => {
        let timeOut
        (productSearchState.searchCompleted || productSearchState.searchString === "") ?
            setProductSearchState({...productSearchState, resultList: []})
            : timeOut = setTimeout(() => {
                axios.post(API_URL + "/product/search", {
                    productName: productSearchState.searchString,
                })
                    .then(res => setProductSearchState({...productSearchState, resultList: res.data}))
                    .catch(err => console.log(err))
            }, 500)
        return () => clearTimeout(timeOut)
        // eslint-disable-next-line
    }, [productSearchState.searchCompleted, productSearchState.searchString]);

    const handleProductSearchChange = (value) => {
        setProductSearchState({...productSearchState, searchCompleted: value === "", searchString: value})
        setProductState({...productState, productName: value})
    }

    const handleProductSearchClick = (value) => {
        setProductSearchState({...productSearchState, searchCompleted: true, searchString: ""})
        setProductState(value)
    }

    const confirmOrder = () => {
        props.updateOrder(props.keyVal, productState, productCount)
        setFormEditable(false)
    }

    return (
        <Form>
            <Card className={"mb-2"}>
                <Card.Header>
                    <FormGroup as={Row}>
                        <Col className={"col-lg-10 col-8 "}>

                            <FormControl disabled={!formEditable} type={"text"} placeholder={"Product Name"}
                                         value={productState.productName}
                                         onChange={e => handleProductSearchChange(e.target.value)}
                            />
                        </Col>
                        <Col className={"d-grid"}>
                            <InputGroup>
                                {formEditable
                                    ? <Button variant={"success"} onClick={confirmOrder}
                                              className={"shadow-none col-6 p-0"}><BsCheck/></Button>
                                    : <Button variant={"success"} onClick={() => setFormEditable(true)}
                                              className={"shadow-none col p-0"}><BsPencil/></Button>}

                                <Button hidden={!formEditable} variant={"danger"}
                                        onClick={() => props.removeItem(props.keyVal)}
                                        className={"shadow-none col-6 p-0"}><AiOutlineDelete/></Button>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </Card.Header>
                <div hidden={productSearchState.searchCompleted} className={"d-grid"}>
                    {productSearchState.resultList.map(value =>
                        <Button key={value.id} variant={"light"}
                                className={"shadow-none text-start"}
                                onClick={() => handleProductSearchClick(value)}>{value.productName}</Button>)}
                </div>
                <Card.Body disabled={!formEditable}>
                    <FormGroup as={Row} className={"row-cols-2 row-cols-lg-4"}>
                        <Col className={"d-grid align-content-center justify-content-center"}>
                            Buying Price: {productState.productPrice}
                        </Col>
                        <Col className={"d-grid align-content-center justify-content-center"}>
                            Selling Price: {productState.sellingPrice}
                        </Col>
                        <Col className={"d-grid align-content-center justify-content-center"}>
                            Stock: {productState.stock}
                        </Col>
                        <Col>
                            <InputGroup>
                                <Button disabled={!formEditable} className={"shadow-none col-3 col-lg-2 p-0"}
                                        onClick={() => setProductCount(productCount - 1)}><BiMinus/></Button>
                                <InputGroup.Text
                                    className={"justify-content-center col-6 col-lg-8"}>{productCount}</InputGroup.Text>
                                <Button disabled={!formEditable} className={"shadow-none col-3 col-lg-2 p-0"}
                                        onClick={() => setProductCount(productCount + 1)}><BiPlus/></Button>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </Card.Body>
            </Card>
        </Form>
    );
}

export default NewOrderModal;