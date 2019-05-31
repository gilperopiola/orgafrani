import React from 'react'
import { Icon, List, Typography } from 'antd';
import FraniTreeRow from './FraniTreeRow'

const { Text } = Typography;

const INITIAL_STATE = {
    parsedData: [],
}

class FraniTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillReceiveProps = (props) => {
        let data = props.data
        let parsedData = []

        if (data !== undefined && data !== {} && data !== null) {
            for (let i = 0; i < data.length; i++) {
                Array.prototype.push.apply(parsedData, this.parseNode(data[i], 0))
            }
        }

        this.setState({
            parsedData: parsedData,
        })
    }

    parseNode = (node, level) => {
        let parsedNodes = []

        parsedNodes.push(this.createNode(node.name, node.description, level))

        for (let i = 0; i < node.children.length; i++) {
            Array.prototype.push.apply(parsedNodes, this.parseNode(node.children[i], level + 1))
        }

        return parsedNodes
    }

    createNode = (name, description, level) => {
        return { "name": name, "description": description, "level": level }
    }

    renderTree = () => {
        return (
            this.state.parsedData.map((row, i) => (
                <FraniTreeRow
                    key={i}
                    name={row.name}
                    description={row.description}
                    level={row.level}
                    statusBar={true}
                    update={this.props.update}
                />
            ))
        )
    }

    render() {
        return (
            <div>
                {this.renderTree()}
            </div>
        )
    }
}

export default FraniTree