import { Column, Row, Grid, Heading } from "@once-ui-system/core";
import { Posts } from "./Posts";

export const Blog = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  return (
    <Row fillWidth horizontal="center">
      <Column gap="20" {...flex}>
        <Heading marginLeft="l" variant="heading-strong-s">
          From the blog
        </Heading>
        <Grid fillWidth columns={2} s={{columns: 1}} gap="20">
          <Posts range={[1, 4]} direction="column" background="overlay"/>
        </Grid>
      </Column>
    </Row>
  );
}