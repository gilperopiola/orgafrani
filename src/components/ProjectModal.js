import React from 'react'
import { Modal, Input, Icon, Switch } from 'antd';

const INITIAL_STATE = {
    name: "",
    important: false,
}

class ProjectModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillReceiveProps = (props) => {
        if (props.defaultValues !== undefined && props.defaultValues !== {} && props.defaultValues !== null) {
            this.setState({
                name: props.defaultValues.name,
                important: props.defaultValues.important,
            })
        }
    }

    handleOk = () => {
        this.props.onOk(this.state.name, this.state.important)
        this.resetValues()
    }

    handleCancel = () => {
        this.props.onCancel(false)
        this.resetValues()
    }

    resetValues = () => {
        this.setState({
            name: "",
            important: false,
        })
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleImportantChange = (enabled) => {
        this.setState({
            important: enabled,
        })
    }


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
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    prefix={
                        <Icon type="folder-open" style={{ color: 'rgba(0,0,0,.45)' }} />
                    }
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

            </Modal>
        )
    }
}

export default ProjectModal;