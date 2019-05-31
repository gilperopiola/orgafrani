import React from 'react'
import { Layout, Typography } from 'antd';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ProjectModal from '../components/ProjectModal'
import TaskModal from '../components/TaskModal'
import SmallProjectCard from '../components/SmallProjectCard'
import HalfScreen from '../components/HalfScreen'
import FraniTree from '../components/FraniTree'

const { Content } = Layout;
const { Text } = Typography;

const INITIAL_STATE = {
    projects: [],
    importantProjects: [],
    skills: [],
    daily: [],
    weekly: [],

    newProjectModalOpen: false,
    newTaskModalOpen: false,
    newTaskProjectName: "",

    editProjectModalOpen: false,
    selectedProject: {},
    editTaskModalOpen: false,
    selectedTask: {},
}

class DashboardView extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillMount = () => {
        this.load()
    }

    componentDidMount = () => {
        this.getDailyTasks()
        this.getWeeklyTasks()
    }

    // #region Internal Data Management
    updateSkill = (name, amount) => {
        let skills = this.state.skills

        for (let i = 0; i < skills.length; i++) {
            if (skills[i].name === name) {
                skills[i].description = parseInt(skills[i].description) + amount
                break
            }

            if (skills[i].children.length > 0) {
                for (let j = 0; j < skills[i].children.length; j++) {
                    if (skills[i].children[j].name === name) {
                        skills[i].children[j].description = parseInt(skills[i].children[j].description) + amount
                        break
                    }

                    if (skills[i].children[j].children.length > 0) {
                        for (let k = 0; k < skills[i].children[j].children.length; k++) {
                            if (skills[i].children[j].children[k].name === name) {
                                skills[i].children[j].children[k].description = parseInt(skills[i].children[j].children[k].description) + amount
                                break
                            }
                        }
                    }
                }
            }
        }

        this.setState({ skills: skills })
        this.save();
    }

    createProject = (name, important) => {
        let projects = this.state.projects
        projects.push({ name: name, important: important, tasks: [], finishedTasks: [], archivedTasks: [] })
        this.setState({ projects: projects });
        this.handleNewProjectModal(false);
        this.save();
    }

    editProject = (name) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === this.state.selectedProject.name) {
                projects[i].name = name

                for (let j = 0; j < projects[i].tasks.length; j++) {
                    projects[i].tasks[j].projectName = name
                }
                for (let j = 0; j < projects[i].finishedTasks.length; j++) {
                    projects[i].finishedTasks[j].projectName = name
                }
                for (let j = 0; j < projects[i].archivedTasks.length; j++) {
                    projects[i].archivedTasks[j].projectName = name
                }

                break
            }
        }

        this.setState({ projects: projects, importantProjects: this.onlyGetImportant(projects) })
        this.save()
        this.handleEditProjectModal(false)
    }

    getEmptyProject = () => {
        return { name: "" }
    }

    getEmptyTask = () => {
        return { name: "", estimatedHours: 0.25, dueDate: null, important: false, daily: false, weekly: false }
    }

    createTask = (name, estimatedHours, dueDate, important, daily, weekly, projectName) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === projectName) {
                projects[i].tasks.push({
                    projectName: projectName,
                    name: name,
                    estimatedHours: estimatedHours,
                    dueDate: dueDate,
                    important: important,
                    daily: daily,
                    weekly: weekly,
                })
                break;
            }
        }

        this.setState({ projects: projects });
        this.handleNewTaskModal(false);
        this.save();
        this.getDailyTasks()
        this.getWeeklyTasks()
    }

    editTask = (name, estimatedHours, dueDate, important, daily, weekly) => {
        let projects = this.state.projects

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === this.state.selectedTask.projectName) {

                for (let j = 0; j < projects[i].tasks.length; j++) {
                    if (projects[i].tasks[j].name === this.state.selectedTask.name) {
                        projects[i].tasks[j].name = name
                        projects[i].tasks[j].estimatedHours = estimatedHours
                        projects[i].tasks[j].dueDate = dueDate
                        projects[i].tasks[j].important = important
                        projects[i].tasks[j].daily = daily
                        projects[i].tasks[j].weekly = weekly
                        break
                    }
                }
            }
        }

        this.setState({ projects: projects });
        this.save();
        this.handleEditTaskModal(false)
        this.getDailyTasks()
        this.getWeeklyTasks()
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
        this.getDailyTasks()
        this.getWeeklyTasks()
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
        this.getDailyTasks()
        this.getWeeklyTasks()
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
        localStorage.setItem("skills", JSON.stringify(this.state.skills));
    }

    load = () => {
        let projects = JSON.parse(localStorage.getItem("projects"))
        if (projects === null || projects === undefined) {
            projects = []
        }

        let skills = JSON.parse(localStorage.getItem("skills"))
        if (skills === null || skills === undefined) {
            skills = []
        }

        this.setState({ projects: projects, importantProjects: this.onlyGetImportant(projects), skills: skills })
    }

    onlyGetImportant = (projects) => {
        let importants = []

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].important) {
                importants.push(projects[i])
            }
        }

        return importants
    }

    // #endregion

    // #region Modal Handlers

    handleNewProjectModal = (open) => {
        this.setState({
            newProjectModalOpen: open,
            newTaskModalOpen: false,
            editProjectModalOpen: false,
            editTaskModalOpen: false,
        })
    }

    handleNewTaskModal = (open, projectName = "") => {
        this.setState({
            newTaskModalOpen: open,
            newTaskProjectName: projectName,
            newProjectModalOpen: false,
            editProjectModalOpen: false,
            editTaskModalOpen: false,
        })
    }

    handleEditProjectModal = (open, project = this.getEmptyProject()) => {
        this.setState({
            editProjectModalOpen: open,
            selectedProject: project,
            newProjectModalOpen: false,
            newTaskModalOpen: false,
            editTaskModalOpen: false,
        })
    }

    handleEditTaskModal = (open, task = this.getEmptyTask()) => {
        this.setState({
            editTaskModalOpen: open,
            selectedTask: task,
            newProjectModalOpen: false,
            newTaskModalOpen: false,
            editProjectModalOpen: false,
        })
    }

    //    #endregion

    // #region Render Functions

    getDailyTasks = () => {
        let projects = this.state.projects
        let dailyTasks = []

        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].tasks.length; j++) {
                if (projects[i].tasks[j].daily) {
                    dailyTasks.push(projects[i].tasks[j])
                }
            }
        }

        this.setState({
            daily: dailyTasks,
        })
    }

    getWeeklyTasks = () => {
        let projects = this.state.projects
        let weeklyTasks = []

        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].tasks.length; j++) {
                if (projects[i].tasks[j].weekly) {
                    weeklyTasks.push(projects[i].tasks[j])
                }
            }
        }

        this.setState({
            weekly: weeklyTasks,
        })
    }

    render() {
        return (
            <Layout>
                <KeyboardEventHandler handleKeys={['1']} onKeyEvent={(key, e) => window.location.assign("/dashboard")} />
                <KeyboardEventHandler handleKeys={['2']} onKeyEvent={(key, e) => window.location.assign("/projects")} />
                <KeyboardEventHandler handleKeys={['3']} onKeyEvent={(key, e) => window.location.assign("/skills")} />

                <Content style={{ height: "500px" }}>
                    <HalfScreen
                        title={"TODAY"}
                        backgroundColor={"#f1de58"}
                        tasks={this.state.daily}

                        finishTask={this.finishTask}
                        deleteTask={this.deleteTask}
                        handleEditTaskModal={this.handleEditTaskModal}
                    />

                    <HalfScreen
                        title={"THIS WEEK"}
                        backgroundColor={"#f19858"}
                        tasks={this.state.weekly}

                        finishTask={this.finishTask}
                        deleteTask={this.deleteTask}
                        handleEditTaskModal={this.handleEditTaskModal}
                    />
                </Content>

                <Content style={{ height: "100%", backgroundColor: "rgb(148, 67, 255)" }}>
                    {this.renderProjects()}
                </Content>

                <Content style={{ height: "100%", backgroundColor: "rgb(148, 67, 255)" }}>
                    <Text style={{ fontFamily: "Fjalla One", color: "white", fontSize: "38px" }}>SKILLS</Text>
                    <FraniTree
                        data={this.state.skills}
                        update={this.updateSkill}
                    />
                </Content>

                <ProjectModal
                    title={"New Project"}
                    visible={this.state.newProjectModalOpen}
                    onOk={this.createProject}
                    onCancel={this.handleNewProjectModal}
                />

                <TaskModal
                    title={"New Task"}
                    visible={this.state.newTaskModalOpen}
                    projectName={this.state.newTaskProjectName}
                    onOk={this.createTask}
                    onCancel={this.handleNewTaskModal}
                />

                <ProjectModal
                    title={"Edit Project"}
                    visible={this.state.editProjectModalOpen}
                    onOk={this.editProject}
                    onCancel={this.handleEditProjectModal}
                    defaultValues={this.state.selectedProject ? this.state.selectedProject : null}
                />

                <TaskModal
                    title={"Edit Task"}
                    visible={this.state.editTaskModalOpen}
                    onOk={this.editTask}
                    onCancel={this.handleEditTaskModal}
                    defaultValues={this.state.selectedTask ? this.state.selectedTask : null}
                />

            </Layout >
        )
    }

    renderProjects = () => {
        return (
            this.state.importantProjects.map((project, i) => (
                <SmallProjectCard
                    key={i}
                    project={project}

                    handleNewTaskModal={this.handleNewTaskModal}
                    handleEditProjectModal={this.handleEditProjectModal}
                    handleEditTaskModal={this.handleEditTaskModal}

                    editProject={this.editProject}
                    deleteProject={this.deleteProject}

                    finishTask={this.finishTask}
                    editTask={this.editTask}
                    deleteTask={this.deleteTask}
                />
            ))
        )
    }

    // #endregion
}

export default DashboardView;
