export default function ({ children }) {
  return (
    <main>
      <Grid>
        <Col size="2">
          <div>foo</div>
          <div>bar</div>
        </Col>
        <Col size="6">
          <h1>hi</h1>
          {children}
        </Col>
      </Grid>
    </main>
  );
}
