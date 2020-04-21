import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Badge,
} from "reactstrap";

class RouteForm extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Badge for="exampleEmail">FROM</Badge>
                <Input placeholder="Place origin POSTCODE" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Badge for="examplePassword">TO</Badge>
                <Input placeholder="Place destination POSTCODE" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Badge for="exampleAddress">NAME OF THE ROUTE</Badge>
            <Input placeholder="Work, Home, Shop..." />
          </FormGroup>
          <FormGroup>
            <Badge for="exampleAddress2">METHOD</Badge>
            <Input placeholder="WALKING or DRIVING" />
          </FormGroup>
          <Button>SAVE</Button>
        </Form>
      </Container>
    );
  }
}

export default RouteForm;
