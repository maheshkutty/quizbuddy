import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItemText, Button, ListSubheader } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useNavigate } from "react-router-dom";

import QuizTheme from "../theme/appTheme";

function QuizCard(props) {

  const navigate = useNavigate();

  const onStartQuiz = () => {
    navigate("/attemptquiz");
  }

  return (
    <Box sx={{ width: 250 }}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AlarmIcon
            sx={{
              fontSize: 50,
              mb: 2,
            }}
          />
          <Typography variant="h5">Personalized Quiz</Typography>
          <Typography variant="list" >
            <ListItem sx={{ p: 0 }}>
              <KeyboardArrowRightIcon />
              <ListItemText primary="Time: 90 mins" />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <KeyboardArrowRightIcon />
              <ListItemText primary="Dfficulty: Medium" />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <KeyboardArrowRightIcon />
              <ListItemText primary="Questions: 20" />
            </ListItem>
          </Typography>
        </CardContent>
        <CardActions>
          <ThemeProvider theme={QuizTheme}>
            <Button fullWidth="true" variant="outlined" color="neutral" onClick={onStartQuiz}>
              Start quiz
            </Button>
          </ThemeProvider>
        </CardActions>
      </Card>
    </Box>
  );
}

export default QuizCard;
