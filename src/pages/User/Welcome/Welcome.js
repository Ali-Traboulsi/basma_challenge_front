import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Welcome.module.css";

const Welcome = props => {
    return (
        <div>
            <h1 className={styles.welcome_text}>Thank you For Registering!</h1>
        </div>
    );
};

Welcome.propTypes = {
    
};

export default Welcome;