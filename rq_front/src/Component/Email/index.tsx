import { customFetch } from "../../functions/api/customFetch";


const recursiveEmail = async (count: number, i: number = 1) => {
    const result = await customFetch('https://localhost:8000/api/email');
    console.log(result);
    
    if(i < count) {
        recursiveEmail(count, i + 1);
    }
}

export const Email = () => {

    const handleClick = (e: any) => {
        e.preventDefault();
        
        recursiveEmail(10);
    }

    return (
        <button type="button" onClick={handleClick}>Envoyer</button>
    )
}