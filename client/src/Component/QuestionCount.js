import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { blue } from "@material-ui/core/colors";

import ReactChartkick, { LineChart, BarChart } from "react-chartkick";
import Chart from "chart.js";

//ReactChartkick.addAdapter(Chart)

const descriptionLen = 100;
const titleLen = 20;

const styles = theme => ({
  card: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  media: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    height: "8%",
    flexGrow: 1
  },
  status: {
    position: "absolute",
    bottom: "100px",
    right: "16px",
    color: "greenyellow",
    zIndex: "10"
  }
});

class QuestionCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.onClick = this.onClick.bind(this);
  }
  onClick = e => {
    alert("clicked");
  };

  render() {
    const { classes } = this.state;

    const { question, answers } = this.state.question;

    var answersForBarChart = [];
    for (var answer of answers) {
      answersForBarChart.push(Object.values(answer).slice(0, 2));
    }

    return (
      <div>
        <Typography component="p">
          {question.length > descriptionLen
            ? question.substring(0, descriptionLen - 3) + "..."
            : question}
        </Typography>

        <BarChart data={answersForBarChart} />
      </div>
    );
  }
}

export default withStyles(styles)(QuestionCount);
