import path from 'path'
export default {
    render: {
        mode: 'console',
        url: './' + path.relative('../core', '../core/view/console/index')
    }
}