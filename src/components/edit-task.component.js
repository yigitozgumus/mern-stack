import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectname = this.onChangeProjectname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectname: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          projectname: response.data.projectname,
          description: response.data.description,
          duration: response.data.duration,
          duedate: new Date(response.data.duedate)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/projects/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.projectname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeProjectname(e) {
    this.setState({
      projectname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(duedate) {
    this.setState({
      duedate: duedate
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      projectname: this.state.projectname,
      description: this.state.description,
      duration: this.state.duration,
      duedate: this.state.duedate
    }

    console.log(task);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit a Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Projectname: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.projectname}
              onChange={this.onChangeProjectname}>
              {
                this.state.projects.map(function(project) {
                  return <option 
                    key={project}
                    value={project}>{project}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Due Date: </label>
          <div>
            <DatePicker
              selected={this.state.duedate}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Task Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}