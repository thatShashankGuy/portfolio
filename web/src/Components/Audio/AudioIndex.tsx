import { Grid, Typography, List, Box } from "@mui/material"
import  GenerateAudioList  from "./GenerateAudioList";
import { Widget,CoverImage } from "./Private/StyleComponents";
import audInd from '../../assets/podcast.svg'
import { faHeadphonesAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PodcastIndex = () => {
  return <>
    <Widget>
      <Box sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CoverImage>
              <img alt="Conversations" src={audInd} />
            </CoverImage>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            The half-byte broadcast  <FontAwesomeIcon icon={faHeadphonesAlt}/>
            </Typography>
            <List>
              {GenerateAudioList()}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Widget>
  </>
}

export default PodcastIndex