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
            <div style={{
                width: "50%",
                height: "70px",
                backgroundColor: "#491a92",
                color: "white",
                fontFamily: "Fjalla One",
                fontSize: "36px",
                textAlign: "left",
            }}>
                {this.props.statusBar &&
                    <div style={{ width: "6px", backgroundColor: RedToGreen(parseInt(this.props.description), 100), height: "100%", position: "relative", float: "left" }} />
                }

                <div style={{ width: this.props.level * 24 + "px", backgroundColor: "#210748", display: "inline-block", height: "100%", position: "relative", float: "left" }} />

                <div style={{ paddingLeft: "14px", display: "inline-block", verticalAlign: "sub" }}> {this.props.name} </div>

                <div style={{ position: "relative", float: "right", marginRight: "14px", marginTop: "8px" }}>{this.props.description}</div>
            </div>
        )
    }
}

export default FraniTreeRow