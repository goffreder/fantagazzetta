import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap.override.css';

// import Main from './components/Main';
//
// ReactDOM.render(
//     <Main />,
//     document.getElementById('app')
// );

import CalendarBoxScore from 'calendar/CalendarBoxScore';

import appStore from 'stores/appStore';
import axios from 'axios';

// const lineup = [{
//     102: 4.5
// }, {
//     113: 5
// }, {
//     111: 6.5
// }, {
//     105: 0
// }, {
//     109: 6
// }, {
//     132: 7
// }, {
//     128: 5
// }, {
//     131: 5.5
// }, {
//     133: 7.5
// }, {
//     145: 10
// }, {
//     140: 10
// }, {
//     116: 6
// }];

axios.get('http://localhost:3000/players/?_expand=team')
    .then(res => {
        const players = res.data.map(player => {
            player.team = player.team.name;

            return player;
        });

        appStore.setStore({ players });

        ReactDOM.render(
            <CalendarBoxScore
                teamId={0}
                editing
            />,
            document.getElementById('app')
        );
    });
