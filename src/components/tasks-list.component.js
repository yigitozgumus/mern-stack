import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Task = props => (
    <tr>
      <td>{props.task.projectname}</td>
      <td>{props.task.description}</td>
      {/* <td>{props.task.duration}</td> */}
      <td>{props.task.duedate.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
      </td>
    </tr>
  )

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);

    this.state = { tasks: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tasks/")
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTask(id) {
    axios.delete("http://localhost:5000/tasks/" + id).then(res => console.log(res.data));

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    });
  }

  taskList() {
    return this.state.tasks.map(currenttask => {
      return (
        <Task
          task={currenttask}
          deleteTask={this.deleteTask}
          key={currenttask._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>All Tasks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Projectname</th>
              <th>Description</th>
              {/* <th>Duration</th> */}
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}
