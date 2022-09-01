import React from "react";
import { Box, Button } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";

class TimeCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: this.props.mins * 60 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    console.log(this.props.mins * 60);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    //startTimer();
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.props.submitQuiz();
    }
  }

  render() {
    return (
      <Box
        sx={{
          backgroundColor: "#fff3e7",
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlarmIcon sx={{ fontSize: 30, mr: 1 }} />
        <span>Time Left - 0</span>
        <span>
          {this.state.time.m} : {this.state.time.s} mins
        </span>
      </Box>
    );
  }
}
export default TimeCounter;
