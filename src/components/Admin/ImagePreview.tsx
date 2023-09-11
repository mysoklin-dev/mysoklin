import React from 'react';

type ImagePreviewProps = {
  file?: File | undefined;
  imgUrl?: string | undefined;
  fileName?: string;
  appendIcon?: React.ReactNode | undefined;
};

const ImagePreview = ({
  file,
  imgUrl,
  fileName = '',
  appendIcon,
}: ImagePreviewProps) => {
  let preview;
  let name: string;

  if (file) {
    preview = window.URL.createObjectURL(file);
    name = file.name;
  } else {
    preview = imgUrl;
    name = fileName;
  }

  return (
    <div className="mb-3 grid grid-cols-5 gap-4">
      <div className="col-span-1">
        <div className="thumbnail">
          <img className="mb-2 inline-block" src={preview} alt="" />
        </div>
      </div>

      <div className="col-span-3 overflow-hidden text-ellipsis break-words pr-2 text-left text-xs">
        <em>{name}</em>
      </div>

      {appendIcon && (
        <div className="col-span-1 flex justify-end pr-2">{appendIcon}</div>
      )}

      <style jsx>{`
        .thumbnail {
          --thumbSize: 60px;
          flex-shrink: 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          width: var(--thumbSize);
          height: var(--thumbSize);
          border-radius: 5px;
          overflow: hidden;
          font-size: 1.2rem;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          max-width: 100%;
          object-fit: cover;
          overflow: hidden;
          margin: 0 !important;
        }

        .appendIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          font-size: 20px;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default ImagePreview;
