type ImagePreviewProps = {
  file?: File | undefined;
  imgUrl?: string | undefined;
  fileName?: string;
};

const ImagePreview = ({ file, imgUrl, fileName = '' }: ImagePreviewProps) => {
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
    <div className="mb-3 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <div className="thumbnail">
          <img className="mb-2 inline-block" src={preview} alt="" />
        </div>
      </div>

      <div className="col-span-3 overflow-hidden text-ellipsis break-words text-left text-xs">
        <em>{name}</em>
      </div>

      <style jsx>{`
        .thumbnail {
          --thumbSize: 75px;
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
      `}</style>
    </div>
  );
};

export default ImagePreview;
