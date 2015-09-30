import RoleBox from './RoleBox';

export default class RolesList extends React.Component {
    render() {
        return (
            <div>
                {this.props.data.map((role, k) => <RoleBox key={k}>{role}</RoleBox>)}
            </div>
        );
    }
}

RolesList.propTypes = {
    data: React.PropTypes.any.isRequired
};
