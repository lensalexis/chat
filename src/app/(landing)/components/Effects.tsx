import { Background, Column, Row } from "@once-ui-system/core";

export const Effects: React.FC<React.ComponentProps<typeof Row>> = ({ ...flex }) => {
  return (
    <Column fillWidth {...flex}>
      <Row fillWidth style={{height: "100vh"}}>
        <Background
          fill
          data-solid="color"
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 50,
            colorStart: "brand-solid-strong",
            colorEnd: "static-transparent",
          }}
        />
        <Background
          fill
          position="absolute"
          bottom="0"
          left="0"
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 30,
            colorStart: "brand-on-background-strong",
            colorEnd: "static-transparent",
          }}
        />
        <Row
          fill
          position="absolute"
          bottom="0"
          left="0"
          style={{background: "linear-gradient(to top, var(--brand-on-background-strong) 0%, var(--static-transparent) 25%)"}}
        />
        <Background
          fill
          style={{mixBlendMode: "difference"}}
          position="absolute"
          top="0"
          left="0"
          dots={{
            display: true,
            size: "160",
            color: "neutral-on-background-strong",
            opacity: 100,
          }}
        />
      </Row>
      <Row
        fillWidth
        style={{height: "100vh", background: "linear-gradient(to bottom, var(--brand-on-background-strong) 50%, var(--static-transparent) 90%)"}}
      />
    </Column>
  );
};