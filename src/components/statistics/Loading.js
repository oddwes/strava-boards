import React from "react"
import BarLoader from "react-spinners/BarLoader"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import ScaleLoader from "react-spinners/ScaleLoader"
import { css } from "@emotion/react"
import { Container, Col, Row } from "react-bootstrap"

const Loading = () => {
  const override = css`display: block;margin: auto;border-color: red;`;

  return (
    <Container fluid>
      <Row>
        <Col className="p-4" style={{ display: "flex", alignItems: "center" }}>
          <ClimbingBoxLoader color="#000000" loading={true} css={override} size={25} />
        </Col>
        <Col className="p-4" style={{ display: "flex", alignItems: "center" }}>
          <BarLoader color="#000000" loading={true} css={override} height={8} width={300} />
        </Col>
      </Row>
      <Row>
        <ScaleLoader color="#000000" loading={true} css={override} height={175} width={10} radius={10} margin={15} />
      </Row>
    </Container>
  )
}

export default Loading