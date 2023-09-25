import * as React from 'react';
import { ActionButton, CompoundButton, DefaultButton, IIconProps, PrimaryButton } from '@fluentui/react';
import './style.css';

export interface IFile {
  name: string;
  file: string;
}
export interface IFileUploaderProps {
  stateChanged: () => void;
  files: (files: IFile[]) => void;
  label: string | null;
  multiple: boolean;
  accepts: string | null;
  uploadId: string | null;
  buttonType: string | null;
  actionIcon: string | null;
  dropZoneText: string | null;
  dropZoneTextColor: string | null;
  dropZoneBorderColor: string | null;
  dropZoneBorderSize: string | null;
  resetFiles: string | null;
}

export const FileUploader = (props: IFileUploaderProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<IFile[]>([]);
  const {
    label,
    multiple,
    accepts,
    uploadId,
    buttonType,
    actionIcon,
    dropZoneText,
    dropZoneBorderColor,
    dropZoneBorderSize,
    dropZoneTextColor,
    resetFiles,
  } = props;
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const triggerUpload = React.useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  React.useEffect(() => {
    setFiles([]);
  }, [resetFiles]);

  React.useEffect(() => {
    props.files(files);
    props.stateChanged();
  }, [files]);

  const readFiles = React.useCallback(
    (arrayFiles: File[]) => {
      const fileArray: IFile[] = [];

      arrayFiles.map(async (file) => {
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          fileArray.push({ name: file.name, file: fileReader.result as string });
          setFiles([...files, ...fileArray]);
        };
        fileReader.readAsDataURL(file);
      });
    },
    [files]
  );

  const fileChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const arrayFiles = Array.from(e.target.files);
        readFiles(arrayFiles);
      }
    },
    [files]
  );

  const actionIconObject: IIconProps = { iconName: actionIcon ? actionIcon : 'BulkUpload' };

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const arrayFiles = Array.from(e.dataTransfer.files);
      readFiles(arrayFiles);
    }
  }, []);

  const onDragOver = React.useCallback(
    (e) => {
      e.preventDefault();

      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onDragEnd = React.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  return (
    <>
      {buttonType === 'primary' && <PrimaryButton onClick={triggerUpload}>{label}</PrimaryButton>}
      {buttonType === 'compound' && <CompoundButton onClick={triggerUpload}>{label}</CompoundButton>}
      {buttonType === 'standard' && <DefaultButton onClick={triggerUpload}>{label}</DefaultButton>}
      {buttonType === 'action' && (
        <ActionButton
          iconProps={actionIconObject}
          onClick={triggerUpload}
        >
          {label}
        </ActionButton>
      )}
      {buttonType === 'dragdrop' && (
        <>
          {isDragging}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragEnd}
            onClick={triggerUpload}
            className={`dropzone ${isDragging ? 'is-dragging' : 'not-dragging'}`}
            style={{ borderWidth: dropZoneBorderSize!, borderColor: dropZoneBorderColor!, color: dropZoneTextColor! }}
          >
            {dropZoneText}
          </div>
        </>
      )}
      <input
        type='file'
        id={uploadId ? uploadId : 'xe-fileupload-button'}
        value=''
        multiple={multiple}
        ref={inputRef}
        accept={accepts ? accepts : ''}
        onChange={fileChanged}
        style={{
          display: 'none',
        }}
      />
    </>
  );
};
