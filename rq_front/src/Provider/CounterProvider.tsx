import { PropsWithChildren, createContext, useContext, useState } from "react";


type CounterContextType = {
    count?: number,
    incr: () => void
};

const CounterContext = createContext<null|CounterContextType>(null);


type Props = PropsWithChildren<{
    start?: number
}>;

export const CounterProvider = ({start = 0, children}: Props) => {
    const [count, setCount] = useState(start);
    
    const incr = (): void => {
        setCount(count => count + 1);
    };

    return (
        <CounterContext.Provider value={{count, incr}}>
            {children}
        </CounterContext.Provider>
    );
};


export const useCounter = (): CounterContextType => {
    const counterContext = useContext(CounterContext);
    if(!counterContext) {
        throw new Error('to use this context you must wrap your component with context provider');
    }
    return counterContext;
}

