import { Suspense, lazy, useState } from "react";
import { useCounter } from "../Provider/CounterProvider"

export const ChildComponent = () => {
    const [show, setShow] = useState(false);

    const LazyComponent = lazy(() => import('./LazyComponent'))

    return (
        <div>
            <button onClick={() => setShow(show => !show)}>Voir/Masquer</button>
            {
                show && (
                    <Suspense fallback={<Loading />}>
                        <LazyComponent />
                    </Suspense>
                )
            }
        </div>
    )
}

const Loading = () => {
    return (
        <div>loading...</div>
    )
}