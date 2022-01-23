module.exports ={
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/:path*",
            },
        ];
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
    env: {
        mapbox_key:"pk.eyJ1IjoidGltYWJvb24iLCJhIjoiY2t4aDEybjJyMGxlNjJ3bWx4Z2E1b2NoZCJ9.nISBlDA4OOrmeRPzM_4sQg"
    }
}