export default class FixedPointNumber extends React.Component {
    static propTypes = {
        data: React.PropTypes.any.isRequired,
        metadata: React.PropTypes.shape({
            precision: React.PropTypes.number
        }).isRequired
    };

    render() {
        return <span>{this.props.data.toFixed(this.props.metadata.precision)}</span>;
    }
}
