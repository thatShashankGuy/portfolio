import { faCirclePlay, faMeteor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';
import { AudioIndexItem } from '../../Constants/Types';
import { URLS } from '../../Constants/DataObjects';
import { Navigate } from "react-router";


export const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    marginLeft: 260,
    borderRadius: 16,
    width: 900,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
    opacity: 0.8
  }));

export const CoverImage = styled('div')({
    width: 300,
    height: 200,
    objectFit: 'fill',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
      height: '100%'
    },
  });
  
export const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

export const generate = () => {
    return [{ID : 1, Name:"PODCAST#1 - Welcome All!"},{ID : 2, Name:"PODCAST#1 - OOPS!"}].map((obj) =>
      <CustomListItem key={obj.ID} nameText={obj.Name}></CustomListItem>
    );
  }

const CustomListItem : React.FC<AudioIndexItem> = ({nameText}) =>{
  async function playRequestedAudio(){
    const audioUrl = await fetchAudio();
    if(audioUrl){
      Navigate({to:'/player', state: { data: audioUrl } })
    }   
  }

  return (  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="play" onClick={playRequestedAudio}>
        <FontAwesomeIcon icon={faCirclePlay} />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar>
        <FontAwesomeIcon icon={faMeteor} />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={nameText} />
  </ListItem>)
}

export async function fetchAudio() {
  try {
    const response = await fetch(URLS.devAudio,{
      method : "GET",
      headers:{
        "Content-Type" :"application/json"
      }
    });
    console.log(response)
    const audioString = await response.json();
    const binaryString = window.atob(audioString)
    const bytesStore = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        bytesStore[i] = binaryString.charCodeAt(i)
    }

    const audioData =  bytesStore.buffer;
    const blob = new Blob([audioData], { type: 'audio/ogg' });
    const audioUrl = URL.createObjectURL(blob);
    console.log(audioUrl)
    return audioUrl
  
} catch (e: any) {
    console.log("error getting audio file: " + e.message)
}
}
  