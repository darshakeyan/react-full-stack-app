import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Col, Row, Label} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val && val.length>0;
const maxLength =(len) => (val) => !(val) || (val.length <= len);
const minLength =(len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
 // const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2, 4}$/i.test(val);


class Contact extends Component {
    constructor(props) {
        super(props);
        this.buttonOnSubmitHandler = this.buttonOnSubmitHandler.bind(this);
    }
    buttonOnSubmitHandler = (values) => {
        console.log("Current state is:" + JSON.stringify(values));
        alert("Current state is:" + JSON.stringify(values));
        this.props.resetFeedbackForm();
    }
    render() {
        return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>HOME</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        CONTACT US
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>CONTACT US</h3>
                    <hr/>
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us Your FEEDBACK</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form model="feedback" onSubmit={(values) => this.buttonOnSubmitHandler(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" className="col-md-2">First Name</Label>
                            <Col className="col-md-10">
                                <Control.text
                                    model=".firstname"
                                    className="form-control" 
                                    type="text" 
                                    id="firstname" 
                                    name="firstname"
                                    placeholder="John"

                                    validators={{
                                        required, 
                                        minLength: minLength(3),
                                        maxLength:maxLength(12)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required:"Required\t",
                                        minLength:'Must be Greater than 2 character',
                                        maxLength:'Must be 12 Character or less'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text
                                    model=".lastname"
                                    className="form-control" 
                                    type="text" 
                                    id="lastname" 
                                    name="lastname"
                                    placeholder="Stark"

                                    validators={{
                                        required, 
                                        minLength: minLength(3),
                                        maxLength:maxLength(12)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required:"Required\t",
                                        minLength:'Must be Greater than 2 character',
                                        maxLength:'Must be 12 Character or less'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="telnumber" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text
                                    model=".telnumber"
                                    className="form-control" 
                                    type="tel" 
                                    id="telnumber" 
                                    name="telnumber"
                                    placeholder="Tel. Number"

                                    validators={{
                                        required, 
                                        minLength: minLength(3),
                                        maxLength:maxLength(12),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".telnumber"
                                    show="touched"
                                    messages={{
                                        required:"Required\t",
                                        minLength:'Must be Greater than 2 Number',
                                        maxLength:'Must be 12 Number or less',
                                        isNumber:'Must be a Number'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email Address</Label>
                            <Col md={10}>
                                <Control.text 
                                    model=".email"
                                    className="form-control" 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="Johnstark@gmail.com"

                                    validators={{
                                        required,
                                        // validEmail
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required:"Required\t",
                                        // validEmail:'Invalid Email Address'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{size:6, offset:2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox
                                            model=".agree"
                                            className="form-check-input" 
                                            type="checkbox" 
                                            name="agree"
                                        /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>
                            <Col md={{size:3, offset:1}}>
                                <Control.select
                                        model=".contactType" 
                                        className="form-control"
                                        type="select" 
                                        name="contactType"
                                >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="feedback" md={2}>Your FeedBack</Label>
                            <Col md={10}>
                                <Control.textarea
                                    model=".message" 
                                    className="form-control"
                                    type="textarea" 
                                    id="message" 
                                    name="message"
                                    rows="12"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset:2}}>
                                <Button type="submit" color="primary">Send FeedBack</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
        );
    }
}

export default Contact;