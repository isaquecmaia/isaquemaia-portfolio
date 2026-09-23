import Opening from '../components/Opening';
import WorkIndex from '../components/WorkIndex';
import ExperienceTable from '../components/ExperienceTable';
import Capabilities from '../components/Capabilities';
import About from '../components/About';
import Education from '../components/Education';

export default function Home() {
    return (
        <>
            <Opening />
            <WorkIndex />
            <ExperienceTable />
            <Capabilities />
            <About />
            <Education />
        </>
    );
}
