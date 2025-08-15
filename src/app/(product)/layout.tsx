import { Column, Row } from "@once-ui-system/core";
import { Header } from './components';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Column fill horizontal="center" flex={1}>
      <Header avatar="/images/lorant.jpg"/>
      <Row fill paddingX="8">
        {children}
      </Row>
    </Column>
  );
}