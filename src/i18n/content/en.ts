import type { ContentOverride } from '../content';

// English. Only text lives here; structure, links, colors and logos come from the Portuguese base.
export const en: ContentOverride = {
    profile: {
        role: 'Business Intelligence · BI, FP&A and Operations',
        city: 'Belo Horizonte, Brazil',
        thesis: 'I build the data infrastructure and internal tools of a payments fintech: from the daily pipeline to the P&L, from the CRM to the leadership dashboard.',
        facts: [
            { label: 'Currently', value: 'Virtù Pagamentos (formerly Pagaa)' },
            { label: 'Focus', value: 'BI, FP&A, Customer Success and automation' },
            { label: 'Based in', value: 'Belo Horizonte, Brazil' },
            { label: 'Status', value: 'Open to conversations' },
        ],
        kpis: [
            { value: '148', label: 'commits on the internal platform', note: 'In-house system that replaced Looker Studio, built between April and September 2026.' },
            { value: '3,102', label: 'of 3,102 rows with no discrepancy', note: "Margin engine checked against the acquirer's official report, August 2026." },
            { value: 'D-1', label: 'automated daily refresh', note: 'Python pipeline that reads the acquirer API and rebuilds the warehouse, commissions and scorecard.' },
            { value: '40 → 3', label: 'minutes per QA review, with AI', note: 'Customer service QA automation project at QuintoAndar, 2025.' },
        ],
        about: [
            'I started as an apprentice at Expertise, in administrative routines, and that is where I developed my English. At QuintoAndar, in Quality and Training, I took part in the project that used AI to automate customer service reviews: each analysis went from about 40 to 3 minutes.',
            'Today, at Virtù (formerly Pagaa), I built the company BI infrastructure from scratch, along with the internal platform that replaced Looker Studio. The scope grew into FP&A: the operating P&L, cash flow and receivables forecasts, margin and unit economics. I study Systems Analysis and Development and keep moving along the FP&A and data path.',
            'What drives me goes beyond the job title. I like thinking in systems: understanding how data, product, finance and operations connect, and turning that connection into more reliable, automated processes.',
        ],
        languages: [
            { name: 'Portuguese', level: 'Native' },
            { name: 'English', level: 'Fluent' },
            { name: 'Spanish', level: 'Learning' },
        ],
    },
    experience: [
        {
            period: 'Since 2025',
            sector: 'PayFac · formerly Pagaa',
            role: 'Business Intelligence Analyst (contractor)',
            summary: 'BI infrastructure, internal tools and FP&A at a payment processing fintech.',
            outcomes: [
                'BI infrastructure built from scratch: data warehouse, scorecard base and a daily (D-1) pipeline that consolidates transaction data from multiple acquirers.',
                'Migration from Looker Studio to an in-house dashboard platform in React, Tailwind and Recharts.',
                'Customer Success dashboard with a four-quadrant risk radar, used by sales to prioritize accounts.',
                'FP&A: operating P&L (gross revenue, cost of service, net revenue), cash flow and receivables forecasts, margin and unit economics analyses.',
                'Lead generation pipeline with the Meta Ad Library and CRM and CS architecture in Notion.',
            ],
        },
        {
            period: 'Mar to Nov 2025',
            sector: 'PropTech · 9 months',
            role: 'Apprentice, Efficiency Ops',
            summary: 'Quality and Training: customer service reviews, quality analyses and operational tracking.',
            outcomes: [
                'AI-based QA automation project: each analysis went from about 40 to 3 minutes, with more volume reviewed and better visibility into the process.',
                'Service reviews, quality analyses, platform bug mapping, and tracking reports and dashboards.',
                'Process improvements, automations and internal controls with Google Sheets, Looker Studio, Notion and automated forms.',
            ],
        },
        {
            period: 'Oct 2021 to Mar 2023',
            sector: '1 year and 6 months',
            role: 'Apprentice, Administrative Assistant',
            summary: 'Administrative support and operational routines, with English developed as a second language.',
            outcomes: ['General administrative support and help with the company operational routines.', 'English developed as a second language.'],
        },
    ],
    cases: [
        {
            title: 'The BI infrastructure of a PayFac fintech, from scratch',
            dek: 'A daily pipeline that reads the acquirer, cleans the history and delivers three ready bases before the workday starts.',
            period: 'Since 2025',
            role: 'Design and implementation, end to end',
            stack: ['Python', 'SQL', 'PostgreSQL (Supabase)', 'Acquirer API', 'Google Sheets'],
            context:
                'When I arrived, the operation relied on spreadsheets that each acquirer sent in a different format and on commission reports assembled by hand. Dashboards lived in Looker Studio, and every refresh required someone to upload a file.',
            problem:
                'Leadership, sales and CS made decisions on numbers that arrived late and changed depending on who built the spreadsheet. Without a reliable daily base, there was no way to track TPV, revenue or the health of each client.',
            choice:
                'Instead of automating the spreadsheets, I took them out of the way. A Python pipeline reads the acquirer API directly every morning and rebuilds the bases the dashboards consume. And I replaced Looker Studio with an in-house React platform that reads those bases with no middle layer.',
            actions: [
                'Wrote the Python pipeline with API pagination and rate limit control, a daily (D-1) run at 6 a.m. and reprocessing of past windows when the acquirer corrects something.',
                'Built the transactional data warehouse as an append-only base, deduplicated by each transaction identifier.',
                'Generated the commissions base with future receivables for the next 365 days and the client scorecard, rebuilt from scratch on every run.',
                "Applied revenue rules by payment method (credit, debit, PIX and boleto) based on each client's rate table.",
                'Migrated the Looker Studio dashboards to the in-house platform in React, Tailwind and Recharts, reading the same bases in PostgreSQL (Supabase).',
            ],
            decisions: [
                {
                    title: 'Append only, never overwrite',
                    body: 'The warehouse grows by appending and deduplicates by transaction identifier. That makes it possible to reprocess the last seven days when the acquirer fixes something, without duplicating anything or touching the rest of the history.',
                },
                {
                    title: 'Rules in the pipeline, not in the dashboard',
                    body: 'Revenue by method, client status and commissions are calculated once, in the pipeline. Dashboards only read. So two screens never show different numbers for the same question.',
                },
                {
                    title: 'Client status by explicit rule',
                    body: 'Onboarding, ramp-up and active are defined by documented thresholds of volume and time since the first sale. When someone asks why a client changed tier, the answer is in the rule.',
                },
                {
                    title: 'Atomic publishing',
                    body: 'A database load replaces the whole base or nothing at all. A failure mid-upload no longer wipes the dashboard until the next reprocessing.',
                },
            ],
            figures: [
                { caption: 'Daily flow: from the acquirer API to the bases consumed by the internal platform.' },
                { label: 'On screen', caption: 'Consolidated performance, fed by the pipeline bases. Real platform screen with fictional data, generated only for this showcase.' },
            ],
            outcome:
                'Manual uploads are gone. Every day, before the workday, the data warehouse, commissions and scorecard are up to date with the previous day, and dashboards read straight from those bases. Looker Studio left the stage, and the in-house platform became where the company follows the operation.',
            results: [
                { label: 'daily refresh, no manual upload' },
                { label: 'bases rebuilt per run' },
                { label: 'days of projected receivables' },
            ],
            retro: 'I would ship atomic publishing from day one. For a while, a load that failed midway left the dashboard empty until reprocessing, and that cost trust that could have been spared.',
        },
        {
            title: 'Financial reconciliation and the margin engine',
            dek: 'Several acquirers, a single revenue number, and a formula inherited from a spreadsheet that nobody had checked against the source.',
            period: '2025 and 2026',
            role: 'Investigation, design and implementation',
            context:
                "When I took over the area, the P&L depended on manually matching, every day, the acquirers' reports with the internal base. Margin per transaction came from a spreadsheet with chained tabs, built before I joined, and TPV numbers changed after being reported.",
            problem:
                'Margin and revenue drive pricing and portfolio decisions. If the number changes after closing, or does not match what the acquirer billed, nobody knows which version to trust.',
            choice:
                "I took the margin rule out of the spreadsheet and wrote an isolated, testable calculation engine. And instead of checking the engine against the inherited spreadsheet, I checked it against the one source that cannot be wrong: the acquirer's official report.",
            actions: [
                'Automated the consolidation of acquirers with schema integrity validation and structured reports for P&L analysis.',
                'Investigated volume discrepancies and found chargebacks processed with retroactive dates, which changed the TPV of days already reported.',
                'Recalibrated the metrics and adjusted the reporting process to reflect the corrected data.',
                'Ported the margin rule, which lived in spreadsheet tabs, to an isolated and testable calculation engine.',
                "Checked the engine against the acquirer's official report for August 2026 and fixed the formula inherited from the spreadsheet, which diverged from the real calculation.",
            ],
            decisions: [
                {
                    title: 'Check against the official source, not the spreadsheet',
                    body: 'The first version of the engine faithfully reproduced the inherited spreadsheet and matched it on every row. It was still wrong: the original formula applied a factor the acquirer does not apply. Validating against the official report replaced that calculation with a simple subtraction, with 3,102 of 3,102 rows showing no discrepancy.',
                },
                {
                    title: 'Fail loudly, do not fix silently',
                    body: 'A batch that breaks the schema is rejected and shows up as an alert instead of being fixed automatically. It costs one extra step, but nobody finds out weeks later that a number was made up.',
                },
                {
                    title: 'Chargebacks in the month of the event',
                    body: 'Chargebacks and disputes are counted in the month they happened, not the month of the sale. That convention, applied the same way on every screen, ended the feeling that the past was changing by itself.',
                },
            ],
            figures: [
                { caption: 'Reconciliation pipeline with validation and classification of discrepancies.' },
                { caption: 'Reported versus adjusted TPV after retroactive chargebacks. Illustrative data.' },
            ],
            outcome:
                'The daily manual processing is gone, and the calculated margin became the margin the acquirer actually billed: 3,102 of 3,102 rows of the August 2026 report with no discrepancy. With chargebacks counted in the month of the event, reported TPV stopped changing by itself.',
            results: [
                { value: '3,102', label: 'of 3,102 rows with no discrepancy' },
                { label: 'daily manual processing' },
                { label: 'chargeback convention across every screen' },
            ],
            retro: "I would validate against the acquirer's official report from the very first version of the engine. The inherited spreadsheet looked right precisely because everyone had been using it for a long time.",
        },
        {
            title: 'From spreadsheet to system: the Virtù internal platform',
            dek: 'It started as swapping Looker Studio for in-house dashboards. In five months, it became the system the company runs on.',
            period: 'Apr to Sep 2026',
            role: 'Product, design and development',
            access: 'Internal system with restricted access and private code. The screens below run on fictional data, with no client information.',
            context:
                'The company tracked performance in Looker Studio dashboards fed by spreadsheets, and the CRM lived in Notion, disconnected from what each client actually transacted. Every new question from leadership or sales turned into another spreadsheet.',
            problem:
                'Each team looked at a different source and nobody saw the whole client: what they transacted, how much margin they brought and which stage they were in. Bringing performance, clients, commissions, cash and the sales funnel into one place became a condition for deciding fast.',
            choice:
                'Instead of another off-the-shelf tool, I built the system on the same bases as the D-1 pipeline. Front end in React and TypeScript, an in-house Express API and a Supabase database with role-based permissions. Business rules (margin, CRM cadence, CS radar) live in isolated functions that can be tested without touching the database.',
            actions: [
                'TPV, revenue and margin dashboards by client, salesperson and acquirer, with weekly and monthly views and a forecast with editable targets.',
                'Customer Success with a four-quadrant risk radar and automatic daily alerts for the accounts that need attention.',
                "In-house CRM: stage pipeline, activation kanban, client profile with actual volume and real margin, partnerships with commission per deal and the day's action queue.",
                'Weekly Review tied to the CRM, with a Pipe Report and a breakdown of TPV and margin.',
                "Finance area with commissions, cash with the acquirer's payouts run by run, and the margin engine.",
                'Internal system security: short-lived access tokens, CSRF protection, RLS in the database and login attempt limits.',
            ],
            decisions: [
                {
                    title: 'Pure business rules, database at the edges',
                    body: 'The margin engine, the CRM cadence and the CS radar are functions with no database access, testable with sample data. Routes only read and write. Changing a rule does not require touching the infrastructure.',
                },
                {
                    title: 'Reconcile instead of accumulate',
                    body: 'The CRM cadence does not create tasks: it describes the ones that should exist and writes only the difference. Running it twice in a row creates zero tasks the second time, and that is the main test of the engine.',
                },
                {
                    title: 'Partial week against partial week',
                    body: "The weekly comparison looks at the previous week only up to the same weekday as today. A Monday is no longer compared with a full week, and nobody gets startled for nothing.",
                },
            ],
            figures: [
                { caption: 'Platform map: the areas of the system and what each one solves.' },
                { label: 'Customer Success', caption: 'Risk radar: Alert, Attention, Silence, Pre-churn and OK, with the detailed portfolio right below. Real platform screen with fictional data, generated only for this showcase.' },
                { label: 'The radar rule', caption: 'The quadrants cross TPV target attainment with margin target attainment. Illustrative points.' },
                { label: 'CRM', caption: "Today's actions: the queue built by the CRM cadence, sorted by deadline, escalation and revenue at risk. Real platform screen with fictional data, generated only for this showcase." },
                { label: 'Rituals', caption: 'Weekly view of revenue and margin against the comparable previous week and the target. Real platform screen with fictional data, generated only for this showcase.' },
            ],
            outcome:
                'The platform became where the whole company works. Looker Studio and the Notion CRM were shut down, and leadership, sales, CS and finance started looking at the same numbers. Rituals like the Weekly Review and the commission close got faster, and the CS radar began flagging at-risk accounts before they stopped transacting.',
            results: [{ label: 'tools replaced: Looker Studio and the Notion CRM' }, { label: 'areas in a single platform' }, { label: 'commits in five months' }],
            retro: 'I would separate from the start the rules shared by the screen and the server. Today the CS radar and the weekly view exist in two copies, one on each side, and every rule change has to be mirrored by hand.',
        },
    ],
    capabilities: [
        {
            title: 'Data',
            items: [
                { name: 'SQL · PostgreSQL', where: 'Data warehouse and bases on Supabase' },
                { name: 'Python', where: 'D-1 pipeline and base rebuilds' },
                { name: 'Acquirer APIs', where: 'Paginated daily extraction' },
                { name: 'Data modeling', where: 'Transactional DW, scorecard, CRM' },
                { name: 'Data quality', where: 'Schema validation before dashboards' },
            ],
        },
        {
            title: 'BI & FP&A',
            items: [
                { name: 'In-house dashboards', where: 'Internal platform in React and Recharts' },
                { name: 'P&L and cash flow', where: 'Operating FP&A, receivables' },
                { name: 'Margin and unit economics', where: 'Margin engine, analyses for leadership' },
                { name: 'Excel · Google Sheets', where: 'Operational analyses and routines' },
                { name: 'Looker Studio', where: 'Previous dashboards, QuintoAndar' },
            ],
        },
        {
            title: 'Automation & AI',
            items: [
                { name: 'AI for QA reviews', where: 'QuintoAndar, from 40 to 3 minutes' },
                { name: 'Automatic alerts', where: 'Daily Customer Success radar' },
                { name: 'Meta Ad Library', where: 'Lead pipeline for PayFac' },
                { name: 'Notion', where: 'CRM and CS before the in-house system' },
            ],
        },
        {
            title: 'Code',
            items: [
                { name: 'React · TypeScript', where: 'Internal platform, this site' },
                { name: 'Express · Vercel', where: 'In-house API and deploy' },
                { name: 'Supabase · RLS', where: 'Database and role-based permissions' },
                { name: 'Git', where: '148 commits on the platform' },
            ],
        },
    ],
    degrees: [{ title: 'Systems Analysis and Development', status: 'In progress · expected December 2026' }],
    certificates: [{ date: 'Oct 2025' }, { title: 'Data Analysis', date: 'Aug 2025' }],
    recommendations: [
        {
            role: 'Team Leader, Efficiency Ops',
            relation: 'Direct manager',
            date: 'Nov 2025',
            excerpt: 'Isaque is an exemplary professional, extremely organized, committed to deadlines and always delivering consistent work.',
            full: [
                'He shows great interest in innovation and creativity and is naturally curious, which sets him apart.',
                'He has contagious positive energy and an admirable collaborative attitude, always willing to share knowledge and contribute to the team growth.',
                'His main skills include: clear and effective communication; flexibility in the face of change; openness to constructive feedback; strong command of processes, documentation, quality, continuous improvement and training.',
                'In short, Isaque is a well-rounded professional, with a growth mindset and a team spirit that makes a difference in any workplace.',
            ],
        },
    ],
    sectionTitles: {
        trabalho: 'Selected work',
        experiencia: 'Experience',
        ferramentas: 'How I work',
        sobre: 'About',
        correspondencias: 'Correspondence',
        formacao: 'Education',
    },
    ticker: ['D-1 pipeline', 'Data warehouse', 'Operating P&L', 'Customer Success radar', 'Margin engine', 'In-house CRM', 'Cash flow and receivables', 'Weekly Review', 'AI automation', 'Unit economics'],
    figures: {
        biFlow: [
            { title: 'Sources', nodes: ['Acquirer API', 'Rate table per client', 'Client registry'] },
            { title: 'D-1 pipeline', nodes: ['Paginated extraction', 'Deduplication per transaction', 'Revenue by method'] },
            { title: 'Bases', nodes: ['Transactional DW', 'Commissions and receivables', 'Client scorecard'] },
            { title: 'Database', nodes: ['PostgreSQL on Supabase', 'Atomic publishing', 'Role-based permissions'] },
            { title: 'Consumption', nodes: ['Internal platform', 'Customer Success', 'FP&A and leadership'] },
        ],
        reconFlow: [
            { title: 'Input', nodes: ["Acquirers' reports", 'Internal base'] },
            { title: 'Validation', nodes: ['Types and fields', 'Dates and currency', 'Invalid batch → alert'] },
            { title: 'Matching', nodes: ['Exact key', 'Approximate, flagged', 'Transaction by transaction'] },
            { title: 'Discrepancies', nodes: ['Amount', 'Date', 'Status', 'Missing'] },
            { title: 'Output', nodes: ['Consolidated P&L', 'Reported + adjusted TPV'] },
        ],
        platformMap: [
            { title: 'Performance', items: ['TPV, revenue and margin', 'Weekly and monthly views', 'Forecast with targets'] },
            { title: 'Customer Success', items: ['Risk radar', 'Daily alerts', 'Client view'] },
            { title: 'CRM', items: ['Pipeline and activation', 'Client profile', "Partnerships and today's actions"] },
            { title: 'Rituals', items: ['Weekly Review', 'Pipe Report', 'Weekly adjustments'] },
            { title: 'Finance', items: ['Commissions', 'Cash and payouts', 'Margin engine'] },
            { title: 'Data', items: ['Transactions', 'Metrics glossary', 'Atomic uploads'] },
        ],
        radar: {
            aria: 'Diagram of the Customer Success radar in four quadrants',
            ok: 'OK',
            attention: 'ATTENTION',
            alert: 'ALERT',
            xAxis: 'TPV TARGET ATTAINED →',
            yAxis: 'MARGIN TARGET →',
            legend: [
                ['OK', 'TPV and margin targets met.'],
                ['Attention', 'One of the two targets off track.'],
                ['Alert', 'Both below target: act now.'],
                ['Silence', '5 to 20 days with no transactions.'],
                ['Pre-churn', '21 days or more with no transactions.'],
            ],
        },
        gap: { aria: 'Illustrative chart of reported versus adjusted TPV', reported: 'TPV reported on the day', adjusted: 'Adjusted TPV', day: 'day' },
        shots: {
            cs: 'Customer Success screen with the risk radar and the portfolio table',
            acoes: "CRM screen with today's actions and the task queue per client",
            weekly: 'Weekly revenue and margin dashboard with the weekly target',
            performance: 'Consolidated performance screen with TPV, revenue, margin and approval rate',
        },
    },
};
