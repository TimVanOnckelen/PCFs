## File Uploader

A generic fluent UI button to trigger the native file selector. Outputs the selected files as data url.

### Parameters

#### Label button

Label to show on the button

#### Allow multiple files

Allow the user to select multiple files at once

#### Allowed formats

Allowed formats to select. Default = all

e.g. image/png,image/jpeg

Please refer to [this media type list](http://www.iana.org/assignments/media-types/media-types.xhtml) for file types.

#### ID of the button

HTML id of the input field. Default = "xe-uploadfile-button"
May be handy when adding multiple upload buttons.

#### Button type

Refers to type of button. Default = "primary"

##### Types

- primary
- compound
- action
- standard

#### Action icon

Can be used in combination with the "action" button type.
Refer to the [Fluent UI Icon tool](https://uifabricicons.azurewebsites.net/) for icon names.
Default = "BulkUpload"

#### Files

Array of selected files.
Data url can be used to process files.

```
[
    {
        name: 'name of the file',
        data: 'data url of the file'
    }
]
```
