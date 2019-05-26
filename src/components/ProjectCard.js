import React from 'react'
import { Icon, List, Typography } from 'antd';
import moment from 'moment'
import ProjectModal from './ProjectModal'
import TaskModal from './TaskModal'
import TaskItem from './TaskItem'


const { Text } = Typography;


const INITIAL_STATE = {
    editProjectModalOpen: false,
    editTaskModalOpen: false,
    selectedTask: {},
}

class ProjectCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    editProject = (name) => {
        this.props.editProject(this.props.project, name)
        this.handleEditProjectModal(false)
    }

    editTask = (name, estimatedHours, dueDate, important, daily, weekly) => {
        this.props.editTask(this.state.selectedTask, name, estimatedHours, dueDate, important, daily, weekly)
        this.handleEditTaskModal(false, this.getEmptyTask())
    }

    getEmptyTask = () => {
        return { name: "", estimatedHours: 0.25, dueDate: null, important: false, daily: false, weekly: false }
    }

    // #region Helper Functions

    calculatePercentage = (project) => {
        let totalHours = 0
        let spentHours = 0

        for (let i = 0; i < project.tasks.length; i++) {
            totalHours += project.tasks[i].estimatedHours
        }

        for (let i = 0; i < project.finishedTasks.length; i++) {
            spentHours += project.finishedTasks[i].estimatedHours
            totalHours += project.finishedTasks[i].estimatedHours
        }

        return Math.round(100 / totalHours * spentHours)
    }

    getPercentageColor = (project) => {
        let percentage = this.calculatePercentage(project)
        if (percentage < 20) {
            return "#ec1212"
        } else if (percentage < 40) {
            return "rgb(249, 100, 43)"
        } else if (percentage < 75) {
            return "rgba(254, 226, 19, 1)"
        }
        return "rgb(102, 236, 18)"
    }

    handleEditProjectModal = (open) => {
        this.setState({
            editProjectModalOpen: open,
        })
    }

    handleEditTaskModal = (open, task) => {
        this.setState({
            editTaskModalOpen: open,
            selectedTask: task,
        })
    }

    // #endregion

    render() {
        return (
            <div
                data-simplebar
                style={{
                    backgroundColor: "#491a92", width: "24.5%",
                    display: "inline-block", margin: "4px",
                    fontFamily: "Fjalla One", color: "white",
                    maxHeight: "500px", minHeight: "500px",
                    overflow: "auto", marginBottom: 0,
                }}
            >
                <List
                    size="small"
                    header={
                        <div style={{ fontSize: "42px", textAlign: "left", padding: "8px", paddingLeft: "24px" }}>
                            <Text onClick={() => this.handleEditProjectModal(true)} style={{ color: "white", cursor: "pointer" }}>
                                {this.props.project.name.toUpperCase().substring(0, 15)}
                            </Text>
                            <Icon
                                type="plus"
                                onClick={() => this.props.handleNewTaskModal(true, this.props.project.name)}
                                style={{ color: '#67ff35', float: "right", marginTop: "8px", marginRight: "12px", cursor: "pointer" }}
                            />
                            <Icon
                                type="cross"
                                onClick={() => this.props.deleteProject(this.props.project)}
                                style={{ color: '#f32e2e', float: "right", marginTop: "18px", marginRight: "12px", cursor: "pointer", fontSize: '24px' }}
                            />

                        </ div>
                    }
                    dataSource={this.props.project.tasks}
                    renderItem={task => (
                        <TaskItem
                            task={task}
                            finishTask={this.props.finishTask}
                            deleteTask={this.props.deleteTask}
                            handleEditTaskModal={this.handleEditTaskModal}
                        />
                    )}
                    footer={
                        <div
                            style={{
                                fontSize: "42px", textAlign: "center",
                                padding: "8px", paddingLeft: "24px",
                                backgroundColor: "#7145b7",
                                borderTop: "solid " + this.getPercentageColor(this.props.project),
                                borderBottom: "solid " + this.getPercentageColor(this.props.project)
                            }}>
                            <Icon
                                type="caret-left"
                                onClick={() => this.props.moveProject(this.props.project, -1)}
                                style={{ color: 'black', marginTop: "10px", cursor: "pointer", float: "left", marginLeft: "-16px" }}
                            />

                            {this.calculatePercentage(this.props.project)}%

                            <Icon
                                type="caret-right"
                                onClick={() => this.props.moveProject(this.props.project, 1)}
                                style={{ color: 'black', marginTop: "10px", cursor: "pointer", float: "right" }}
                            />

                        </ div>
                    }

                />
                <ProjectModal
                    title={"Edit Project"}
                    visible={this.state.editProjectModalOpen}
                    onOk={this.editProject}
                    onCancel={this.handleEditProjectModal}
                    defaultName={this.props.project.name}
                />

                <TaskModal
                    title={"Edit Task"}
                    visible={this.state.editTaskModalOpen}
                    onOk={this.editTask}
                    onCancel={this.handleEditTaskModal}
                    defaultValues={this.state.selectedTask ? this.state.selectedTask : null}
                />
            </div>
        )
    }
}

export default ProjectCard;