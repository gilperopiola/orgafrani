import React from 'react'
import { Layout, Typography } from 'antd';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ProjectModal from '../components/ProjectModal'
import TaskModal from '../components/TaskModal'
import ProjectCard from '../components/ProjectCard'
import HalfScreen from '../components/HalfScreen'
import FraniTree from '../components/FraniTree'

const { Content } = Layout;
const { Text } = Typography;

const INITIAL_STATE = {
    projects: [],
    daily: [],
    weekly: [],

    newProjectModalOpen: false,
    newTaskModalOpen: false,
    newTaskProjectName: "",

    editProjectModalOpen: false,
    selectedProject: {},
    editTaskModalOpen: false,
    selectedTask: {},

    testData: [{
        "name": "Programming",
        "description": "83",
        "children": [{
            "name": "Frontend",
            "description": "60",
            "children": [{
                "name": "HTML & CSS",
                "description": "69",
                "children": []
            }, {
                "name": "JavaScript",
                "description": "70",
                "children": []
            }, {
                "name": "React JS",
                "description": "70",
                "children": []
            }]
        }, {
            "name": "Backend",
            "description": "80",
            "children": [{
                "name": "Golang",
                "description": "80",
                "children": []
            }, {
                "name": "PHP",
                "description": "56",
                "children": []
            }, {
                "name": "Node JS",
                "description": "0",
                "children": []
            }, {
                "name": "SQL",
                "description": "60",
                "children": []
            }, {
                "name": "Heroku",
                "description": "60",
                "children": []
            }, {
                "name": "AWS",
                "description": "30",
                "children": []
            }, {
                "name": "Google Cloud",
                "description": "20",
                "children": []
            }]
        }, {
            "name": "Videogames",
            "description": "75",
            "children": [{
                "name": "C#",
                "description": "77",
                "children": []
            }, {
                "name": "Unity",
                "description": "72",
                "children": []
            }, {
                "name": "C++",
                "description": "52",
                "children": []
            }]
        }, {
            "name": "Mobile",
            "description": "34",
            "children": [{
                "name": "Android Studio",
                "description": "32",
                "children": []
            }, {
                "name": "React Native",
                "description": "36",
                "children": []
            }]
        }, {
            "name": "AI",
            "description": "71",
            "children": []
        }]
    }, {
        "name": "Writing",
        "description": "83",
        "children": []
    }, {
        "name": "Mathematics",
        "description": "52",
        "children": []
    }, {
        "name": "Physics",
        "description": "62",
        "children": []
    }, {
        "name": "Chemistry",
        "description": "33",
        "children": []
    }, {
        "name": "Psychology",
        "description": "47",
        "children": []
    }, {
        "name": "Philosophy",
        "description": "60",
        "children": []
    }, {
        "name": "Linguistics",
        "description": "40",
        "children": []
    }, {
        "name": "2D Arts",
        "description": "35",
        "children": [{
            "name": "Drawing",
            "description": "32",
            "children": []
        }, {
            "name": "Pixel Art",
            "description": "43",
            "children": []
        }]
    }, {
        "name": "3D Arts",
        "description": "45",
        "children": [{
            "name": "3D Modeling",
            "description": "49",
            "children": []
        }, {
            "name": "Voxel Art",
            "description": "48",
            "children": []
        }]
    }, {
        "name": "Economy",
        "description": "28",
        "children": []
    }, {
        "name": "History",
        "description": "60",
        "children": [{
            "name": "Universal History",
            "description": "55",
            "children": []
        }, {
            "name": "Human History",
            "description": "62",
            "children": [{
                "name": "Science History",
                "description": "46",
                "children": []
            }, {
                "name": "Argentinian History",
                "description": "64",
                "children": []
            }]
        }]
    }, {
        "name": "Literature",
        "description": "36",
        "children": []
    }, {
        "name": "Video Editing",
        "description": "33",
        "children": []
    }, {
        "name": "Photography",
        "description": "52",
        "children": [{
            "name": "Theory",
            "description": "18",
            "children": []
        }, {
            "name": "Photo Editing",
            "description": "43",
            "children": []
        }]
    }, {
        "name": "Music Making",
        "description": "40",
        "children": [{
            "name": "Piano",
            "description": "21",
            "children": []
        }, {
            "name": "Ukelele",
            "description": "24",
            "children": []
        }, {
            "name": "Drums",
            "description": "46",
            "children": []
        }]
    }, {
        "name": "Biology",
        "description": "45",
        "children": []
    }]
}

class ProjectsView extends React.Component {
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
    createProject = (name) => {
        let projects = this.state.projects
        projects.push({ name: name, tasks: [], finishedTasks: [], archivedTasks: [] })
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

        this.setState({ projects: projects })
        this.save()
        this.handleEditProjectModal(false)
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
                <KeyboardEventHandler handleKeys={['p', 'P']} onKeyEvent={(key, e) => this.handleNewProjectModal(true)} />

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
                        data={this.state.testData}
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
            this.state.projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    project={project}

                    handleNewTaskModal={this.handleNewTaskModal}
                    handleEditProjectModal={this.handleEditProjectModal}
                    handleEditTaskModal={this.handleEditTaskModal}

                    editProject={this.editProject}
                    moveProject={this.moveProject}
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

export default ProjectsView;
