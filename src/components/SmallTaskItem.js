import React from 'react'
import { Icon, List, Typography } from 'antd';
import moment from 'moment'

const { Text } = Typography

class SmallTaskItem extends React.Component {
    constructor(props) {
        super(props)
    }

    dueDateWarning = (task) => {
        return (moment().diff(task.dueDate, 'days') > -1)
    }

    dueDateNear = (task) => {
        return (moment().diff(task.dueDate, 'days') > -3 && !this.dueDateWarning(task))
    }

    render() {
        return (
            <div class="frani-small-task-item-main" style={{ color: this.props.task.important ? "#ffeb00" : this.props.black ? "black" : "white" }}>
                {this.dueDateWarning(this.props.task) &&
                    <Icon
                        type="warning"
                        style={{ color: 'red', marginLeft: "4px", marginRight: "8px" }}
                    />
                }
                {this.dueDateNear(this.props.task) &&
                    <Icon
                        type="clock-circle"
                        style={{ color: 'white', marginLeft: "4px", marginRight: "8px" }}
                    />
                }

                <Text style={{ color: this.props.task.important ? "#ffeb00" : this.props.black ? "black" : "white", cursor: "pointer" }} onClick={() => this.props.handleEditTaskModal(true, this.props.task)}>
                    {this.props.task.name.substring(0, 28)}
                </Text>
                <div class="frani-small-task-item-hours">
                    {this.props.task.estimatedHours}hs
                    <Icon
                        type="check"
                        onClick={() => this.props.finishTask(this.props.task)}
                        style={{ color: '#67ff35', marginLeft: "8px", cursor: "pointer" }}
                    />
                    <Icon
                        type="cross"
                        onClick={() => this.props.deleteTask(this.props.task)}
                        style={{ color: '#f32e2e', marginLeft: "8px", cursor: "pointer" }}
                    />
                </div>
            </div>
        )
    }
}

export default SmallTaskItem