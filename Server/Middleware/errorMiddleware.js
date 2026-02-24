const errorMiddleware = (err, req, res, next) => {
    console.error('Logged Error:', err);
    // Default to 500 Server Error
    let statusCode = 500;
    let errorMessage = 'Server Error';

    // Handle Authentication Errors (from auth middleware)
    if (err.type === 'AUTHENTICATION_ERROR' || err.name === 'JsonWebTokenError') {
        statusCode = 401;
        errorMessage = 'Please authenticate.';
    }

    // Handle Access Denied Errors (from admin middleware)
    else if (err.type === 'ACCESS_DENIED') {
        statusCode = 403;
        errorMessage = 'Access denied. Admins only.';
    }

    // Handle generic server errors (like database connection issues in admin check)
    else if (err.type === 'SERVER_ERROR') {
        statusCode = 500;
        errorMessage = 'Server error checking admin status';
    }

    res.status(statusCode).send({ error: errorMessage });
};

module.exports = errorMiddleware;