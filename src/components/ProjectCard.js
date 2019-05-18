import React from 'react'
import { Layout, Modal, Input, InputNumber, Icon, List, DatePicker, Switch, Typography } from 'antd';
import moment from 'moment'
import NewProjectModal from './ProjectModal'

const { Text } = Typography;


const INITIAL_STATE = {
    editProjectModalOpen: false,
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

    dueDateWarning = (task) => {
        return (moment().diff(task.dueDate, 'days') > -1)
    }

    dueDateNear = (task) => {
        return (moment().diff(task.dueDate, 'days') > -3 && !this.dueDateWarning(task))
    }

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

    render() {
        return (
            <div
                data-simplebar
                style={{
                    backgroundColor: "#491a92", width: "24%",
                    display: "inline-block", margin: "4px",
                    fontFamily: "Fjalla One", color: "white",
                    maxHeight: "500px", minHeight: "500px",
                    overflow: "auto"
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
                        <div style={{ color: task.important ? "#ffeb00" : "white", minHeight: "50px", fontSize: "22px", padding: "15px", textAlign: "left" }}>
                            {this.dueDateWarning(task) &&
                                <Icon
                                    type="warning"
                                    style={{ color: 'red', marginLeft: "4px", marginRight: "8px" }}
                                />
                            }
                            {this.dueDateNear(task) &&
                                <Icon
                                    type="clock-circle"
                                    style={{ color: 'white', marginLeft: "4px", marginRight: "8px" }}
                                />
                            }

                            {task.name.substring(0, 28)}
                            <div style={{ float: "right" }}>
                                {task.estimatedHours}hs
                            <Icon
                                    type="check"
                                    onClick={() => this.props.finishTask(task)}
                                    style={{ color: '#67ff35', marginLeft: "8px", cursor: "pointer" }}
                                />
                                <Icon
                                    type="cross"
                                    onClick={() => this.props.deleteTask(task)}
                                    style={{ color: '#f32e2e', marginLeft: "8px", cursor: "pointer" }}
                                />

                            </div>
                        </div>
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
                <NewProjectModal
                    title={"Edit Project"}
                    visible={this.state.editProjectModalOpen}
                    onOk={this.editProject}
                    onCancel={this.handleEditProjectModal}
                    defaultName={this.props.project.name}
                />
            </div>
        )
    }
}

export default ProjectCard;