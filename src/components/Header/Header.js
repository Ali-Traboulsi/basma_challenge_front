import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <div className="mt-3">
            <nav className="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <span className="h1 mx-auto">
                        Register
                    </span>
                </div>
            </nav>
        </div>
    );
};

Header.propTypes = {
    
};

export default Header;