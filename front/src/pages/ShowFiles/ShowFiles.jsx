import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShowFiles.module.css";

import { FaRegFilePdf } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { FaFileVideo } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa6";

const ShowFiles = () => {
  const [files, setFiles] = useState([]); //
  const [shareButtonClicked, setShareButtonClicked] = useState(false);
  const [fileShareLink, setFileShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const getData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/fileshare/list`
    );
    // console.log(response.data.result);
    setFiles(response.data.result);
  };
  useEffect(() => {
    getData();
  }, []);

  //! generic function to determine file type
  const tellFileType = (mimeType) => {
    let type = mimeType.slice(mimeType.lastIndexOf("/") + 1).trim();
    switch (type) {
      case "pdf":
        return <FaRegFilePdf />;
      case "img":
        return <CiImageOn />;
      case "mp4":
        return <FaFileVideo />;
      default:
        return <FaFile />;
    }
  };

  //! share handeler
  const handleShare = async (id) => {
    setShareButtonClicked(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/fileshare/share`,
      { _id: id }
    );
    console.log(response.data);
    setFileShareLink(response.data.link);
  };

  //! copy handeler
  const handleCopy = () => {
    if (fileShareLink) {
      navigator.clipboard.writeText(fileShareLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset "copied" after 2 sec
      });
    }
  };

  return (
    <>
      <div className={styles.contaier}>
        <h1>Your Files</h1>
        {/* Call api fetch all files from db show in a Ul */}

        {files && (
          <ul>
            {files.map((file) => {
              return (
                <li key={file._id} className={styles.card}>
                  <span className={styles.description}>
                    {tellFileType(file.mimeType)} {file.originalName}
                  </span>
                  <span
                    className={styles.share}
                    onClick={() => handleShare(file._id)}
                  >
                    <FaShare />
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {/* pop-up */}
        {shareButtonClicked && (
          <div className={styles.popup}>
            <p className={styles["popup-heading"]}>
              Share this link to download file :{" "}
            </p>
            <p className={styles["share-link"]}>
              <span>{fileShareLink}</span>
              <span
                className={styles["copy-btn"]}
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                <FaRegCopy />
              </span>
            </p>
            <span
              className={styles.close}
              onClick={() => setShareButtonClicked(false)}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowFiles;
