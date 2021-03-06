import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import webABG from '../assets/webABG.png';
import menu from '../assets/menu.png';
import presentation from '../assets/presentation.png';
import edit from '../assets/edit.png';
import folder from '../assets/folder.png';
import logout from '../assets/logout.png';
import {firebase, database} from '../firebase/firebase';
import Iframe from 'react-iframe';
import Dashboard from '../components/Dashboard';
import Panel from 'muicss/lib/react/panel';


const pptId =
    'https://docs.google.com/presentation/d/e/2PACX-1vQMWeVYHk5NjwNqLjM-wcxqQK8qcVhdi53wprdAIl7Mqy7Xx1je9JdaaOn7RUMHK0jrejPLPqJDxibX/embed?start=false&loop=false&delayms=3000';
const Container = styled.div`
	display: flex;
	flex: 1;
	background: linear-gradient(#502764, #a07777);
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const Body = styled.div`
	flex: 12;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
//#6E3667
//#f8eee7
const Icon = styled.img`
	width: 50px;
`;

const Box = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Box2 = styled.div`
	flex: 1;
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box3 = styled.div`
	flex: 1;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const HR = styled.div`
	background: white;
	height: 1px;
	width: 80%;
`;

const BigGap = styled.div`
	flex: 3;
`;

const SmallGap = styled.div`
	flex: 0.5;
`;

const Frame = styled.textarea`
	outline: none;
	opacity: 0.7;
	width: 94%;
	height: 88vh;
	padding: 20px;
	font-size: 18px;
	font-family: 'Garamond';
`;

const Transcript = styled.div`
	width: 47.5%;
	height: 100vh;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const BubbleContainer = styled.div`
	width: 90%;
	min-height: 110px;
	max-height: 110px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 40px;
	margin-bottom: 0px;
`;

const TextCaption = styled.div`
	margin-left: 5px;
	margin-bottom: 10px;
	color: white;
`;

const Bubble = styled.div`
	height: 80px;
	width: 100%;
	border-radius: 15px;
	background-color: #f8eee7;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BubbleText = styled.p`
	font-size: 12px;
	font-weight: 400;
	padding-right: 10px;
	padding-left: 10px;
	text-align: justify;
`;
//#f8eee7
class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: "",
            links: [],
            gdrive: ""
        };
    }

    componentDidMount() {
        firebase
            .auth()
            .signInAnonymously()
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('Error ' + errorCode + ': ' + errorMessage);
            });
        let transcriptRef = database.ref('Classes/67445/Summary');
        transcriptRef.on('value', snapshot => {
            this.setState({summary: snapshot.val()});
            document.getElementById("textPlease").value = this.state.summary;
        });
        let links = [];
        database.ref('Classes/67445/Links').once('value').then(linksSnapshot => {
            for (let key in linksSnapshot.val()) {
                if (!linksSnapshot.val().hasOwnProperty(key)) continue;
                links.push(linksSnapshot.val()[key].Link);
            }
            let myLinks = links;
            this.setState({links: myLinks.splice(0, 10)});
        });
    }


    render() {
        return (
            <Container>
                <Dashboard />
                <Body>
                <Frame id="textPlease" ref="textPlease"></Frame>
                </Body>
            </Container>
        );
    }
}

export default Resources;
