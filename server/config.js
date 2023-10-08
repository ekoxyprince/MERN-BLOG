module.exports={
    siteDetails:{
        port:process.env.PORT || 8080,
        allowedDomain:process.env.NODE_ENV === "development"?process.env.LOCAL_DOMAIN:process.env.DEPLOYED_DOMAIN,
    },
    database:{
        url:process.env.DB_URL,
        db_name:process.env.DB_NAME
    },
    jwt_expires:process.env.JWT_EXPIRES_IN,
    cookie_expires:process.env.COOKIE_EXPIRES_IN,
    jwt_secret:process.env.JWT_SECRET
}