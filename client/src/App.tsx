import React from 'react';
import {FormProvider} from './context/FormContext';
import SplitLayout from "@/components/Layout/SplitLayout.tsx";
// import SplitLayout from './components/Layout/SplitLayout';

const App: React.FC = () => {
    return (
        <FormProvider>
            <SplitLayout/>
            <p>Hello world</p>
        </FormProvider>
    );
};

export default App;