import React from 'react'
import { Modal, Input, Icon } from 'antd';

const INITIAL_STATE = {
    name: "",
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