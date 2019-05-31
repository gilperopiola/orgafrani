import React from 'react'
import { Icon, List, Typography } from 'antd';
import { RedToGreen } from '../helpers/ColorMan'


const { Text } = Typography;

const INITIAL_STATE = {
}

class FraniTreeRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    render() {
        return (
            <div>
                <div class="frani-tree-row-main">
                    {this.props.statusBar &&
                        <div class="frani-tree-row-status-bar-left" style={{ backgroundColor: RedToGreen(parseInt(this.props.description), 100) }} />
                    }
                    <div class="frani-tree-row-step" style={{ width: this.props.level * 36 + "px" }} />
                    <div class="frani-tree-row-name"> {this.props.name} </div>

                    <Icon
                        type="plus"
                        style={{
                            color: "white",
                            position: "relative",
                            float: "right",
                            cursor: "pointer",
                            marginTop: "14px",
                            marginRight: "14px",
                        }}
                        onClick={() => this.props.update(this.props.name, 1)}
                    />
                    <div class="frani-tree-row-description">{this.props.description}</div>
                    <Icon
                        type="minus"
                        style={{
                            color: "white",
                            position: "relative",
                            float: "right",
                            cursor: "pointer",
                            marginTop: "14px",
                            marginRight: "14px",
                        }}
                        onClick={() => this.props.update(this.props.name, -1)}
                    />
                </div>

                <div class="frani-tree-row-status-bar-right">
                    <div class="frani-tree-row-status-bar-right-2" style={{
                        width: parseInt(this.props.description) * 2 + "px",
                        backgroundColor: RedToGreen(parseInt(this.props.description), 100),
                    }} />
                </div>
            </div>
        )
    }
}

export default FraniTreeRow