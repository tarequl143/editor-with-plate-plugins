import React, { useEffect, useState } from "react";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { BiCheck, BiLinkAlt, BiUpload } from "react-icons/bi";
// import { InsertImageUrl, insertImage } from "./../image-actions/ImageActions";
import { v4 as uuidv4 } from "uuid";
import { insertImage, useEventEditorId, useStoreEditorRef } from "@udecode/plate";
import { Path, Transforms } from "slate";



function ImageElementOption(props: any) {
  const editor = useStoreEditorRef(useEventEditorId('focus'));
  const { attributes, children, element } = props;
  const [imageBtn, setImageBtn] = useState<boolean>(true);
  const [isUrl, setIsUrl] = useState<boolean>(false);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  let uploadId = uuidv4();

  const focused = useFocused();
  const selected = useSelected();

  const handleImageChange = (e: any) => {
    e.preventDefault();

    let reader: any = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setUploadFile(file);
      setImagePreviewUrl(reader.result);
      console.log(imagePreviewUrl);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (imagePreviewUrl && editor) {
      const path = ReactEditor.findPath(editor, element);
      Transforms.removeNodes(editor, {at: path, hanging: true});
      insertImage(editor, imagePreviewUrl);
      setImageBtn(false);
    }
    setUploadFile("");
    setImagePreviewUrl("");
  }, [imagePreviewUrl]);

  return imageBtn ? (
    <div {...attributes} className="custom-element image-placeholder-element">
      <div
        className="image-placeholder-element-wrap"
        contentEditable="false"
        suppressContentEditableWarning
        style={{border: selected && focused ? "2px solid  #06c" : "2px solid  #cccccc"}}
      >
        <div className="image-placeholder-frame">
          <div className="image-placeholder-content">
            <div className="image-placeholder-buttons">
              <div className="image-option-btn-wrap">
                <div
                  className={`image-option-btn ${isUrl ? "active" : ""}`}
                  onClick={() => {
                    setIsUpload(false);
                    setIsUrl(!isUrl);
                  }}
                >
                  <BiLinkAlt />
                </div>
                {isUrl && (
                  <div className="image-url-field">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if(editor) {
                          const path = ReactEditor.findPath(editor, element);
                          Transforms.removeNodes(editor, {at: path, hanging: true});
                          insertImage(editor, imageUrl);
                          setImageUrl("");
                          setIsUrl(false);
                          setImageBtn(false);
                        }
                      }}
                    >
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e: any) => setImageUrl(e.target.value)}
                        placeholder="Type your image url.."
                      ></input>
                      <button type="submit">
                        <BiCheck />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="image-option-btn-wrap">
                <input
                  type="file"
                  id={uploadId}
                  hidden
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                ></input>
                <label
                  htmlFor={uploadId}
                  className={`image-option-btn ${isUpload ? "active" : ""}`}
                  onClick={() => {
                    setIsUrl(false);
                    setIsUpload(true);
                  }}
                >
                  <BiUpload />
                </label>
              </div>
            </div>

            <h6>{props.children}</h6>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ImageElementOption;
