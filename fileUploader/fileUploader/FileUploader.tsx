import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';

export interface IFile {
  name: string;
  file: string;
}
export interface IFileUploaderProps {
  stateChanged: () => void;
  files: (files: IFile[]) => void;
  label: string;
}

export const FileUploader = (props: IFileUploaderProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<IFile[]>([]);

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

  return (
    <>
      <PrimaryButton onClick={triggerUpload}>Kies bestanden</PrimaryButton>
      <input
        type='file'
        id='fileUpload'
        value=''
        multiple
        ref={inputRef}
        onChange={fileChanged}
        style={{
          display: 'none',
        }}
      />
    </>
  );
};
