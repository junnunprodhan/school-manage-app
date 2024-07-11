import React from "react";
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState,} from "react";
import { BiUpload } from "react-icons/bi";
import { CustomFileReader } from "../../../utils/filereader";
import "./Field.scss";
import ImageBase64 from "../ImageBase64";

interface IImageField extends InputHTMLAttributes<HTMLInputElement> {
  src?: string;
  label: string;
  id?: string;
  onUpload?: (filename: string) => void;
}

export default forwardRef(({ label, id, src, onUpload, ...props }: IImageField, ref: ForwardedRef<HTMLInputElement>) => {
  const [imgFile, setImgFile] = useState<File>();
  const [base64, setBase64] = useState<string>("");


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    CustomFileReader.read(file, (data) => {
      setBase64(data);
      onUpload && onUpload(file.name);
    });

    setImgFile(file);
  };

  return (
    <div className="field-img">
      <div className="field-img-label">{label}</div>

      <div className="field-img-wrapper">
        <div className="field-img-upload field-img-square">
          {imgFile 
            ? <img className="field-img-upload-img" src={URL.createObjectURL(imgFile)}/>
            : <ImageBase64 className="field-img-upload-img" src={src}/>
          }

          {!props.disabled && (
            <label className="field-img-upload-label" htmlFor={id}>
              <BiUpload className="text-2xl" />
              <input
                {...props}
                type="file"
                id={id}
                accept="image/**"
                hidden
                onChange={handleOnChange}
              />

              <input type="text" value={base64} hidden disabled ref={ref}/>
            </label>
          )}
        </div>
      </div>
    </div>
  );
});
