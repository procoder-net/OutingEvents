import React from "react";
import { HorizontalBar } from "react-chartjs-2";

class QuestionCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.onClick = this.onClick.bind(this);
    const { question } = this.state;
    console.log(question);
    this.chartData = {
      labels: question.answers.map(ans => ans.answer),
      datasets: [
        {
          label: question.question,
          backgroundColor: "rgba(150,50,50,0.2)",
          borderColor: "rgba(150,50,50,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(150,50,50,0.4)",
          hoverBorderColor: "rgba(150,50,50,1)",
          data: question.answers.map(ans => ans.count)
        }
      ]
    };
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
        <HorizontalBar data={this.chartData} width={100} height={50} />
      </div>
    );
  }
}

export default QuestionCount;
