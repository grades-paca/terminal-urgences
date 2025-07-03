import TGSLogo from '@assets/TGS.png';
import { InfoCard } from '@molecules/InfoCard';
import { LinkCard } from '@molecules/LinkCard';

export const Home = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <InfoCard title="Informations et liens utiles">
                <LinkCard
                    href="https://tgs.iess.fr/"
                    logo={
                        <img src={TGSLogo} alt="TGS" width={48} height={48} />
                    }
                    title="tgs.iess.fr"
                    description="Site d'aide et d'information sur le Terminal Générique de Soins."
                />

                <LinkCard
                    href="https://tgs.iess.fr/"
                    logo={
                        <img src={TGSLogo} alt="TGS" width={48} height={48} />
                    }
                    title="tgs.iess.fr"
                    description="Site d'aide et d'information sur le Terminal Générique de Soins."
                />

                <LinkCard
                    href="https://tgs.iess.fr/"
                    logo={
                        <img src={TGSLogo} alt="TGS" width={48} height={48} />
                    }
                    title="tgs.iess.fr"
                    description="Site d'aide et d'information sur le Terminal Générique de Soins."
                />
            </InfoCard>
        </div>
    );
};
