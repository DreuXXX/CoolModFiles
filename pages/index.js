import React from "react";
import Player from "../components/Player";



function Index() {
  const [player, setPlayer] = React.useState(undefined);
  const [trackId, setTrackId] = React.useState(-1);
  const [meteData, setMetaData] = React.useState({});
  const [duration, setDuration] = React.useState(-1);
  const [prog, setProg] = React.useState(0);
  let interval;

  React.useEffect(() => {
    initPlayer();
  }, []);

  const initPlayer = function () {
    setPlayer(new ChiptuneJsPlayer(new ChiptuneJsConfig(0)));
  };

  const playRandom = function () {
    const id = getRandomInt(0, RANDOM_MAX);
    player.load(`jsplayer.php?moduleid=${id}`, (buffer, error) => {
      if (error) {
        playRandom();
        return;
      }
      player.play(buffer);
      setMetaData(player.metadata());
      setDuration(player.duration());
      setTrackId(id);
      interval = setInterval(() => {
        try {
          setProg(player.getPosition());
        } catch (error) {}
      }, 500);
    });
  };

  return (
    <div id="app">
      {/*       <h1>Mod music player</h1>
      <button onClick={playRandom}>Play Random</button>
      {player?.currentPlayingNode && (
        <React.Fragment>
          <button
            onClick={() => {
              clearInterval(interval);
              player.togglePause();
            }}
          >
            pause
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            value={prog}
            onChange={(e) => {
              setProg(e.target.value);
              player.seek(e.target.value);
            }}
          />
          <p>{JSON.stringify(meteData)}</p>
        </React.Fragment>
      )} */}
      <Player />
    </div>
  );
}

export default Index;
