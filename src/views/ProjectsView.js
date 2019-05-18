import React from 'react'
import { Layout } from 'antd';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ProjectModal from '../components/ProjectModal'
import TaskModal from '../components/TaskModal'
import ProjectCard from '../components/ProjectCard'

const { Content } = Layout;

const INITIAL_STATE = {
    projects: [],

    newProjectModalOpen: false,
    newTaskModalOpen: false,
    newTaskProjectName: "",
}

class ProjectsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillMount = () => {
        this.load()
    }

    // #region Internal Data Management
    createProject = (name) => {
        let projects = this.state.projects
        projects.push({ name: name, tasks: [], finishedTasks: [], archivedTasks: [] })
        this.setState({ projects: projects });
        this.handleNewProjectModal(false);
        this.save();
    }

    editProject = (project, name) => {
        let projects = this.state.projects
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === project.name) {
                projects[i].name = name
                break
            }
        }

        this.setState({ projects: projects });
        this.save();
    }

    moveProject = (project, swapIndex) => {
        let projects = this.state.projects
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === project.name) {
                let temp = projects[i]
                projects[i] = projects[i + swapIndex]
                projects[i + swapIndex] = temp
                break
            }
        }

        this.setState({ projects: projects });
        this.save();
    }

    createTask = (projectName, name, spentHours, estimatedHours, dueDate, important) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === projectName) {
                projects[i].tasks.push({
                    projectName: projectName,
                    name: name,
                    spentHours: spentHours,
                    estimatedHours: estimatedHours,
                    dueDate: dueDate,
                    important: important
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

    // #region Modal Handlers

    handleNewProjectModal = (open) => {
        this.setState({
            newProjectModalOpen: open,
            newTaskModalOpen: false,
        })
    }

    handleNewTaskModal = (open, projectName = "") => {
        this.setState({
            newTaskModalOpen: open,
            newTaskProjectName: projectName,
            newProjectModalOpen: false,
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

                <ProjectModal
                    title={"New Project"}
                    visible={this.state.newProjectModalOpen}
                    onOk={this.createProject}
                    onCancel={this.handleNewProjectModal}
                />

                <TaskModal
                    visible={this.state.newTaskModalOpen}
                    projectName={this.state.newTaskProjectName}
                    onOk={this.createTask}
                    onCancel={this.handleNewTaskModal}
                />
            </Layout >
        )
    }

    renderProjects = () => {
        return (
            this.state.projects.map((project, i) => (
                <ProjectCard project={project}
                    handleNewTaskModal={this.handleNewTaskModal}
                    editProject={this.editProject}
                    moveProject={this.moveProject}
                    deleteProject={this.deleteProject}
                    deleteTask={this.deleteTask}
                    finishTask={this.finishTask}
                />
            ))
        )
    }

    // #endregion

}

export default ProjectsView;
