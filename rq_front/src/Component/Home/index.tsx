import { useEffect } from "react";
import { useNavigate } from "react-router";
import { generateUrl } from "../../functions/urlGenerator";

export default function Home() {
    
  const navigate = useNavigate();
  useEffect(() => {
    navigate(generateUrl('post_index'));
  }, []);

    return (
        <div>home</div>
    )
}