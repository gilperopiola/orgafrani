import React from 'react'
import { Layout, Modal, Input, InputNumber, Icon, List, DatePicker, Switch } from 'antd';

const INITIAL_STATE = {
    name: "",
}

class ProjectModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillReceiveProps = () => {
        if (this.props.defaultName !== "") {
            this.setState({
                name: this.props.defaultName
            })
        }
    }

    handleOk = () => {
        this.props.onOk(this.state.name)
        this.resetValues()
    }

    handleCancel = () => {
        this.props.onCancel(false)
        this.resetValues()
    }

    resetValues = () => {
        this.setState({
            name: "",
        })
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
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
            </Modal>
        )
    }
}

export default ProjectModal;