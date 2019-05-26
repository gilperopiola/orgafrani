import React from 'react'
import { Layout, Typography, InputNumber, Icon, DatePicker, Switch, Divider } from 'antd';

const { Content } = Layout;
const { Text } = Typography;


const INITIAL_STATE = {
}

class HalfScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    render() {
        return (
            <Content
                style={{ width: "50%", backgroundColor: this.props.backgroundColor, height: "100%", display: "inline-block", fontFamily: "Fjalla One" }}
            >
                <Text style={{ fontSize: "64px", color: "black" }}>
                    {this.props.title}
                </Text>

                {this.renderTasks()}
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
                    handleEditTaskModal={this.handleEditTaskModal}
                />
            ))
        )
    }
}

export default HalfScreen;