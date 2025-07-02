import { ArrowDownToLine, Plus } from 'lucide-react';

import style from './ResumeHeader.module.scss';

export function ResumeDashboard() {
    return (
        <div className={style.header}>
            <div className={style.info}>
                <span>
                    <strong>Vus :</strong> 7 (5 Urgences, 2 UHCD) -
                </span>
                <span>
                    <strong> Non vus :</strong> 6 (6 Urgences, 0 UHCD) -
                </span>
                <span>
                    <strong>Attendus :</strong> 0 -
                </span>
                <span className={style.highlight}>{"Aujourd'hui : 0"}</span> -
                <span>Durée moyenne de séjour : -- min.</span>
            </div>
            <div className={style.action}>
                <button className="icon-button">
                    <Plus size={20} />
                </button>
                <button className="icon-button">
                    <ArrowDownToLine size={20} />
                </button>
            </div>
        </div>
    );
}
