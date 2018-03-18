import { connect } from 'react-redux';

import OutputData from '../components/OutputData';

const mapStateToProps = ({ tree: { result } }) => ({ result });

export default connect(mapStateToProps, null)(OutputData);
