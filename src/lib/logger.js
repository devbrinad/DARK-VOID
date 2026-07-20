const time = () => {
    return new Date().toLocaleTimeString();
};

const logger = {
    info: (message) => {
	console.log('[${time()}] [INFO] ${message}');
    },

    success: (message) => {
	console.log('[${time()}] [SUCCESS] ${message}');
    },

    warning: (message) => {
	console.log('[${time()}] [WARNING] ${message}');
    },

    error: (message) => {
	console.log('[${time()}] [ERROR] ${message}');
    }
};

export default logger;
