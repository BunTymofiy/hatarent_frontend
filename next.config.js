const {i18n} = require('./next-i18next.config');

module.exports ={
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://hatarent-backend.herokuapp.com/:path*",
            },
        ];
    },
    i18n,
    env: {
        mapbox_key:"pk.eyJ1IjoidGltYWJvb24iLCJhIjoiY2t4aDEybjJyMGxlNjJ3bWx4Z2E1b2NoZCJ9.nISBlDA4OOrmeRPzM_4sQg",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:"pk_test_51KSnJYGzTAX7NDbOSi0s27DkSTtk8Rk3vUsnYAmFeTngRsq0To4hvBIy0ou9u2rDgsEKWxxc8r0he3flbFatwrw60020fMtAI4",
        STRIPE_SECRET_KEY:"sk_test_51KSnJYGzTAX7NDbOHemTbTzVYXL3iQRrXxmGjPeMDlzazky6dmVmDfkmBxUhgOQGwefLnyYpus854VHNZIUYxnYn00a6KI3l9o"
    }
}