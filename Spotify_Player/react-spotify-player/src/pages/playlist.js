import React, {useState,useEffect,useContext} from "react";
import Styled from 'styled-components';

import { getViewRoute } from './../api';
import { SpotifyContext } from "../components/main";

import Loading from "./../components/loading";
import Tracklist from "./../components/tracklist";
import TracklistHeader from './../components/tracklistHeader';

const StyledPlaylist = Styled.div`
`

const Playlist = () => {
    const {uri,setUri,player,setTopBar,currentTrack,setSticky} = useContext(SpotifyContext);
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri})
                .then(setData);
        } else {
            setTopBar(data.header.name);
        }
    },[data,uri,setTopBar]);

    // reseta o data
    useEffect(() => {
        setData(null);
    },[uri])

    if (data) {
        const { table, header } = data;
        return (
            <StyledPlaylist className="playlist">
                <TracklistHeader
                    player={player}
                    header={header}
                    isPlaying={((currentTrack || {}).disallows || {}).resuming}
                    setSticky={setSticky}
                />
                <Tracklist
                    table={table}
                    setUri={setUri}
                    player={player}
                    currentTrack={currentTrack}
                />
            </StyledPlaylist>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Playlist;
