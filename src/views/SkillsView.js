import React from 'react'
import { Layout, Typography } from 'antd';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ProjectModal from '../components/ProjectModal'
import TaskModal from '../components/TaskModal'
import ProjectCard from '../components/ProjectCard'
import HalfScreen from '../components/HalfScreen'
import FraniTree from '../components/FraniTree'

const { Content } = Layout;
const { Text } = Typography;

const INITIAL_STATE = {
    skills: [],
}

class SkillsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillMount = () => {
        this.load()
    }

    componentDidMount = () => {
    }

    // #region Internal Data Management
    updateSkill = (name, amount) => {
        let skills = this.state.skills

        for (let i = 0; i < skills.length; i++) {
            if (skills[i].name === name) {
                skills[i].description = parseInt(skills[i].description) + amount
                break
            }

            if (skills[i].children.length > 0) {
                for (let j = 0; j < skills[i].children.length; j++) {
                    if (skills[i].children[j].name === name) {
                        skills[i].children[j].description = parseInt(skills[i].children[j].description) + amount
                        break
                    }

                    if (skills[i].children[j].children.length > 0) {
                        for (let k = 0; k < skills[i].children[j].children.length; k++) {
                            if (skills[i].children[j].children[k].name === name) {
                                skills[i].children[j].children[k].description = parseInt(skills[i].children[j].children[k].description) + amount
                                break
                            }
                        }
                    }
                }
            }
        }

        this.setState({ skills: skills })
        this.save();
    }

    save = () => {
        localStorage.setItem("skills", JSON.stringify(this.state.skills));
    }

    load = () => {
        let skills = JSON.parse(localStorage.getItem("skills"))
        if (skills === null || skills === undefined) {
            skills = []
        }

        this.setState({ skills: skills })
    }

    // #endregion

    // #region Render Functions

    render() {
        return (
            <Layout>
                <KeyboardEventHandler handleKeys={['1']} onKeyEvent={(key, e) => window.location.assign("/dashboard")} />
                <KeyboardEventHandler handleKeys={['2']} onKeyEvent={(key, e) => window.location.assign("/projects")} />
                <KeyboardEventHandler handleKeys={['3']} onKeyEvent={(key, e) => window.location.assign("/skills")} />

                <Content style={{ height: "100%", backgroundColor: "rgb(148, 67, 255)" }}>
                    <Text style={{ fontFamily: "Fjalla One", color: "white", fontSize: "38px" }}>SKILLS</Text>
                    <FraniTree
                        data={this.state.skills}
                        update={this.updateSkill}
                    />
                </Content>
            </Layout >
        )
    }

    // #endregion
}

export default SkillsView;
