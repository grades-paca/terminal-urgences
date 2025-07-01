const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@atoms': path.resolve(__dirname, 'src/components/atoms'),
        '@molecules': path.resolve(__dirname, 'src/components/molecules'),
        '@organisms': path.resolve(__dirname, 'src/components/organisms'),
        '@templates': path.resolve(__dirname, 'src/components/templates'),
        '@pages': path.resolve(__dirname, 'src/components/pages'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@interfaces': path.resolve(__dirname, 'src/interfaces'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@assets': path.resolve(__dirname, 'src/assets')
    })
);
