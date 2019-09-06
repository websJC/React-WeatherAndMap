import React from 'react';

export default function Error({mensaje}) {
return (
    <div className="container">
            <div className="row">
                <div className="col s12 m6 offset-m3">
        <div className="card-panel red darken-4 error">
            {mensaje}
        </div>
                </div>

            </div>
        </div>
)
};
