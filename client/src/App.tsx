import React from 'react';
import {FormProvider} from './context/FormContext';
import SplitLayout from "@/components/Layout/SplitLayout.tsx";
// import SplitLayout from './components/Layout/SplitLayout';

const App: React.FC = () => {
    return (
        <FormProvider>
            <SplitLayout/>
        </FormProvider>
    );
};

export default App;