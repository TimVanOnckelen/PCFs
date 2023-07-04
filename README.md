## PCF's for Power Platform

This repository contains a collection of PCF components for the power platform.

### Components

#### File Uploader

A generic fluent UI button to trigger the native file selector. Outputs the selected files as data url.

### How to build the solution

Find latest microsoft guide on building PCF components [here](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/import-custom-controls)

!

#### DEV

```
cd \Solutions
msbuild /t:build /restore
```

#### Production

```
cd \Solutions
msbuild /p:configuration=Release
```
