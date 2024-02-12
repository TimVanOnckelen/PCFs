## Scrollbar

Simple native scrollbar. Can be used to sync gallerys.

![Screenshot scrollbar](../docs/images/screenshot_pcf.png)

### Howto get selected file data

The OnChange event is triggerd when selecting new files.
A array of the data will be available after selecting new files in the "files" parameter.
You can use the onChange event to track changes, and process the file data in e.g. power automate.

e.g.

Example App
![Gallery Sync]()

### Parameters

#### Scrollbar height

Scrollbar height

> Default = 0

#### Scrollbar Width

Scrollbar Width

> Default = 0

#### childContainerHeight

Child container height

> Default = 0

### Outputs

#### scrollbarPosition

Position of the scrollbar.

> Decimal
