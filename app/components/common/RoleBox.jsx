export default class RoleBox extends React.Component {
    render() {
        const style = {
            display: 'inline-block',
            color: '#fff',
            minWidth: 20,
            fontWeight: 'bold',
            padding: '0 2px',
            margin: 1,
            textAlign: 'center',
            lineHeight: '1.2em'
        };

        switch (this.props.children) {
            case 'Por':
                style.backgroundColor = '#fc961e';
                break;
            case 'Ds':
            case 'Dc':
            case 'Dd':
                style.backgroundColor = '#007C09';
                break;
            case 'Cs':
            case 'Cc':
            case 'Cd':
            case 'M':
                style.backgroundColor = '#1d8dc0';
                break;
            case 'W':
            case 'T':
                style.backgroundColor = '#9166ff';
                break;
            case 'A':
            case 'Pc':
                style.backgroundColor = '#aa0a1c';
                break;
            default:
                break;
        }

        return (
            <span style={style}>{this.props.children}</span>
        );
    }
}

RoleBox.propTypes = {
    children: React.PropTypes.node.isRequired
};
