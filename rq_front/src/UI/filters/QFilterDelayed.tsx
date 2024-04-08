import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren<{
    name: string,
    value: string,
    setFilterValue: (key: string, value: any) => void,
    delay?: number,
    [key: string]: any
}>;


export const QFilterDelayed = ({
    name, 
    value, 
    setFilterValue,
    delay = 300,
    children,
    ...props
}: Props) => {

    const [q, setQ] = useState<string>(value);
    useEffect(() => {
        setQ(value);
    }, [value]);
    const handleChange = (e: any) => {
        setQ(e.target.value);
    };

    const [timer, setTimer] = useState<NodeJS.Timeout|null>(null)
    useEffect(() => {
        if(timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setFilterValue(name, q);
                setTimer(null);
            }, delay)
        );
    }, [q]);

    return (
        <div className="form-group">
            {
                children && (
                    <label htmlFor={name}>{children}</label>
                )
            }
            <input 
                className="form-control" 
                id={name} 
                type="text" 
                name={name + '_q'} 
                value={q} 
                onChange={handleChange}
                {...props}
            />
        </div>
    )
}