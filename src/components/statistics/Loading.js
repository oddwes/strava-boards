import React from "react"
import BarLoader from "react-spinners/BarLoader"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import ScaleLoader from "react-spinners/ScaleLoader"
import { css } from "@emotion/react"
import { Container, Col, Row } from "react-bootstrap"

const override = css`display: block;margin: auto;border-color: red;`;

export const PowerLoading = () => {
  return (
    <ScaleLoader color="#000000" loading={true} css={override} height={125} width={8} radius={10} margin={10} />
  )
}

export const MetersLoading = () => {
  return (
    <ClimbingBoxLoader color="#000000" loading={true} css={override} size={23} />
  )
}

export const DistanceLoading = () => {
  return (
    <BarLoader color="#000000" loading={true} css={override} height={8} width={175} />
  )
}

const Loading = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="p-4" style={{ display: "flex", alignItems: "center" }}>
          <ClimbingBoxLoader color="#000000" loading={true} css={override} size={23} />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col className="p-4" style={{ display: "flex", alignItems: "center" }}>
          <BarLoader color="#000000" loading={true} css={override} height={8} width={175} />
        </Col>
      </Row>
      <br/>
      <Row>
        <ScaleLoader color="#000000" loading={true} css={override} height={125} width={8} radius={10} margin={10} />
      </Row>
    </Container>
  )
}

export default Loading