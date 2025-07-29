import { ResumeDashboard } from '@organisms/ResumeDashboard';
import { SortableTable } from '@organisms/tables/SortableTable.tsx';

const data = [
    {
        id: 'ORS0',
        age: '22 ans',
        arrivee: '14/04/2025 à 00:00',
        soignants: 'Dr DOS RAMOS Emmanuel',
        salle: 'Salle A1 (Secteur A)',
        gravite: 'Gravité 3A',
        destSouhaitee: '--',
        destConfirmee: '--',
        statut: 'stable',
    },
    {
        id: 'ORS1',
        age: '67 ans',
        arrivee: '14/04/2025 à 00:10',
        soignants: 'Dr LEGRAND Sophie',
        salle: 'Salle A2 (Secteur A)',
        gravite: 'Gravité 2B',
        destSouhaitee: 'UHCD',
        destConfirmee: 'UHCD',
        statut: 'critique',
    },
    {
        id: 'ORS2',
        age: '45 ans',
        arrivee: '14/04/2025 à 00:20',
        soignants: 'Dr MULLER Jean',
        salle: 'Salle A3 (Secteur B)',
        gravite: 'Gravité 1A',
        destSouhaitee: 'Urgences',
        destConfirmee: '--',
        statut: 'en_attente',
    },
];

const columns = [
    {
        header: 'Patient',
        accessorKey: 'id',
    },
    {
        header: 'Age',
        accessorKey: 'age',
    },
    {
        header: 'Arrivée',
        accessorKey: 'arrivee',
    },
    {
        header: 'Soignants',
        accessorKey: 'soignants',
    },
    {
        header: 'Salle',
        accessorKey: 'salle',
    },
    {
        header: 'Motif / Code',
        accessorKey: 'gravite',
    },
    {
        header: 'Dest. Souhait.',
        accessorKey: 'destSouhaitee',
    },
    {
        header: 'Dest. Confirmée',
        accessorKey: 'destConfirmee',
    },
];

export const Dashboard = () => {
    return (
        <div className="space-y-4">
            <ResumeDashboard />

            <div className="overflow-x-auto">
                <SortableTable columns={columns} data={data} />
            </div>
        </div>
    );
};
