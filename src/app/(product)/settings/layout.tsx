import { Column, Row } from "@once-ui-system/core";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
          <Column maxWidth="xl" fillHeight>
            {children}
          </Column>
        </Row>
      </Row>
    </>
  );
}