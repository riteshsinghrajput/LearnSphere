import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { IoMdDownload } from "react-icons/io";
import { useSelector } from "react-redux";

import { downloadMedia, FormatDate } from "../utils/common-utils";



const Own = styled(Box)`
  background: rgb(100 85 247);
  max-width: 100%;
  margin-left: auto;
  margin-top: 10px;
  padding: 5px;
  width: fit-content;
  display: flex;
  word-break: break-all;
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
`;
const SenderMsg = styled(Box)`
  background: #bdc1d5;
  max-width: 60%;
  margin-bottom: 10px;
  padding: 5px;
  width: fit-content;
  display: flex;
  word-break: break-all;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;
const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-bottom: auto;
`;

function Chats({ msg }) {
    const userData = useSelector((state) => state?.auth?.data);

  return (
    <>
      {userData._id === msg.senderId ? (
        <Own>
          {msg.type === "text" && <TextSend msg={msg} />}
          {msg.type === "image" && <ImageSend msg={msg} />}
          {msg.type === "music" && <MusicSend msg={msg} />}
          {msg.type === "vedio" && <VedioSend msg={msg} />}
          {msg.type === "pdf" && <PdfSend msg={msg} />}
          {msg.type !== "pdf" &&
            msg.type !== "text" &&
            msg.type !== "image" &&
            msg.type !== "music" &&
            msg.type !== "vedio" && <OtherDocs msg={msg} />}
        </Own>
      ) : (
        <SenderMsg>
          {msg.type === "text" && <TextSend msg={msg} />}
          {msg.type === "image" && <ImageSend msg={msg} />}
          {msg.type === "music" && <MusicSend msg={msg} />}
          {msg.type === "vedio" && <VedioSend msg={msg} />}
          {msg.type === "pdf" && <PdfSend msg={msg} />}
          {msg.type !== "pdf" &&
            msg.type !== "text" &&
            msg.type !== "image" &&
            msg.type !== "music" &&
            msg.type !== "vedio" && <OtherDocs msg={msg} />}
        </SenderMsg>
      )}
    </>
  );
}

const TextSend = ({ msg }) => {
  return (
    <>
      <Text>{msg.text}</Text>
      <Time>{FormatDate(msg.createdAt)}</Time>
    </>
  );
};

const ImageSend = ({ msg }) => {
  return (
    <div className="flex flex-col relative">
      <img
        src={msg.text}
        alt="file"
        style={{ width: 300, height: 150, objectFit: "conver" }}
      />

      <Time className="flex absolute bottom-0 right-0 items-center">
        <IoMdDownload
          className="mr-[10px] border rounded-[50%] text-[20px] cursor-pointer"
          onClick={(e) => downloadMedia(e, msg.text)}
        />
        {FormatDate(msg.createdAt)}
      </Time>
    </div>
  );
};

const MusicSend = ({ msg }) => {
  return (
    <div className="relative">
      <audio controls>
        <source src={msg.text} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <Time className="absolute z-40 right-0 bottom-0 font-extrabold items-center text-black">
        {FormatDate(msg.createdAt)}
      </Time>
    </div>
  );
};

const VedioSend = ({ msg }) => {
  return (
    <div className="flex flex-col bg-white border-none relative">
      <video width="320" height="240" controls>
        <source src={msg.text} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Time className="flex absolute bottom-0 right-0 items-center">
        {FormatDate(msg.createdAt)}
      </Time>
    </div>
  );
};

const PdfSend = ({ msg }) => {
  const nameSplit = msg.text.split("/");
  const duplicateName = nameSplit.pop();
  return (
    <div className="flex flex-col relative">
      <img
        src={""}
        alt="file"
        style={{ width: 100, height: 50, objectFit: "conver" }}
      />

      <Text>{duplicateName}</Text>
      <Time className="flex">
        <IoMdDownload
          className="mr-[10px] border rounded-[50%] text-[20px] cursor-pointer"
          onClick={(e) => downloadMedia(e, msg.text)}
        />
        {FormatDate(msg.createdAt)}
      </Time>
    </div>
  );
};
const OtherDocs = ({ msg }) => {
  const nameSplit = msg.text.split("/");
  const duplicateName = nameSplit.pop();

  return (
    <div className="flex items-center h-[100%]">
      <Text>{duplicateName}</Text>
      <Time className="flex">
        <IoMdDownload
          className="mr-[10px] border rounded-[50%] text-[20px] cursor-pointer"
          onClick={(e) => downloadMedia(e, msg.text)}
        />
        {FormatDate(msg.createdAt)}
      </Time>
    </div>
  );
};

export default Chats;
