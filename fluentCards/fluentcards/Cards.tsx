import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardStatus,
  DocumentCardTitle,
  DocumentCardType,
  ImageFit,
  Stack,
  StackItem,
} from '@fluentui/react';

export interface IFluentCards {
  dataSet?: ComponentFramework.PropertyTypes.DataSet;
  navigation: ComponentFramework.Navigation;
  properties?: {
    showImage: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showActivity: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showStatus: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    stackHorizontal: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    cardType: ComponentFramework.PropertyTypes.StringProperty;
    stackTokens: ComponentFramework.PropertyTypes.StringProperty;
    fieldNames: {
      image: ComponentFramework.PropertyTypes.StringProperty;
      title: ComponentFramework.PropertyTypes.StringProperty;
      description: ComponentFramework.PropertyTypes.StringProperty;
      activity: {
        user: ComponentFramework.PropertyTypes.StringProperty;
        description: ComponentFramework.PropertyTypes.StringProperty;
      };
      status: ComponentFramework.PropertyTypes.StringProperty;
    };
    defaultImage: ComponentFramework.PropertyTypes.StringProperty;
    statusIcon: ComponentFramework.PropertyTypes.StringProperty;
    card: {
      padding: ComponentFramework.PropertyTypes.WholeNumberProperty;
      childrenGap: ComponentFramework.PropertyTypes.WholeNumberProperty;
    };
  };
}

export const FluentCards = (props: IFluentCards) => {
  const { dataSet, properties, navigation } = props;

  const getFieldValue = React.useCallback(
    (name: string, recordID: string) => {
      if (!dataSet) {
        return 'No data';
      }

      switch (name) {
        case 'image': {
          let data = dataSet?.records[recordID]?.getValue(dataSet?.columns[0]?.name)?.toString();
          if (dataSet?.records[recordID]?.getValue(properties?.fieldNames.image.raw!)) {
            data = dataSet?.records[recordID]?.getValue(properties?.fieldNames.image.raw!).toString();
          } else {
            if (properties?.defaultImage.raw) {
              data = properties?.defaultImage.raw;
            }
          }
          return data;
        }
        case 'title': {
          let data = dataSet?.records[recordID]?.getValue(dataSet?.columns[0]?.name)?.toString();
          if (dataSet?.records[recordID]?.getValue(properties?.fieldNames.title.raw!)) {
            data = dataSet?.records[recordID]?.getValue(properties?.fieldNames.title.raw!)?.toString();

            console.log(dataSet?.records[recordID]);
          }
          return data;
        }
        case 'description':
          return dataSet?.records[recordID]?.getValue(properties?.fieldNames.description.raw!)?.toString();
        case 'activityUser':
          return dataSet?.records[recordID]?.getValue(properties?.fieldNames.activity.user.raw!)?.toString();
        case 'activityDescription':
          return dataSet?.records[recordID]?.getValue(properties?.fieldNames.activity.description.raw!)?.toString();
        case 'status':
          return dataSet?.records[recordID]?.getValue(properties?.fieldNames.status.raw!)?.toString();
      }

      return 'No match';
    },
    [dataSet, properties]
  );

  const getCardType = React.useCallback(() => {
    if (properties?.cardType.raw?.toLowerCase() === 'compact') {
      return DocumentCardType.compact;
    }
    return DocumentCardType.normal;
  }, [properties]);

  const getStackingType = React.useCallback(() => {
    return properties?.stackHorizontal.raw;
  }, [properties]);

  const openRecord = React.useCallback(
    (recordID) => () => {
      if (recordID) {
        const entityReference = dataSet?.records[recordID].getNamedReference();
        const entityFormOptions = {
          entityName: entityReference?.name!,
          entityId: entityReference?.id.guid,
        };
        navigation.openForm(entityFormOptions);
      }
    },
    [dataSet, navigation]
  );

  return (
    <>
      <Stack
        horizontal={getStackingType()}
        tokens={{ padding: properties?.card.padding.raw!, childrenGap: properties?.card.childrenGap.raw! }}
        wrap
      >
        {dataSet?.sortedRecordIds.map((recordID) => (
          <StackItem
            key={recordID}
            tokens={{ padding: properties?.card.padding.raw! }}
          >
            <DocumentCard
              type={getCardType()}
              onClick={openRecord(recordID)}
            >
              {properties?.showImage.raw && (
                <DocumentCardPreview
                  previewImages={[
                    {
                      name: '',
                      previewImageSrc: getFieldValue('image', recordID),
                      imageFit: ImageFit.cover,
                    },
                  ]}
                ></DocumentCardPreview>
              )}

              <DocumentCardTitle
                title={getFieldValue('title', recordID)}
                key={'doc_title' + recordID}
              ></DocumentCardTitle>
              <DocumentCardTitle
                title={getFieldValue('description', recordID)}
                showAsSecondaryTitle
              ></DocumentCardTitle>
              {properties?.showActivity.raw && (
                <DocumentCardActivity
                  activity={getFieldValue('activityDescription', recordID)}
                  people={[{ name: getFieldValue('activityUser', recordID), profileImageSrc: '' }]}
                ></DocumentCardActivity>
              )}
              {properties?.showStatus.raw && (
                <DocumentCardStatus
                  statusIcon={properties.statusIcon.raw?.toString()}
                  status={getFieldValue('status', recordID)}
                ></DocumentCardStatus>
              )}
            </DocumentCard>
          </StackItem>
        ))}
      </Stack>
    </>
  );
};
