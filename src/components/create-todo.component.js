import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoRepoId = this.onChangeTodoRepoId.bind(this);
        this.onChangeTodoUsername = this.onChangeTodoUsername.bind(this);
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_repoId: '',
            todo_username: '',
            todo_name: ''
        }
    }

    onChangeTodoRepoId(e) {
        this.setState({
            todo_repoId: e.target.value
        });
    }

    onChangeTodoUsername(e) {
        this.setState({
            todo_username: e.target.value
        });
    }

    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_repoId}`);
        console.log(`Todo Responsible: ${this.state.todo_username}`);
        console.log(`Todo Priority: ${this.state.todo_name}`);
     
        const newTodo = {
            todo_repoId: this.state.todo_repoId,
            todo_username: this.state.todo_username,
            todo_name: this.state.todo_name,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:3001/repos/create', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_repoId: '',
            todo_username: '',
            todo_name: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Repo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Repo ID: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_repoId}
                                onChange={this.onChangeTodoRepoId}
                                />
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_username}
                                onChange={this.onChangeTodoUsername}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.onChangeTodoName}
                                />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}