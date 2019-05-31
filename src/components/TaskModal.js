import React from 'react'
import { Modal, Input, InputNumber, Icon, DatePicker, Switch, Divider } from 'antd';
import moment from 'moment'

const INITIAL_STATE = {
    name: "",
    estimatedHours: 0.25,
    dueDate: null,
    important: false,
    daily: false,
    weekly: false,
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
                important: props.defaultValues.important,
                daily: props.defaultValues.daily,
                weekly: props.defaultValues.weekly,
            })
        }
    }

    handleOk = () => {
        this.props.onOk(this.state.name, this.state.estimatedHours, this.state.dueDate, this.state.important, this.state.daily, this.state.weekly, this.props.projectName ? this.props.projectName : "")
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
            daily: false,
            weekly: false,
        })
    }

    // #region handleChange

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleEstimatedHoursChange = (value) => {
        this.setState({
            estimatedHours: value,
        })
    }

    handleDueDateChange = (date) => {
        this.setState({
            dueDate: date,
        })
    }

    handleImportantChange = (enabled) => {
        this.setState({
            important: enabled,
        })
    }

    handleDailyChange = (enabled) => {
        this.setState({
            daily: enabled,
        })
    }

    handleWeeklyChange = (enabled) => {
        this.setState({
            weekly: enabled,
        })
    }

    // #endregion

    render() {
        return (
            <Modal
                title={this.props.title}
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

                Estimated hours
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

                <div style={{ display: "block" }}>
                    Important
                    <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        onChange={this.handleImportantChange}
                        checked={this.state.important}
                        style={{ display: "inline-block", marginTop: "12px", marginBottom: "12px", marginLeft: "12px" }}
                    />
                </div>

                <div style={{ display: "block" }}>
                    Daily
                    <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        onChange={this.handleDailyChange}
                        checked={this.state.daily}
                        style={{ display: "inline-block", marginTop: "12px", marginBottom: "12px", marginLeft: "12px" }}
                    />
                </div>

                <div style={{ display: "block" }}>
                    Weekly
                    <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        onChange={this.handleWeeklyChange}
                        checked={this.state.weekly}
                        style={{ display: "inline-block", marginTop: "12px", marginBottom: "12px", marginLeft: "12px" }}
                    />
                </div>
            </Modal>
        )
    }
}

export default TaskModal;