import React from 'react'
import { Layout, Typography, InputNumber, Icon, DatePicker, Switch, Divider } from 'antd';
import TaskItem from './TaskItem'

const { Content } = Layout;
const { Text } = Typography;


class HalfScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Content
                style={{
                    width: "50%", backgroundColor: this.props.backgroundColor, height: "100%", maxHeight: "500px",
                    display: "inline-block", fontFamily: "Fjalla One", overflowY: "auto"
                }}
            >
                <Text style={{ fontSize: "64px", color: "black" }}>
                    {this.props.title}
                </Text>

                <div style={{ width: "50%" }}>
                    {this.renderTasks()}
                </div>
            </Content>
        )
    }

    renderTasks = () => {
        return (
            this.props.tasks.map((task, i) => (
                <TaskItem
                    key={i}
                    task={task}
                    finishTask={this.props.finishTask}
                    deleteTask={this.props.deleteTask}
                    handleEditTaskModal={this.props.handleEditTaskModal}
                    black
                />
            ))
        )
    }
}

export default HalfScreen;