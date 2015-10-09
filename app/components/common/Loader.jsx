export default class Loader extends React.Component {
    render() {
        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            textAlign: 'center'
        };

        return (
            <div style={style}>Loading...</div>
        );
    }
}
