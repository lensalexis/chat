import { Column, Row } from "@once-ui-system/core";
import { Sidebar } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar
        m={{hide: true}} 
        paddingRight="12"
        paddingLeft="4"
        paddingY="24"
        maxWidth={18}
        fitHeight
        position="sticky"
        top="56" />
      <Row
        fill
        horizontal="center"
        topRadius="l"
        overflow="hidden">
        <Row
          style={{height: "calc(100vh - var(--static-space-56))"}}
          overflowY="auto"
          horizontal="center"
          borderTop="neutral-alpha-medium"
          borderLeft="neutral-alpha-medium"
          borderRight="neutral-alpha-medium"
          topRadius="l"
          fillWidth
          background="surface">
          <Column fill>
            {children}
          </Column>
        </Row>
      </Row>
    </>
  );
}