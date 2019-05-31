import React from 'react'
import { Icon, List, Typography } from 'antd';
import moment from 'moment'
import ProjectModal from './ProjectModal'
import TaskModal from './TaskModal'
import SmallTaskItem from './SmallTaskItem'

const { Text } = Typography;

const INITIAL_STATE = {
    selectedTask: {},
}

class SmallProjectCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
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

    // #endregion

    render() {
        return (
            <div data-simplebar class="frani-small-project-card-main">
                <List
                    size="small"
                    header={
                        <div class="frani-small-project-card-header">
                            <Text onClick={() => this.props.handleEditProjectModal(true, this.props.project)} style={{ color: "white", cursor: "pointer" }}>
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
                                style={{ color: '#f32e2e', float: "right", marginTop: "10px", marginRight: "12px", cursor: "pointer", fontSize: '24px' }}
                            />
                        </ div>
                    }
                    dataSource={this.props.project.tasks}
                    renderItem={task => (
                        <SmallTaskItem
                            task={task}
                            finishTask={this.props.finishTask}
                            deleteTask={this.props.deleteTask}
                            handleEditTaskModal={this.props.handleEditTaskModal}
                        />
                    )}
                    footer={
                        <div
                            class="frani-small-project-card-footer"
                            style={{
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
            </div>
        )
    }
}

export default SmallProjectCard;