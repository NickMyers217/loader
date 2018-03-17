import { connect } from 'react-redux';

import { runPipeline } from '../actions';
import Nav from '../components/Nav';

const mapDispatchToProps = { runPipeline };

export default connect(null, mapDispatchToProps)(Nav);
