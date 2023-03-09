import PlaylistItem from "./PlaylistItem";

const PlaylistsList = ({ playlists }) => {
  const renderedPlaylists = playlists.map((playlist) => {
    return (
      <PlaylistItem
        key={JSON.stringify(playlist.id.playlistId)}
        playlistID={playlist.id.playlistId}
        playlist={playlist}
      />
    );
  });
  return <div>{renderedPlaylists}</div>;
};

export default PlaylistsList;
