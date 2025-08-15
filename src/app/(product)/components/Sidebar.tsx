import {
  Column,
  Icon,
  Row,
  Text,
  ToggleButton,
} from "@once-ui-system/core";

const Sidebar = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  return (
    <Column
      fillWidth
      gap="8"
      {...flex}
    >
      <Column fill gap="12">
        <Column fillWidth gap="4" position="sticky" top="0" background="page" paddingBottom="12">
          <ToggleButton href="/chat" fillWidth horizontal="start" size="l">
            <Row vertical="center" gap="16">
              <Icon name="chat" onBackground="neutral-weak" size="xs" />
              New chat
            </Row>
          </ToggleButton>
        </Column>

        <Column fillWidth gap="4">
          <Text variant="body-default-xs" onBackground="neutral-weak" marginY="8" marginLeft="20">
            Chats
          </Text>
          <ToggleButton fillWidth horizontal="start" size="l">
            <Text truncate>Storm formation</Text>
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">
            <Text truncate>Supermassive black holes and wormholes</Text>
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">
            <Text truncate>Quantum entanglement</Text>
          </ToggleButton>
        </Column>
      </Column>
    </Column>
  );
};

export { Sidebar };
