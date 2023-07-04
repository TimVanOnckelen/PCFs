import * as React from 'react';
import { ActionButton, CompoundButton, DefaultButton, IIconProps, PrimaryButton } from '@fluentui/react';

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
}

export const FileUploader = (props: IFileUploaderProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<IFile[]>([]);
  const { label, multiple, accepts, uploadId, buttonType, actionIcon } = props;

  const triggerUpload = React.useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  React.useEffect(() => {
    props.files(files);
    props.stateChanged();
  }, [files]);

  const fileChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arrayFiles = Array.from(e.target.files);
      const fileArray: IFile[] = [];

      arrayFiles.map(async (file) => {
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          fileArray.push({ name: file.name, file: fileReader.result as string });
          setFiles([...files, ...fileArray]);
        };
        fileReader.readAsDataURL(file);
      });
    }
  }, []);

  const actionIconObject: IIconProps = { iconName: actionIcon ? actionIcon : 'BulkUpload' };

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
