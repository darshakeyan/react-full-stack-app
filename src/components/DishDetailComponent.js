import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, 
    CardBody, 
    CardImg, 
    CardText, 
    CardTitle, 
    Breadcrumb, 
    BreadcrumbItem, 
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    Row,
    Label,
    Col,
    ModalFooter} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { LoadingSpinner } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const maxLength =(len) => (val) => !(val) || (val.length <= len);
const minLength =(len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component {   
    constructor({props}) {
        super(props);
        this.state = {
            isModalOpen:false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitData = this.handleSubmitData.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    handleSubmitData(values) {
        this.toggleModal();
        // alert("Current state is:" + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        return(
            <>
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} style={{color:'#512da8', fontWeight:'bold'}}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitData(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" className="col-12"><strong>Rating</strong></Label>
                                <Col className="col-12">
                                    <Control.select
                                        model=".rating"
                                        className="form-control"
                                        name="rating"
                                        type="select"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" className="col-12"><strong>Your Name</strong></Label>
                                <Col className="col-12">
                                    <Control.text
                                        model=".author"
                                        className="form-control"
                                        name="author"
                                        type="text"
                                        placeholder="Your Name"

                                        validators={{
                                            minLength: minLength(3),
                                            maxLength:maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength:'Must be Greater than 2 character',
                                            maxLength:'Must be 15 Character or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" className="col-12"><strong>Comment</strong></Label>
                                <Col className="col-12">
                                    <Control.textarea
                                        model=".comment"
                                        className="form-control"
                                        name="comment"
                                        rows={6}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                    <ModalFooter>Created By Darshak 😇 </ModalFooter>
                </Modal>
            </>
        );
    }
}

function RenderComments({comments, postComment, dishId}) {
    console.log(comments)
    if(comments != null) {
        // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        const cmnts = comments.map(comment => {
            // var date = new Date(comment.date)
            // var month = months[date.getMonth()]
            // var finalDate = date.getDate();
            // var year = date.getFullYear();
            return(
                <li key={comment.id}> 
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                {/* <p> -- {commnet.author}, {month} {finalDate},{year} </p> */}
                </li>
            );
        });
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmnts}
                    <CommentForm 
                        dishId={dishId} 
                        postComment={postComment}
                    />
                </ul>
            </div>
        );
    }
    else {
        return(
            <div>Goes Wrong...</div>
        );
    }
}
function RenderDish({dish}) {
    if(dish != null) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg  width="100%" src={ baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return(
            <div>Something is Wrong! Click Again...</div>
        );
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <LoadingSpinner/>
                </div>
            </div>
        );
    }
    else if (props.errMsg) {
        return(
            <div className="container">
                <div className="row">
                <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    else if (dish != null) {
        const dishItem = <RenderDish dish={props.dish}/>;
        const commentItem = <RenderComments 
                                comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            />;
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>MENU</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    {dishItem}
                    {commentItem}
                </div>
            </div>     
        );
    }
    else {
        return(
            <div></div>
        );
    }
}


export default DishDetail;
