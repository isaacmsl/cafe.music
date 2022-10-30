"use strict";

const YOUTUBE_BASE_EMBED = "https://www.youtube.com/embed/";
const YOUTUBE_EMBED_DEFAULT_PARAMS = "?controls=0";
const YOUTUBE_EMBED_AUTO_PLAY_PARAM = "&autoplay=1";

let isAutoPlay = false;

const iframe = document.querySelector("iframe");

let currentRadio = {
    index: 0,
    embedCode: radios[0].youtubeEmbedCodes[0],
    indexLive: 0
};

const getYoutubeLinkFromEmbedCode = (embedCode, isAutoPlay) => {
    let link = YOUTUBE_BASE_EMBED + embedCode + YOUTUBE_EMBED_DEFAULT_PARAMS;

    if (isAutoPlay) {
        link += YOUTUBE_EMBED_AUTO_PLAY_PARAM;
    }

    return link;
};

const getAbsModularIndex = (index, mod) => {
    return Math.abs(index) % mod;
}

const setLiveRadioFromIndex = (indexLive, isAutoPlay) => {
    currentRadio.indexLive = getAbsModularIndex(indexLive, radios[currentRadio.index].youtubeEmbedCodes.length);
    currentRadio.embedCode = radios[currentRadio.index].youtubeEmbedCodes[currentRadio.indexLive];
    iframe.src = getYoutubeLinkFromEmbedCode(currentRadio.embedCode, isAutoPlay);
}
const setRadioFromIndex = (index, isAutoPlay) => {
    currentRadio.index = getAbsModularIndex(index, radios.length);
    setLiveRadioFromIndex(0, isAutoPlay);
}

const checkKey = (event) => {
    const key = event.key
    switch (key) {
        case " ":
            isAutoPlay = !isAutoPlay;
            setLiveRadioFromIndex(currentRadio.indexLive, isAutoPlay);
            break;
        case "ArrowLeft":
            setLiveRadioFromIndex(currentRadio.indexLive - 1, true);
            break;
        case "ArrowRight":
            setLiveRadioFromIndex(currentRadio.indexLive + 1, true);
            break;
        case "ArrowUp":
            setRadioFromIndex(currentRadio.index + 1, true);
            break;
        case "ArrowDown":
            setRadioFromIndex(currentRadio.index - 1, true);
            break;
    }
}

setLiveRadioFromIndex(currentRadio.indexLive, true);
document.onkeydown = checkKey;
