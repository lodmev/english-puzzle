import { createElement } from '../../utils/dom_helpers';
import './loading.scss';

const loading = createElement({ tag: 'div', classList: ['loading'] });
loading.append('Loading...');

export default loading;
