import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:3001/repos/update'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_repoId: response.data.todo_repoId,
                    todo_username: response.data.todo_username,
                    todo_name: response.data.todo_name
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
            todo_repoId: this.state.todo_repoId,
            todo_username: this.state.todo_username,
            todo_name: this.state.todo_name
        };
        console.log(obj);
        axios.post('http://localhost:3001/repos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Repo ID </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_repoId}
                                onChange={this.onChangeTodoRepoId}
                                />
                    </div>
                    <div className="form-group">
                        <label>Username </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_username}
                                onChange={this.onChangeTodoUsername}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.onChangeTodoName}
                                />
                    </div>
                    


                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}