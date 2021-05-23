import React, {useEffect, useState} from 'react';
import {Button, Card, Col, InputGroup, ListGroup, Row, Table} from "react-bootstrap";
import {AiOutlineArrowLeft, AiOutlineArrowRight, BsDash} from "react-icons/all";
import moment from "moment";
import {API_URL, defaultOrderHistory} from "../../Constants";
import axios from "axios";
import styled from "styled-components"

function OrderHistory() {

    const [dateRange, setDateRange] = useState({
        fromDate: moment().subtract(7, "days"),
        toDate: moment()
    });
    const [ordersState, setOrdersState] = useState(defaultOrderHistory);

    useEffect(() => {
        axios.post(API_URL + "order/byDate", dateRange)
            .then(
                res => setOrdersState({orders: res.data})
            )
            .catch(
                err => alert(err)
            )
        // eslint-disable-next-line
    }, [dateRange]);


    const increaseDateRange = () => {
        setDateRange({fromDate: dateRange.fromDate.add(7, "days"), toDate: dateRange.toDate.add(7, "days")})
    }

    const decreaseDateRange = () => {
        setDateRange({fromDate: dateRange.fromDate.subtract(7, "days"), toDate: dateRange.toDate.subtract(7, "days")})
    }
    return (
        <ListGroup variant={"flush"} className={"p-3"}>
            <Card>
                <Card.Body>
                    <InputGroup>
                        <Button onClick={decreaseDateRange}><AiOutlineArrowLeft/></Button>
                        <InputGroup.Text>
                            {dateRange.fromDate.format("DD/MMM/yy")}
                            <BsDash className={"mx-2"}/>
                            {dateRange.toDate.format("DD/MMM/yy")}
                        </InputGroup.Text>
                        <Button onClick={increaseDateRange}><AiOutlineArrowRight/></Button>
                    </InputGroup>
                </Card.Body>
            </Card>
            {ordersState.orders.map((value, index) => <OrderDateComponent key={index} value={value}/>)}
        </ListGroup>
    );
}


function OrderDateComponent(props) {
    return (
        <Card className={"my-2"}>
            <Card.Header>
                <Card.Title>{props.value.orderDate}</Card.Title>
            </Card.Header>
            <Card.Body>
                {props.value.customerOrders.map((value, index) => <OrderComponent key={index} value={value}/>)}
            </Card.Body>
        </Card>
    );
}

const Profit = styled.h5`
  color: darkgreen;
`

function OrderComponent(props) {

    let totalProfit = 0;

    props.value.orderResponses.forEach(value => {
        totalProfit = totalProfit + value.profit
    })

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col className={"ms-3"}>
                        <Row><h5>{props.value.customerName}</h5></Row>
                        <Row>
                            <div className={"text-muted"}>{props.value.customerPhone}</div>
                        </Row>
                    </Col>
                    <Col className={"d-grid align-items-center justify-content-end me-3"}>
                        <Profit><b>Profit : </b>₹{totalProfit}</Profit>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Selling Price</th>
                        <th>Count</th>
                        <th>Profit</th>
                    </tr>
                    </thead>
                    {props.value.orderResponses.map((value, index) =>
                        <tbody key={index}>
                        <tr>
                            <td>{value.product.productName}</td>
                            <td>{value.product.productPrice}</td>
                            <td>{value.product.sellingPrice}</td>
                            <td>{value.productCount}</td>
                            <td>{value.productCount * (value.product.sellingPrice - value.product.productPrice)}</td>
                        </tr>
                        </tbody>
                    )}
                </Table>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        Delivery Address: {props.value.customerAddress}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
}

export default OrderHistory;
