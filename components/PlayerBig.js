import React from "react";
import Slider from "rc-slider";
import moment from "moment";

import styles from "./PlayerBig.module.scss";
import PlayButton from "../icons/PlayIcon";
import PauseButton from "../icons/PauseIcon";
import ArrowIcon from "../icons/ArrowIcon";
import DownloadButton from "../icons/DownloadIcon";
import LoadingState from "./LoadingState";

function PlayerBig({
  title,
  loading,
  metaData,
  trackId,
  progress,
  max,
  isPlay,
  player,
  setIsPlay,
  setProgress,
  changeSize,
}) {
  const togglePlay = () => {
    setIsPlay(!isPlay);
    player.togglePause();
  };

  return (
    <React.Fragment>
      <div className={styles.wheader}>
        <div className={styles.empty}></div>
        <img className={styles.banner} src={`/images/disc_${isPlay ? "anim" : "idle"}.gif`} alt="anim" />
        <div className={styles.downloadWrap}>
          <DownloadButton
            height="20"
            width="50"
            onClick={() => {
              window.location.href = `https://api.modarchive.org/downloads.php?moduleid=${trackId}`;
            }}
          />
        </div>
      </div>
      <h1 className={styles.title}>{title ? title : "[No Title]"}</h1>
      {!loading ? (
        <ul className={styles.metadata}>
          <li>Type: {metaData.type}</li>
          <li>Track Id: #{trackId}</li>
          <li>Message: {metaData.message}</li>
        </ul>
      ) : (
        <LoadingState />
      )}
      <Slider
        railStyle={{ backgroundColor: "white", height: 6 }}
        trackStyle={{ backgroundColor: "#bd00ff", height: 6 }}
        handleStyle={{
          borderColor: "#bd00ff",
          backgroundColor: "#bd00ff",
        }}
        className={styles.seekbar}
        value={progress}
        max={max}
        onChange={(val) => {
          setProgress(val);
          player.seek(val);
        }}
      />
      <div className={styles.seekNumbers}>
        <span>{moment().startOf("day").seconds(progress).format("mm:ss")}</span>
        <span>{moment().startOf("day").seconds(max).format("mm:ss")}</span>
      </div>
      {!isPlay ? (
        <PlayButton
          className={styles.actionbtn}
          height="130"
          width="130"
          onClick={!loading ? () => togglePlay() : null}
        />
      ) : (
        <PauseButton
          className={styles.actionbtn}
          height="130"
          width="130"
          onClick={() => togglePlay()}
        />
      )}
      <ArrowIcon
        className={styles.arrow}
        height="20"
        width="50"
        onClick={() => changeSize()}
      />
    </React.Fragment>
  );
}

export default PlayerBig;
