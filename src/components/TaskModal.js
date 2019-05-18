import React from 'react'
import { Modal, Input, InputNumber, Icon, DatePicker, Switch } from 'antd';
import moment from 'moment'

const INITIAL_STATE = {
    name: "",
    estimatedHours: 0.25,
    dueDate: null,
    important: false,
}

class TaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillReceiveProps = (props) => {
        if (props.defaultValues !== undefined && props.defaultValues !== {} && props.defaultValues !== null) {
            this.setState({
                name: props.defaultValues.name,
                estimatedHours: props.defaultValues.estimatedHours,
                dueDate: props.defaultValues.dueDate,
                important: props.defaultValues.important
            })
        }
    }

    handleOk = () => {
        this.props.onOk(this.state.name, this.state.estimatedHours, this.state.dueDate, this.state.important)
        this.resetValues()
    }

    handleCancel = () => {
        this.props.onCancel(false)
        this.resetValues()
    }

    resetValues = () => {
        this.setState({
            name: "",
            estimatedHours: 0.25,
            dueDate: null,
            important: false,
        })
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
            estimatedHours: this.state.estimatedHours,
            dueDate: this.state.dueDate,
            important: this.state.important
        })
    }

    handleEstimatedHoursChange = (value) => {
        this.setState({
            name: this.state.name,
            estimatedHours: value,
            dueDate: this.state.dueDate,
            important: this.state.important
        })
    }

    handleDueDateChange = (date) => {
        this.setState({
            name: this.state.name,
            estimatedHours: this.state.estimatedHours,
            dueDate: date,
            important: this.state.important
        })
    }

    handleImportantChange = (enabled) => {
        this.setState({
            name: this.state.name,
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
                    value={this.state.dueDate !== null ? moment(this.state.dueDate) : null}
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