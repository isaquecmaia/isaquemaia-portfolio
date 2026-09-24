import type { ContentOverride } from '../content';

// Français. Seul le texte vit ici ; la structure, les liens, les couleurs et les logos viennent de la base en portugais.
export const fr: ContentOverride = {
    profile: {
        role: 'Business Intelligence · BI, FP&A et Opérations',
        city: 'Belo Horizonte, Brésil',
        thesis: "Je construis l'infrastructure de données et les outils internes d'une fintech de paiement : du pipeline quotidien au compte de résultat, du CRM au tableau de bord de la direction.",
        facts: [
            { label: 'Actuellement', value: 'Virtù Pagamentos (ex-Pagaa)' },
            { label: 'Domaines', value: 'BI, FP&A, Customer Success et automatisation' },
            { label: 'Basé à', value: 'Belo Horizonte, Brésil' },
            { label: 'Statut', value: 'Ouvert aux échanges' },
        ],
        kpis: [
            { label: 'commits sur la plateforme interne', note: "Système maison qui a remplacé Looker Studio, construit entre avril et septembre 2026." },
            { value: '3 102', label: 'lignes sur 3 102 sans écart', note: "Moteur de marge vérifié par rapport au rapport officiel de l'acquéreur, août 2026." },
            { value: 'J-1', label: 'mise à jour quotidienne automatisée', note: "Pipeline Python qui lit l'API de l'acquéreur et reconstruit l'entrepôt, les commissions et le scorecard." },
            { label: 'minutes par contrôle qualité, avec IA', note: 'Projet d’automatisation des contrôles qualité du service client chez QuintoAndar, 2025.' },
        ],
        about: [
            "J'ai commencé comme apprenti chez Expertise, sur des tâches administratives, et c'est là que j'ai développé mon anglais. Chez QuintoAndar, au sein de l'équipe Qualité et Formation, j'ai participé au projet qui a utilisé l'IA pour automatiser les contrôles du service client : chaque analyse est passée d'environ 40 à 3 minutes.",
            "Aujourd'hui, chez Virtù (ex-Pagaa), j'ai construit de zéro l'infrastructure BI de l'entreprise ainsi que la plateforme interne qui a remplacé Looker Studio. Le périmètre s'est élargi au FP&A : compte de résultat de l'activité, prévisions de trésorerie et de créances, marge et unit economics. J'étudie l'analyse et le développement de systèmes et je poursuis sur la voie du FP&A avec les données.",
            "Ce qui me motive va au-delà du poste. J'aime penser en systèmes : comprendre comment données, produit, finance et opérations se connectent, et transformer ce lien en processus plus fiables et automatisés.",
        ],
        languages: [
            { name: 'Portugais', level: 'Langue maternelle' },
            { name: 'Anglais', level: 'Courant' },
            { name: 'Espagnol', level: 'En apprentissage' },
        ],
    },
    experience: [
        {
            period: 'Depuis 2025',
            sector: 'PayFac · ex-Pagaa',
            role: 'Analyste Business Intelligence (freelance)',
            summary: "Infrastructure BI, outils internes et FP&A dans une fintech de traitement des paiements.",
            outcomes: [
                'Infrastructure BI construite de zéro : entrepôt de données, base de scorecard et pipeline quotidien (J-1) qui consolide les données transactionnelles de plusieurs acquéreurs.',
                'Migration de Looker Studio vers une plateforme de tableaux de bord maison en React, Tailwind et Recharts.',
                "Tableau de bord Customer Success avec un radar de risque en quatre quadrants, utilisé par l'équipe commerciale pour prioriser les comptes.",
                "FP&A : compte de résultat de l'activité (chiffre d'affaires brut, coût du service, revenu net), prévisions de trésorerie et de créances, analyses de marge et d'unit economics.",
                'Pipeline de génération de leads avec la Meta Ad Library et architecture CRM et CS dans Notion.',
            ],
        },
        {
            period: 'Mars à nov. 2025',
            sector: 'PropTech · 9 mois',
            role: 'Apprenti, Efficiency Ops',
            summary: 'Qualité et Formation : contrôles du service client, analyses qualité et suivi opérationnel.',
            outcomes: [
                "Projet d'automatisation des contrôles qualité avec l'IA : chaque analyse est passée d'environ 40 à 3 minutes, avec plus de volume contrôlé et une meilleure vision du processus.",
                'Contrôles du service client, analyses qualité, recensement des bugs de la plateforme, rapports et tableaux de bord de suivi.',
                'Améliorations de processus, automatisations et contrôles internes avec Google Sheets, Looker Studio, Notion et des formulaires automatisés.',
            ],
        },
        {
            period: 'Oct. 2021 à mars 2023',
            sector: '1 an et 6 mois',
            role: 'Apprenti, Assistant administratif',
            summary: "Support administratif et tâches opérationnelles, avec l'anglais développé comme deuxième langue.",
            outcomes: ["Support administratif général et aide aux tâches opérationnelles de l'entreprise.", "Développement de l'anglais comme deuxième langue."],
        },
    ],
    cases: [
        {
            title: "L'infrastructure BI d'une fintech PayFac, de zéro",
            dek: "Un pipeline quotidien qui lit l'acquéreur, nettoie l'historique et livre trois bases prêtes avant le début de la journée.",
            period: 'Depuis 2025',
            role: 'Conception et mise en œuvre, de bout en bout',
            stack: ['Python', 'SQL', 'PostgreSQL (Supabase)', "API de l'acquéreur", 'Google Sheets'],
            context:
                "À mon arrivée, l'activité reposait sur des tableurs que chaque acquéreur envoyait dans un format différent et sur des rapports de commissions montés à la main. Les tableaux de bord étaient dans Looker Studio, et chaque mise à jour demandait que quelqu'un charge un fichier.",
            problem:
                "La direction, les commerciaux et le CS décidaient sur des chiffres qui arrivaient en retard et changeaient selon la personne qui montait le tableur. Sans base quotidienne fiable, impossible de suivre le TPV, le chiffre d'affaires ou la santé de chaque client.",
            choice:
                "Au lieu d'automatiser les tableurs, je les ai sortis du circuit. Un pipeline Python lit directement l'API de l'acquéreur chaque matin et reconstruit les bases que consomment les tableaux de bord. Et j'ai remplacé Looker Studio par une plateforme maison en React qui lit ces bases sans intermédiaire.",
            actions: [
                "J'ai écrit le pipeline Python avec pagination et gestion des limites de requêtes de l'API, une exécution quotidienne (J-1) à 6 h et le retraitement de périodes passées quand l'acquéreur corrige quelque chose.",
                "J'ai monté l'entrepôt de données transactionnel comme une base en ajout seul, dédupliquée par l'identifiant de chaque transaction.",
                "J'ai généré la base de commissions avec les créances à venir sur 365 jours et le scorecard clients, recalculé de zéro à chaque exécution.",
                "J'ai appliqué des règles de revenu par moyen de paiement (crédit, débit, PIX et boleto) à partir de la grille tarifaire de chaque client.",
                "J'ai migré les tableaux de bord de Looker Studio vers la plateforme maison en React, Tailwind et Recharts, qui lit les mêmes bases dans PostgreSQL (Supabase).",
            ],
            decisions: [
                {
                    title: 'Ajouter seulement, ne jamais écraser',
                    body: "L'entrepôt grandit par ajout et déduplique par identifiant de transaction. On peut ainsi retraiter les sept derniers jours quand l'acquéreur corrige quelque chose, sans rien dupliquer ni toucher au reste de l'historique.",
                },
                {
                    title: 'La règle dans le pipeline, pas dans le tableau de bord',
                    body: 'Le revenu par moyen de paiement, le statut client et les commissions sont calculés une seule fois, dans le pipeline. Les tableaux de bord ne font que lire. Deux écrans ne montrent donc jamais des chiffres différents pour la même question.',
                },
                {
                    title: 'Statut client par règle explicite',
                    body: "Onboarding, montée en charge et actif sont définis par des seuils documentés de volume et de délai depuis la première vente. Quand quelqu'un demande pourquoi un client a changé de palier, la réponse est dans la règle.",
                },
                {
                    title: 'Publication atomique',
                    body: "Un chargement en base remplace tout ou rien. Un échec en plein chargement ne vide plus le tableau de bord jusqu'au retraitement suivant.",
                },
            ],
            figures: [
                { caption: "Flux quotidien : de l'API de l'acquéreur aux bases consommées par la plateforme interne." },
                { label: "À l'écran", caption: 'Performance consolidée, alimentée par les bases du pipeline. Écran réel de la plateforme avec des données fictives, générées uniquement pour cette présentation.' },
            ],
            outcome:
                "Les chargements manuels ont disparu. Chaque jour, avant le début de la journée, l'entrepôt de données, les commissions et le scorecard sont à jour avec la veille, et les tableaux de bord lisent directement ces bases. Looker Studio a quitté la scène, et la plateforme maison est devenue l'endroit où l'entreprise suit l'activité.",
            results: [
                { value: 'J-1', label: 'mise à jour quotidienne, sans chargement manuel' },
                { label: 'bases reconstruites à chaque exécution' },
                { label: 'jours de créances projetées' },
            ],
            retro: "Je mettrais en place la publication atomique dès le premier jour. Pendant un temps, un chargement qui échouait en cours de route laissait le tableau de bord vide jusqu'au retraitement, et cela a coûté une confiance qu'on aurait pu préserver.",
        },
        {
            title: 'Rapprochement financier et moteur de marge',
            dek: "Plusieurs acquéreurs, un seul chiffre d'affaires, et une formule héritée d'un tableur que personne n'avait vérifiée par rapport à la source.",
            period: '2025 et 2026',
            role: 'Enquête, conception et mise en œuvre',
            context:
                "Quand j'ai repris le périmètre, le compte de résultat dépendait d'un rapprochement manuel, chaque jour, entre les rapports des acquéreurs et la base interne. La marge par transaction venait d'un tableur aux onglets enchaînés, construit avant mon arrivée, et les chiffres de TPV changeaient après avoir été communiqués.",
            problem:
                "La marge et le chiffre d'affaires guident les décisions de prix et de portefeuille. Si le chiffre change après la clôture, ou ne correspond pas à ce que l'acquéreur a facturé, personne ne sait à quelle version se fier.",
            choice:
                "J'ai sorti la règle de marge du tableur et écrit un moteur de calcul isolé et testable. Et au lieu de le vérifier par rapport au tableur hérité, je l'ai vérifié par rapport à la seule source qui ne peut pas se tromper : le rapport officiel de l'acquéreur.",
            actions: [
                "J'ai automatisé la consolidation des acquéreurs avec une validation de l'intégrité du schéma et des rapports structurés pour l'analyse du compte de résultat.",
                "J'ai enquêté sur les écarts de volume et trouvé des rétrofacturations traitées avec une date rétroactive, qui modifiaient le TPV de jours déjà communiqués.",
                "J'ai recalibré les indicateurs et ajusté le processus de reporting pour refléter les données corrigées.",
                "J'ai porté la règle de marge, qui vivait dans des onglets de tableur, vers un moteur de calcul isolé et testable.",
                "J'ai vérifié le moteur par rapport au rapport officiel de l'acquéreur d'août 2026 et corrigé la formule issue du tableur hérité, qui s'écartait du calcul réel.",
            ],
            decisions: [
                {
                    title: 'Vérifier par rapport à la source officielle, pas au tableur',
                    body: "La première version du moteur reproduisait fidèlement le tableur hérité et concordait avec lui sur toutes les lignes. Elle était pourtant fausse : la formule d'origine appliquait un facteur que l'acquéreur n'applique pas. La validation par le rapport officiel a remplacé ce calcul par une simple soustraction, avec 3 102 lignes sur 3 102 sans écart.",
                },
                {
                    title: 'Échouer bruyamment, ne pas corriger en silence',
                    body: "Un lot hors schéma est rejeté et apparaît comme une alerte, au lieu d'être corrigé automatiquement. Cela coûte une étape de plus, mais personne ne découvre des semaines plus tard qu'un chiffre a été inventé.",
                },
                {
                    title: "Rétrofacturations dans le mois de l'événement",
                    body: "Rétrofacturations et litiges sont comptés dans le mois où ils ont eu lieu, pas dans celui de la vente. Cette convention, appliquée de la même façon sur tous les écrans, a mis fin à l'impression que le passé changeait tout seul.",
                },
            ],
            figures: [
                { caption: 'Pipeline de rapprochement avec validation et classification des écarts.' },
                { caption: 'TPV communiqué face au TPV ajusté après des rétrofacturations rétroactives. Données illustratives.' },
            ],
            outcome:
                "Le traitement manuel quotidien a disparu, et la marge calculée est devenue la marge réellement facturée par l'acquéreur : 3 102 lignes sur 3 102 du rapport d'août 2026 sans écart. Avec les rétrofacturations comptées dans le mois de l'événement, le TPV déjà communiqué a cessé de changer tout seul.",
            results: [
                { value: '3 102', label: 'lignes sur 3 102 sans écart' },
                { label: 'traitement manuel quotidien' },
                { label: 'convention de rétrofacturation sur tous les écrans' },
            ],
            retro: "Je validerais par rapport au rapport officiel de l'acquéreur dès la première version du moteur. Le tableur hérité semblait juste précisément parce que tout le monde l'utilisait depuis longtemps.",
        },
        {
            title: 'Du tableur au système : la plateforme interne de Virtù',
            dek: "Au départ, il s'agissait de remplacer Looker Studio par des tableaux de bord maison. En cinq mois, c'est devenu le système sur lequel l'entreprise fonctionne.",
            period: 'Avr. à sept. 2026',
            role: 'Produit, design et développement',
            access: 'Système interne à accès restreint et code privé. Les écrans ci-dessous tournent sur des données fictives, sans aucune information client.',
            context:
                "L'entreprise suivait sa performance dans des tableaux de bord Looker Studio alimentés par des tableurs, et le CRM vivait dans Notion, sans lien avec ce que chaque client transactionnait réellement. Chaque nouvelle question de la direction ou des commerciaux devenait un tableur de plus.",
            problem:
                "Chaque équipe regardait une source différente et personne ne voyait le client dans son ensemble : ce qu'il transactionnait, la marge qu'il apportait et l'étape où il se trouvait. Réunir performance, clients, commissions, trésorerie et tunnel commercial au même endroit est devenu une condition pour décider vite.",
            choice:
                "Plutôt qu'un outil de plus sur étagère, j'ai construit le système sur les mêmes bases que le pipeline J-1. Front en React et TypeScript, API maison en Express et base Supabase avec des droits par profil. Les règles métier (marge, cadence du CRM, radar CS) vivent dans des fonctions isolées, testables sans toucher à la base.",
            actions: [
                "Tableaux de bord de TPV, chiffre d'affaires et marge par client, commercial et acquéreur, avec des vues hebdomadaires et mensuelles et un forecast aux objectifs modifiables.",
                'Customer Success avec un radar de risque en quatre quadrants et des alertes quotidiennes automatiques pour les comptes qui demandent de l’attention.',
                "CRM maison : pipeline d'étapes, kanban d'activation, fiche client avec le volume réel et la marge réelle, partenariats avec commission par négociation et la file d'actions du jour.",
                'Weekly Review reliée au CRM, avec un Pipe Report et la composition du TPV et de la marge.',
                "Espace finance avec les commissions, la trésorerie avec les versements de l'acquéreur exécution par exécution, et le moteur de marge.",
                'Sécurité de système interne : jetons d’accès de courte durée, protection CSRF, RLS en base et limitation des tentatives de connexion.',
            ],
            decisions: [
                {
                    title: 'Règles métier pures, base de données en périphérie',
                    body: "Le moteur de marge, la cadence du CRM et le radar CS sont des fonctions sans accès à la base, testables avec des données d'exemple. Les routes ne font que lire et écrire. Changer une règle n'exige pas de toucher à l'infrastructure.",
                },
                {
                    title: 'Réconcilier plutôt qu’accumuler',
                    body: "La cadence du CRM ne crée pas de tâches : elle décrit celles qui devraient exister et n'écrit que la différence. L'exécuter deux fois de suite crée zéro tâche la seconde fois, et c'est le test principal du moteur.",
                },
                {
                    title: 'Semaine partielle contre semaine partielle',
                    body: "La comparaison hebdomadaire ne regarde la semaine précédente que jusqu'au même jour de la semaine qu'aujourd'hui. Un lundi n'est plus comparé à une semaine complète, et personne ne s'alarme pour rien.",
                },
            ],
            figures: [
                { caption: 'Carte de la plateforme : les espaces du système et ce que chacun résout.' },
                { label: 'Customer Success', caption: 'Radar de risque : Alerte, Attention, Silence, Pré-churn et OK, avec le portefeuille détaillé juste en dessous. Écran réel de la plateforme avec des données fictives, générées uniquement pour cette présentation.' },
                { label: 'La règle du radar', caption: "Les quadrants croisent l'atteinte de l'objectif de TPV avec celle de l'objectif de marge. Points illustratifs." },
                { label: 'CRM', caption: "Actions du jour : la file construite par la cadence du CRM, triée par échéance, niveau d'escalade et revenu à risque. Écran réel de la plateforme avec des données fictives, générées uniquement pour cette présentation." },
                { label: 'Rituels', caption: "Lecture hebdomadaire du chiffre d'affaires et de la marge face à la semaine précédente comparable et à l'objectif. Écran réel de la plateforme avec des données fictives, générées uniquement pour cette présentation." },
            ],
            outcome:
                "La plateforme est devenue l'endroit où toute l'entreprise travaille. Looker Studio et le CRM dans Notion ont été arrêtés, et la direction, les commerciaux, le CS et la finance ont commencé à regarder les mêmes chiffres. Des rituels comme la Weekly Review et la clôture des commissions sont devenus plus rapides, et le radar CS a commencé à signaler les comptes à risque avant qu'ils ne cessent de transactionner.",
            results: [{ label: 'outils remplacés : Looker Studio et le CRM dans Notion' }, { label: 'espaces sur une seule plateforme' }, { label: 'commits en cinq mois' }],
            retro: "Je séparerais dès le départ les règles partagées par l'écran et le serveur. Aujourd'hui, le radar CS et la lecture hebdomadaire existent en deux copies, une de chaque côté, et chaque changement de règle doit être reporté à la main.",
        },
    ],
    capabilities: [
        {
            title: 'Données',
            items: [
                { name: 'SQL · PostgreSQL', where: 'Entrepôt de données et bases sur Supabase' },
                { name: 'Python', where: 'Pipeline J-1 et reconstruction des bases' },
                { name: "API d'acquéreurs", where: 'Extraction paginée et quotidienne' },
                { name: 'Modélisation de données', where: 'Entrepôt transactionnel, scorecard, CRM' },
                { name: 'Qualité des données', where: 'Validation du schéma avant les tableaux de bord' },
            ],
        },
        {
            title: 'BI et FP&A',
            items: [
                { name: 'Tableaux de bord maison', where: 'Plateforme interne en React et Recharts' },
                { name: 'Compte de résultat et trésorerie', where: "FP&A de l'activité, créances" },
                { name: 'Marge et unit economics', where: 'Moteur de marge, analyses pour la direction' },
                { name: 'Excel · Google Sheets', where: "Analyses et routines de l'activité" },
                { name: 'Looker Studio', where: 'Anciens tableaux de bord, QuintoAndar' },
            ],
        },
        {
            title: 'Automatisation et IA',
            items: [
                { name: 'IA pour les contrôles qualité', where: 'QuintoAndar, de 40 à 3 minutes' },
                { name: 'Alertes automatiques', where: 'Radar quotidien de Customer Success' },
                { name: 'Meta Ad Library', where: 'Pipeline de leads pour PayFac' },
                { name: 'Notion', where: 'CRM et CS avant le système maison' },
            ],
        },
        {
            title: 'Code',
            items: [
                { name: 'React · TypeScript', where: 'Plateforme interne, ce site' },
                { name: 'Express · Vercel', where: 'API maison et déploiement' },
                { name: 'Supabase · RLS', where: 'Base de données et droits par profil' },
                { name: 'Git', where: '148 commits sur la plateforme' },
            ],
        },
    ],
    degrees: [{ title: 'Analyse et développement de systèmes', status: 'En cours · fin prévue en décembre 2026' }],
    certificates: [{ date: 'oct. 2025' }, { title: 'Analyse de données', date: 'août 2025' }],
    recommendations: [
        {
            relation: 'Responsable direct',
            date: 'nov. 2025',
            excerpt: 'Isaque est un professionnel exemplaire, extrêmement organisé, attaché au respect des délais et toujours constant dans ses livrables.',
            full: [
                "Il montre un grand intérêt pour l'innovation et la créativité, et sa curiosité naturelle le distingue des autres.",
                "Il a une énergie positive communicative et une attitude collaborative admirable, toujours prêt à partager ses connaissances et à contribuer au développement de l'équipe.",
                'Ses principales compétences : une communication claire et efficace ; de la flexibilité face au changement ; une ouverture aux retours constructifs ; une grande maîtrise des processus, de la documentation, de la qualité, de l’amélioration continue et de la formation.',
                "En résumé, Isaque est un professionnel complet, avec un état d'esprit de progression et un esprit d'équipe qui fait la différence dans n'importe quel environnement de travail.",
            ],
        },
    ],
    sectionTitles: {
        trabalho: 'Travaux choisis',
        experiencia: 'Parcours',
        ferramentas: 'Ma façon de travailler',
        sobre: 'À propos',
        correspondencias: 'Correspondance',
        formacao: 'Formation',
    },
    ticker: ['Pipeline J-1', 'Entrepôt de données', "Compte de résultat", 'Radar Customer Success', 'Moteur de marge', 'CRM maison', 'Trésorerie et créances', 'Weekly Review', 'Automatisation par IA', 'Unit economics'],
    figures: {
        biFlow: [
            { title: 'Sources', nodes: ["API de l'acquéreur", 'Grille tarifaire par client', 'Référentiel clients'] },
            { title: 'Pipeline J-1', nodes: ['Extraction paginée', 'Déduplication par transaction', 'Revenu par moyen de paiement'] },
            { title: 'Bases', nodes: ['Entrepôt transactionnel', 'Commissions et créances', 'Scorecard clients'] },
            { title: 'Base de données', nodes: ['PostgreSQL sur Supabase', 'Publication atomique', 'Droits par profil'] },
            { title: 'Usage', nodes: ['Plateforme interne', 'Customer Success', 'FP&A et direction'] },
        ],
        reconFlow: [
            { title: 'Entrée', nodes: ['Rapports des acquéreurs', 'Base interne'] },
            { title: 'Validation', nodes: ['Types et champs', 'Dates et devise', 'Lot invalide → alerte'] },
            { title: 'Rapprochement', nodes: ['Clé exacte', 'Approché, signalé', 'Transaction par transaction'] },
            { title: 'Écarts', nodes: ['Montant', 'Date', 'Statut', 'Absent'] },
            { title: 'Sortie', nodes: ['Compte de résultat consolidé', 'TPV communiqué + ajusté'] },
        ],
        platformMap: [
            { title: 'Performance', items: ["TPV, chiffre d'affaires et marge", 'Vues hebdomadaires et mensuelles', 'Forecast avec objectifs'] },
            { title: 'Customer Success', items: ['Radar de risque', 'Alertes quotidiennes', 'Vue par client'] },
            { title: 'CRM', items: ['Pipeline et activation', 'Fiche client', 'Partenariats et actions du jour'] },
            { title: 'Rituels', items: ['Weekly Review', 'Pipe Report', 'Ajustements de la semaine'] },
            { title: 'Finance', items: ['Commissions', 'Trésorerie et versements', 'Moteur de marge'] },
            { title: 'Données', items: ['Transactions', 'Glossaire des indicateurs', 'Chargements atomiques'] },
        ],
        radar: {
            aria: 'Schéma du radar Customer Success en quatre quadrants',
            ok: 'OK',
            attention: 'ATTENTION',
            alert: 'ALERTE',
            xAxis: 'OBJECTIF DE TPV ATTEINT →',
            yAxis: 'OBJECTIF DE MARGE →',
            legend: [
                ['OK', 'Objectifs de TPV et de marge atteints.'],
                ['Attention', 'Un des deux objectifs hors cible.'],
                ['Alerte', 'Les deux sous la cible : agir tout de suite.'],
                ['Silence', 'De 5 à 20 jours sans transaction.'],
                ['Pré-churn', '21 jours ou plus sans transaction.'],
            ],
        },
        gap: { aria: 'Graphique illustratif du TPV communiqué face au TPV ajusté', reported: 'TPV communiqué le jour même', adjusted: 'TPV ajusté', day: 'jour' },
        shots: {
            cs: 'Écran Customer Success avec le radar de risque et le tableau du portefeuille',
            acoes: "Écran des actions du jour du CRM avec la file de tâches par client",
            weekly: "Tableau de bord hebdomadaire du chiffre d'affaires et de la marge avec l'objectif de la semaine",
            performance: "Écran de performance consolidée avec TPV, chiffre d'affaires, marge et taux d'acceptation",
        },
    },
};
