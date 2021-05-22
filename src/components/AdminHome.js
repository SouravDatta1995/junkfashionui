import React, {useState} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory/Inventory";
import Order from "./Order/Order";
import Customer from "./Customer/Customer";

function AdminHome() {

    const [tabState, setTabState] = useState("dashboard");
    let screen


    if (tabState === "dashboard") screen = <Dashboard/>
    else if (tabState === "inventory") screen = <Inventory/>
    else if (tabState === "orders") screen = <Order/>
    else if (tabState === "customers") screen = <Customer/>
    else screen = <div></div>
    return (
        <div>
            <Navbar sticky={"top"} variant={"dark"} bg={"dark"} className={"p-3 mb-2"} expand={"lg"}>
                <Navbar.Brand className={"mb-2 mb-lg-0"}>Junk Fashion Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls={"navbar-toggle"} className={"shadow-none mb-2 mb-lg-0"}/>
                <Navbar.Collapse id={"navbar-toggle"}>
                    <Nav variant={"pills"} className={"mr-auto"} onSelect={(k) => setTabState(k)} activeKey={tabState}>
                        <Nav.Item className={"mb-2 mb-lg-0"}>
                            <Nav.Link eventKey="dashboard" className={"p-2"}>Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={"mb-2 mb-lg-0"}>
                            <Nav.Link eventKey="inventory" className={"p-2"}>Inventory</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={"mb-2 mb-lg-0"}>
                            <Nav.Link eventKey="orders" className={"p-2"}>Orders</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={"mb-2 mb-lg-0"}>
                            <Nav.Link eventKey="customers" className={"p-2"}>Customers</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            {screen}
        </div>
    );
}

export default AdminHome;