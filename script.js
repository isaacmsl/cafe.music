"use strict";

const YOUTUBE_BASE_EMBED = "https://www.youtube.com/embed/";
const YOUTUBE_EMBED_DEFAULT_PARAMS = "?controls=0";
const YOUTUBE_EMBED_AUTO_PLAY_PARAM = "&autoplay=1";

let isAutoPlay = false;

const iframe = document.querySelector("iframe");

let currentRadio = {
    embedCode: radios.youtubeEmbedCodes[0],
    index: 0
};

const getYoutubeLinkFromEmbedCode = (embedCode, isAutoPlay) => {
    let link = YOUTUBE_BASE_EMBED + embedCode + YOUTUBE_EMBED_DEFAULT_PARAMS;
    
    if (isAutoPlay) {
        link += YOUTUBE_EMBED_AUTO_PLAY_PARAM;
    }

    return link;
};

const getAbsModularIndex = (index) => {
    return Math.abs(index) % radios.youtubeEmbedCodes.length;
}

const setRadioFromIndex = (index, isAutoPlay) => {
    currentRadio.index = getAbsModularIndex(index);
    currentRadio.embedCode = radios.youtubeEmbedCodes[currentRadio.index];
    iframe.src = getYoutubeLinkFromEmbedCode(currentRadio.embedCode, isAutoPlay);
}

const checkKey = (event) => {
    const key = event.key
    switch (key) {
        case " ":
            isAutoPlay = !isAutoPlay;
            setRadioFromIndex(currentRadio.index, isAutoPlay);
            break;
        case "ArrowLeft":
            setRadioFromIndex(currentRadio.index + 1, true);
            break;
        case "ArrowRight":
            setRadioFromIndex(currentRadio.index + 1, true);
            break;
    }
}

setRadioFromIndex(currentRadio.index, true);
document.onkeydown = checkKey;