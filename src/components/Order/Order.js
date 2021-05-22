import React, {useState} from 'react';
import { Card, Container, Tab, Tabs} from "react-bootstrap";
import NewOrderModal from "./NewOrderModal";

function Order(props) {

    const [key, setKey] = useState("newOrder");

    return (
        <Container>
            <Card>
                <Tabs className={"m-3"} variant={"tabs"} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey={"newOrder"} title={"New Order"}>
                        <NewOrderModal/>
                    </Tab>
                    <Tab eventKey={"orderHistory"} title={"Order History"}>
                        <div>Test</div>
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    );
}

export default Order;