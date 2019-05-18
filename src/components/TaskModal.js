import React from 'react'
import { Layout, Modal, Input, InputNumber, Icon, List, DatePicker, Switch } from 'antd';

const INITIAL_STATE = {
    name: "",
    spentHours: 0,
    estimatedHours: 0.25,
    dueDate: null,
    important: false,
}

class TaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    handleOk = () => {
        this.props.onOk(this.props.projectName, this.state.name, this.state.spentHours, this.state.estimatedHours, this.state.dueDate, this.state.important)
        this.resetValues()
    }

    handleCancel = () => {
        this.props.onCancel(false)
        this.resetValues()
    }

    resetValues = () => {
        this.setState({
            name: "",
            spentHours: 0,
            estimatedHours: 0.25,
            dueDate: null,
            important: false,
        })
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
            spentHours: this.state.spentHours,
            estimatedHours: this.state.estimatedHours,
            dueDate: this.state.dueDate,
            important: this.state.important
        })
    }

    handleEstimatedHoursChange = (value) => {
        this.setState({
            name: this.state.name,
            spentHours: this.state.spentHours,
            estimatedHours: value,
            dueDate: this.state.dueDate,
            important: this.state.important
        })
    }

    handleDueDateChange = (date) => {
        this.setState({
            name: this.state.name,
            spentHours: this.state.spentHours,
            estimatedHours: this.state.estimatedHours,
            dueDate: date,
            important: this.state.important
        })
    }

    handleImportantChange = (enabled) => {
        this.setState({
            name: this.state.name,
            spentHours: this.state.spentHours,
            estimatedHours: this.state.estimatedHours,
            dueDate: this.state.dueDate,
            important: enabled
        })
    }

    render() {
        return (
            <Modal
                title="New Task"
                visible={this.props.visible}
                onOk={() => this.handleOk()}
                onCancel={() => this.handleCancel()}
            >
                <Input
                    placeholder="Name"
                    onChange={this.handleNameChange} value={this.state.name}
                    style={{ display: "block", marginBottom: "12px" }}
                    prefix={
                        <Icon type="folder-open" style={{ color: 'rgba(0,0,0,.45)' }} />
                    }
                />

                Estimated hours:
                <InputNumber
                    min={0.25}
                    defaultValue={0.25}
                    onChange={this.handleEstimatedHoursChange}
                    value={this.state.estimatedHours}
                    style={{ display: "inline-block", marginBottom: "12px", marginLeft: "12px" }}
                />

                <DatePicker
                    placeholder={"Due Date"}
                    onChange={this.handleDueDateChange}
                    value={this.state.dueDate}
                    style={{ display: "block", marginBottom: "12px" }}
                />

                Important:
                <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                    onChange={this.handleImportantChange}
                    checked={this.state.important}
                    style={{ display: "inline-block", marginTop: "12px", marginBottom: "12px", marginLeft: "12px" }}
                />
            </Modal>
        )
    }
}

export default TaskModal;