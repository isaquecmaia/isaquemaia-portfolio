import Opening from '../components/Opening';
import WorkIndex from '../components/WorkIndex';
import ExperienceTable from '../components/ExperienceTable';
import Capabilities from '../components/Capabilities';
import About from '../components/About';
import Correspondence from '../components/Correspondence';
import Education from '../components/Education';

export default function Home() {
    return (
        <>
            <Opening />
            <WorkIndex />
            <ExperienceTable />
            <Capabilities />
            <About />
            <Correspondence />
            <Education />
        </>
    );
}
