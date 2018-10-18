import React from 'react';
import Aux1 from '../../hoc/Aux1';
const layout=(props)=>(
    <Aux1>
        <div>Toolbar</div>
        <main>
            {props.children}
        </main>
    </Aux1>
);

export default layout;