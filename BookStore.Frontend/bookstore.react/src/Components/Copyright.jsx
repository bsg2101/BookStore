// src/components/Copyright.js
import React from 'react';

const Copyright = () => {
    return (
        <div className="container-fluid copyright bg-dark py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2"></i>Arkabahcemiz</a>, All right reserved.</span>
                    </div>
                    <div className="col-md-6 my-auto text-center text-md-end text-white">
                        Designed By <a className="border-bottom" href="https://htmlcodex.com">BSG</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Copyright;
