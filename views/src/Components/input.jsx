import React, { Component } from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  CustomInput,
  Button,
  Badge,
  Container,
} from "reactstrap";

const InputRoute = (onChangeOrigin, onChangeDestination) => {
  return (
    <Container>
      <div style={{ margin: "40px" }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <h3>
              <Badge>From</Badge>
            </h3>
          </InputGroupAddon>
          <Input onChange={onChangeOrigin} />
        </InputGroup>
        <InputGroup>
          <Input onChange={onChangeDestination} />
          <InputGroupAddon>
            <h3>
              <Badge>To</Badge>
            </h3>
          </InputGroupAddon>
        </InputGroup>

        <CustomInput
          type="radio"
          id="exampleCustomRadio"
          name="customRadio"
          label="Click to save this route"
        >
          <Button style={{ marginLeft: "5%" }}>Route it!</Button>
        </CustomInput>
      </div>
    </Container>
  );
};

export default InputRoute;
