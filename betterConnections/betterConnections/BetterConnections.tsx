import * as React from 'react';
import { IPersonaSharedProps, IStackTokens, Label, Persona, PersonaSize, Stack, StackItem } from '@fluentui/react';
import { IInputs } from './generated/ManifestTypes';

export interface IBetterConnectionProps {
  context: ComponentFramework.Context<IInputs>;
}

export interface IConnection {}

export const BetterConnections = (props: IBetterConnectionProps) => {
  const { context } = props;
  const [entityId, setCurrentEntityId] = React.useState<string>();
  const [connections, setConnections] = React.useState<IConnection[]>();

  React.useEffect(() => {
    setCurrentEntityId(context.parameters.entityId.raw!);
  }, [context.parameters.entityId.raw]);

  React.useEffect(() => {
    if (entityId) {
      context.webAPI.retrieveMultipleRecords('connection', '?$filter=_record2id_value eq ' + entityId).then((response) => {
        setConnections(response.entities);
      });
    }
  }, [entityId]);

  const examplePersona: IPersonaSharedProps = {
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Relation x',
    tertiaryText: 'Edit',
  };

  const stackTokens: IStackTokens = {
    childrenGap: 25,
  };

  const renderTertiaryText = React.useCallback(() => {
    return (
      <>
        <b>
          <a href='#'>Link</a>
        </b>
      </>
    );
  }, []);

  return (
    <>
      <Stack
        tokens={stackTokens}
        horizontal
        wrap
      >
        <StackItem>
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            onRenderTertiaryText={renderTertiaryText}
          ></Persona>
        </StackItem>
        <StackItem>
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
          ></Persona>
        </StackItem>
      </Stack>
    </>
  );
};
