import { useParams } from 'react-router';

export const Dashboard = () => {
    const { idView } = useParams();

    return (
        <div>
            <h1>{"Vue de l'élément"}</h1>
            <p>ID : {idView}</p>
        </div>
    );
};
