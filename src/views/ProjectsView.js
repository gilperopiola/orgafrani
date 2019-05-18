import React from 'react'
import { Layout, Modal, Input, InputNumber, Icon, List, DatePicker, Switch } from 'antd';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import moment from 'moment';
import 'simplebar';
import 'simplebar/dist/simplebar.css';


const { Content } = Layout;

const INITIAL_STATE = {
    projects: [],

    newProject: {
        modalOpen: false,
        name: "",
    },

    newTask: {
        modalOpen: false,
        projectName: "",
        name: "",
        spentHours: 0,
        estimatedHours: 0.25,
        dueDate: null,
        important: false,
    }
}

class ProjectsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillMount = () => {
        this.load()
    }

    // #region Main Functions
    createProject = () => {
        let projects = this.state.projects
        projects.push({ name: this.state.newProject.name, tasks: [], finishedTasks: [], archivedTasks: [] })
        this.setState({ projects: projects });
        this.handleNewProjectModal(false);
        this.save();
    }

    createTask = () => {
        let projects = this.state.projects
        let newTask = this.state.newTask;

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === newTask.projectName) {
                projects[i].tasks.push({
                    name: newTask.name,
                    projectName: newTask.projectName,
                    spentHours: newTask.spentHours,
                    estimatedHours: newTask.estimatedHours,
                    dueDate: newTask.dueDate,
                    important: newTask.important
                })
                break;
            }
        }

        this.setState({ projects: projects });
        this.handleNewTaskModal(false);
        this.save();
    }

    finishTask = (task) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === task.projectName) {
                for (let j = 0; j < projects[i].tasks.length; j++) {
                    if (projects[i].tasks[j].name === task.name) {
                        projects[i].tasks.splice(j, 1)
                        projects[i].finishedTasks.push(task);
                        break;
                    }
                }
            }
        }

        this.setState({ projects: projects });
        this.save();
    }

    deleteTask = (task) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === task.projectName) {
                for (let j = 0; j < projects[i].tasks.length; j++) {
                    if (projects[i].tasks[j].name === task.name) {
                        projects[i].tasks.splice(j, 1)
                        break;
                    }
                }
            }
        }

        this.setState({ projects: projects });
        this.save();
    }

    deleteProject = (project) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === project.name) {
                projects.splice(i, 1)
                break;
            }
        }

        this.setState({ projects: projects });
        this.save();
    }

    save = () => {
        localStorage.setItem("projects", JSON.stringify(this.state.projects));
    }

    load = () => {
        let projects = JSON.parse(localStorage.getItem("projects"))
        if (projects === null || projects === undefined) {
            projects = []
        }
        this.setState({ projects: projects })
    }

    // #endregion

    // #region Handlers


    handleNewProjectModal = (open) => {
        this.setState({
            newProject: { modalOpen: open, name: "" },
            newTask: { modalOpen: false, projectName: "", name: "", spentHours: 0, estimatedHours: 0.25, dueDate: null, important: false },
        })
    }

    handleNewProjectNameChange = (e) => {
        this.setState({
            newProject: { modalOpen: this.state.newProject.modalOpen, name: e.target.value },
        })
    }

    handleNewTaskModal = (open, projectName = "") => {
        this.setState({
            newTask: { modalOpen: open, projectName: projectName, name: "", spentHours: 0, estimatedHours: 0.25, dueDate: null, important: false },
            newProject: { modalOpen: false, name: "" },
        })
    }

    handleNewTaskNameChange = (e) => {
        this.setState({
            newTask: {
                modalOpen: this.state.newTask.modalOpen,
                projectName: this.state.newTask.projectName,
                name: e.target.value,
                estimatedHours: this.state.newTask.estimatedHours,
                dueDate: this.state.newTask.dueDate,
                important: this.state.newTask.important
            },
        })
    }

    handleNewTaskEstimatedHoursChange = (value) => {
        this.setState({
            newTask: {
                modalOpen: this.state.newTask.modalOpen,
                projectName: this.state.newTask.projectName,
                name: this.state.newTask.name,
                spentHours: this.state.newTask.spentHours,
                estimatedHours: value,
                dueDate: this.state.newTask.dueDate,
                important: this.state.newTask.important
            },
        })
    }

    handleNewTaskDueDateChange = (date) => {
        this.setState({
            newTask: {
                modalOpen: this.state.newTask.modalOpen,
                projectName: this.state.newTask.projectName,
                name: this.state.newTask.name,
                spentHours: this.state.newTask.spentHours,
                estimatedHours: this.state.newTask.estimatedHours,
                dueDate: date,
                important: this.state.newTask.important
            },
        })
    }

    handleNewTaskImportantChange = (enabled) => {
        this.setState({
            newTask: {
                modalOpen: this.state.newTask.modalOpen,
                projectName: this.state.newTask.projectName,
                name: this.state.newTask.name,
                spentHours: this.state.newTask.spentHours,
                estimatedHours: this.state.newTask.estimatedHours,
                dueDate: this.state.newTask.dueDate,
                important: enabled
            },
        })
    }

    //    #endregion

    // #region Render Functions

    render() {
        return (
            <Layout>
                <KeyboardEventHandler handleKeys={['p', 'P']} onKeyEvent={(key, e) => this.handleNewProjectModal(true)} />

                <Content style={{ height: "100%" }}>
                    {this.renderProjects()}
                </Content>

                <Modal
                    title="New Project"
                    visible={this.state.newProject.modalOpen}
                    onOk={this.createProject}
                    onCancel={() => this.handleNewProjectModal(false)}
                >
                    <Input placeholder="Name" prefix={<Icon type="folder-open" style={{ color: 'rgba(0,0,0,.45)' }} />}
                        onChange={this.handleNewProjectNameChange} value={this.state.newProject.name} />
                </Modal>

                <Modal
                    title="New Task"
                    visible={this.state.newTask.modalOpen}
                    onOk={this.createTask}
                    onCancel={() => this.handleNewTaskModal(false)}
                >
                    <Input
                        placeholder="Name"
                        onChange={this.handleNewTaskNameChange} value={this.state.newTask.name}
                        style={{ display: "block", marginBottom: "12px" }}
                        prefix={
                            <Icon type="folder-open" style={{ color: 'rgba(0,0,0,.45)' }} />
                        }
                    />

                    Estimated hours:
                    <InputNumber
                        min={0.25}
                        defaultValue={0.25}
                        onChange={this.handleNewTaskEstimatedHoursChange}
                        value={this.state.newTask.estimatedHours}
                        style={{ display: "inline-block", marginBottom: "12px", marginLeft: "12px" }}
                    />

                    <DatePicker
                        placeholder={"Due Date"}
                        onChange={this.handleNewTaskDueDateChange}
                        value={this.state.newTask.dueDate}
                        style={{ display: "block", marginBottom: "12px" }}
                    />

                    Important:
                    <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        onChange={this.handleNewTaskImportantChange}
                        checked={this.state.newTask.important}
                        style={{ display: "inline-block", marginTop: "12px", marginBottom: "12px", marginLeft: "12px" }}
                    />
                </Modal>
            </Layout >
        )
    }

    renderProjects = () => {
        return (
            this.state.projects.map((project, i) => (
                <List
                    key={i}
                    data-simplebar
                    size="small"
                    style={{
                        backgroundColor: "#491a92", width: "24%",
                        display: "inline-block", margin: "4px",
                        fontFamily: "Fjalla One", color: "white",
                        maxHeight: "500px", minHeight: "500px",
                        overflow: "auto"
                    }}
                    header={
                        <div style={{ fontSize: "42px", textAlign: "left", padding: "8px", paddingLeft: "24px" }}>
                            {project.name.toUpperCase().substring(0, 15)}
                            <Icon
                                type="plus"
                                onClick={() => this.handleNewTaskModal(true, project.name)}
                                style={{ color: '#67ff35', float: "right", marginTop: "8px", marginRight: "12px", cursor: "pointer" }}
                            />
                            <Icon
                                type="cross"
                                onClick={() => this.deleteProject(project)}
                                style={{ color: '#f32e2e', float: "right", marginTop: "18px", marginRight: "12px", cursor: "pointer", fontSize: '24px' }}
                            />

                        </div>
                    }
                    dataSource={project.tasks}
                    renderItem={task => (
                        <div style={{ color: task.important ? "#ffeb00" : "white", minHeight: "50px", fontSize: "22px", padding: "15px", textAlign: "left" }}>
                            {task.name.substring(0, 28)}
                            <div style={{ float: "right" }}>
                                {task.estimatedHours}hs
                                <Icon
                                    type="check"
                                    onClick={() => this.finishTask(task)}
                                    style={{ color: '#67ff35', marginLeft: "8px", cursor: "pointer" }}
                                />
                                <Icon
                                    type="cross"
                                    onClick={() => this.deleteTask(task)}
                                    style={{ color: '#f32e2e', marginLeft: "8px", cursor: "pointer" }}
                                />

                            </div>
                        </div>
                    )}

                />
            ))
        )
    }

    // #endregion

}

export default ProjectsView;
