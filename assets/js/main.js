/* =============================================
   FIANARANTSOA À LA BELLE ÉPOQUE
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // NAVIGATION
    // =====================
    const nav = document.getElementById('main-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // Scroll effect on nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navAnchors.forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Active nav highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    });

    // =====================
    // SCROLL REVEAL
    // =====================
    const revealElements = document.querySelectorAll(
        '.timeline-item, .recit-card, .personnage-card, .intro-text, .apropos-bio, .apropos-projet, .audio-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // =====================
    // RÉCITS TOGGLE
    // =====================
    document.querySelectorAll('.recit-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const fullRecit = document.getElementById(targetId);
            if (fullRecit) {
                fullRecit.classList.toggle('active');
                btn.textContent = fullRecit.classList.contains('active') ? 'Réduire' : 'Lire le récit';
            }
        });
    });

    document.querySelectorAll('.recit-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const fullRecit = btn.closest('.recit-full');
            fullRecit.classList.remove('active');
            const toggleBtn = fullRecit.previousElementSibling.querySelector('.recit-toggle');
            if (toggleBtn) toggleBtn.textContent = 'Lire le récit';
        });
    });

    // =====================
    // CARTE INTERACTIVE
    // =====================
    const mapEl = document.getElementById('map');
    if (mapEl) {
        // Fianarantsoa center coordinates
        const map = L.map('map', {
            scrollWheelZoom: false
        }).setView([-21.4416, 47.0856], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 18
        }).addTo(map);

        // Custom icon
        const goldIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width:12px;height:12px;background:#E07A5F;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        const starIcon = L.divIcon({
            className: 'custom-marker-star',
            html: '<div style="width:18px;height:18px;background:#E07A5F;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });

        // Points of interest
        const lieux = [
            {
                lat: -21.4410, lng: 47.0870,
                title: "La Villa Isaha — Maison Jacta",
                text: "Construite en 1942 par l'entreprise Scacco sur l'avenue Lyautey. En creusant les fondations, on découvre un caveau de roi Betsileo. La plus belle villa de l'avenue, avec son jardin de rosiers, son verger en espalier et son piano. Vendue en 1997, elle a été transformée en location.",
                star: true
            },
            {
                lat: -21.4408, lng: 47.0865,
                title: "Avenue Lyautey",
                text: "Grande avenue boisée d'eucalyptus, bambous et autres, formant une voûte naturelle. Baptisée en l'honneur du Maréchal Lyautey qui résida dans une maison de cette avenue."
            },
            {
                lat: -21.4412, lng: 47.0862,
                title: "Garage Citroën (1930-1950)",
                text: "Face à la vieille poste et l'école européenne. Dirigé par Albert Jacta dès 1930 pour le compte de Citroën. Puis transformé en « Tout pour l'Auto » à Isaha à partir de 1950. Albert Jacta fut d'abord représentant Citroën, puis Peugeot. Quand sa fille acheta une Dauphine Renault, sa mère fut en colère : la fille du concessionnaire achetait chez le concurrent !"
            },
            {
                lat: -21.4405, lng: 47.0868,
                title: "La Piscine (1943)",
                text: "Construite face à la maison Lyautey, avec un bâtiment à deux tours pour la salle de sport. Maudite selon la légende : un vazaha décapita les serpents sacrés trouvés lors du creusement."
            },
            {
                lat: -21.4420, lng: 47.0848,
                title: "Le Picardy / Sud Hôtel",
                text: "Appelé d'abord Sud-Hôtel, puis Hôtel Betsileo. Haut lieu de la vie sociale de Fianarantsoa. Lieu des cocktails et remises de coupes après les courses automobiles. Le carrelage d'origine est encore visible aujourd'hui."
            },
            {
                lat: -21.4418, lng: 47.0855,
                title: "Le Cercle Français",
                text: "Bridge, billard, lecture, danse, bar, ping-pong, tennis. Bals du Nouvel An en smoking et robes du soir. Mardi Gras costumé pour les enfants. Apéritifs dansants du dimanche. Le barman M. Potier accueillait tout le monde les bras ouverts."
            },
            {
                lat: -21.4425, lng: 47.0852,
                title: "La Trano Pokolona",
                text: "Soirées théâtrales, vaccinations de la Croix-Rouge, contrôles sanitaires. Lieu des gymkhanas en voitures et motos. Place centrale de la vie communautaire."
            },
            {
                lat: -21.4422, lng: 47.0860,
                title: "Le Zoma (Marché)",
                text: "Le vieux marché où, à une certaine époque, il y avait une filature qui tissait le choga — tissu de coton pour les lamba, très solide. Pendant la guerre, Cécile en faisait des draps et des chemises."
            },
            {
                lat: -21.4415, lng: 47.0845,
                title: "Ambalapaiso Ambony",
                text: "Quartier avec le bâtiment Fievet, la maison du maire David, les bâtiments marseillaise, le château Moutel, la quincaillerie Devaux, la villa Langlois. Terrain de jeu de Jacqueline avec son amie Annie."
            },
            {
                lat: -21.4428, lng: 47.0840,
                title: "Ambalapaiso Ambany",
                text: "Bijouterie Amir Khan, garage Renault (M. Fed'Herbe puis M. Laire), salon de coiffure Debert. Les trois villas construites par un propriétaire malais qui avait une rizerie. La pharmacie. Le cinéma Rex. En remontant vers le Picardy."
            },
            {
                lat: -21.4430, lng: 47.0865,
                title: "La Gare",
                text: "Point de passage des grands rallyes de Madagascar. Bals dans le hall de la gare après les pointages. Mme Jacta a eu la chance de pouvoir y entrer et tout photographier. La gare n'a pas changé depuis les années 1930."
            },
            {
                lat: -21.4414, lng: 47.0858,
                title: "La Mairie",
                text: "Aujourd'hui disparue. Deux entrées — face à Pachou et vers Ambalapaiso. Jacqueline s'y est mariée en 1956. Le maire était M. Leroy, coéquipier de Lyautey et Gallieni."
            },
            {
                lat: -21.4407, lng: 47.0855,
                title: "Immeuble Scacco (1942)",
                text: "Premier immeuble construit face à la Villa Jacta par l'entreprise Scacco en 1942. À l'origine, il était prévu pour loger les familles de gendarmes. C'est le premier bâtiment construit en échelaine dans le quartier."
            },
            {
                lat: -21.4419, lng: 47.0850,
                title: "Grand Hôtel Pachou",
                text: "Bâtiment de l'époque Gallieni. La Gérama se trouvait d'un côté, l'Hôtel Pachou de l'autre. D'abord grand hôtel, puis dans les années 1950 magasin de chaussures Bata et librairie. Un des bâtiments emblématiques du quartier européen."
            },
            {
                lat: -21.4435, lng: 47.0835,
                title: "Circuit Automobile",
                text: "Les courses de voitures légères et bolides sur les circuits vers Singère et Ambalapaiso Ambony. Trois éditions principales : 1955, 1956, 1957. Sous la houlette de l'Automobile Club de Madagascar."
            },
            {
                lat: -21.4400, lng: 47.0880,
                title: "Ampasambazaha",
                text: "Quartier de l'école des Sœurs Saint Joseph. Frappé par le cyclone de 1953 : le pont fut submergé, des caïmans se promenaient dessus, il y avait 50 cm d'eau partout. On ne pouvait pas passer en voiture, on ne pouvait aller nulle part."
            },
            {
                lat: -21.4426, lng: 47.0858,
                title: "Le Tribunal",
                text: "Perché sur sa butte, face à la Trano Pokolona. Rasé au profit de la Mairie (Lapan'ny Tanàna). Bâtiment emblématique de l'époque coloniale."
            },
            {
                lat: -21.4409, lng: 47.0853,
                title: "La Pharmacie Batailler",
                text: "À côté de la Mairie, la pharmacie de M. Batailler servait toute la communauté européenne et malgache de Fianarantsoa."
            },
            {
                lat: -21.4411, lng: 47.0871,
                title: "La Petite Maison (ère Gallieni)",
                text: "Première habitation des Jacta à Fianarantsoa dès 1930, datant de l'époque Gallieni. Située juste en dessous de la future Villa Isaha, en face du collège René Cassin. Elle appartenait à M. Moutel du Transud. C'est là que le frère aîné de Jacqueline est né en 1933. La maison est encore debout aujourd'hui."
            },
            {
                lat: -21.4413, lng: 47.0858,
                title: "École Européenne / CEG",
                text: "L'école européenne, réservée aux enfants européens, était située à côté de la vieille poste et du garage Citroën. Derrière se trouvait la Maison de l'Agriculture, et sur le côté, le Trésor. Mme Cheikh en était la directrice. L'amie norvégienne de Jacqueline, Sylvie, y était aussi scolarisée. L'école est devenue plus tard le CEG."
            },
            {
                lat: -21.4421, lng: 47.0847,
                title: "Cinéma Rex et Excelsior",
                text: "Fianarantsoa comptait deux cinémas : le Rex et l'Excelsior. L'Excelsior est devenu le Rex d'aujourd'hui, et l'ancien Rex a été démoli. Ils se trouvaient dans le quartier européen, près du tribunal."
            },
            {
                lat: -21.4423, lng: 47.0843,
                title: "Établissement Fiervé",
                text: "Entreprise privée faisant le riz, le vin, le transport, l'import-export. Le bâtiment, situé en face de la Chaudière, rejoint Ambalapaiso Ambony. Il existe encore aujourd'hui — c'est devenu un centre médical avec un jardin intérieur."
            },
            {
                lat: -21.4417, lng: 47.0842,
                title: "Poupouce Golf (famille Oida)",
                text: "Le Poupouce Golf, propriété de la famille Oida, se trouvait près de la Chaudière en Ambalapaiso Ambony. C'était un lieu de loisirs pour la communauté européenne de Fianarantsoa."
            },
            {
                lat: -21.4432, lng: 47.0862,
                title: "Transports Moutel / Transud",
                text: "Le Transud, fondé par M. Moutel, exploitait les bus de ville et la ligne Fianarantsoa–Tananarive. C'est lui qui était aussi propriétaire de la petite maison des Jacta sur l'avenue Lyautey. Vendu ensuite à Saunier Poisson, puis à l'Amsaic-Martin. Le bâtiment date de l'époque Gallieni."
            },
            {
                lat: -21.4440, lng: 47.0870,
                title: "Château de Vohipeno",
                text: "Le château de Vohipeno, construit par l'avocat Francisca Ravouna, est un véritable château qui existe encore aujourd'hui. Sa famille est descendante de la royauté Betsileo. On dirait un conte de fées, mais il est bien réel."
            }
        ];

        lieux.forEach(lieu => {
            const marker = L.marker([lieu.lat, lieu.lng], {
                icon: lieu.star ? starIcon : goldIcon
            }).addTo(map);

            marker.on('click', () => {
                const infoPanel = document.getElementById('map-info');
                document.getElementById('map-info-title').textContent = lieu.title;
                document.getElementById('map-info-text').textContent = lieu.text;
                document.getElementById('map-info-image').innerHTML = '';
                infoPanel.classList.add('active');
            });

            marker.bindTooltip(lieu.title, {
                direction: 'top',
                offset: [0, -8],
                className: 'map-tooltip'
            });
        });

        // Close info panel
        document.querySelector('.map-info-close').addEventListener('click', () => {
            document.getElementById('map-info').classList.remove('active');
        });
    }

    // =====================
    // GALERIE PHOTOS
    // =====================
    const photos = [
        // La Villa et Avenue Lyautey
        { src: "../Hafa koa/1046 LE PICARDY.jpg", title: "Le Picardy", desc: "L'hôtel emblématique de Fianarantsoa", category: "batiments" },
        { src: "../Hafa koa/1055 VU DE LA GARE 1930.jpg", title: "Vue de la Gare — 1930", desc: "La gare de Fianarantsoa dans les années 1930", category: "batiments" },
        { src: "../Photo Madagascar/Villa ISAHA 1950.jpg", title: "Villa Isaha — 1950", desc: "La villa familiale des Jacta, avenue Lyautey", category: "villa" },
        { src: "../Photo Madagascar/2immeuble Scacco 42.jpg", title: "Immeuble Scacco — 1942", desc: "Construit face à la Villa Jacta", category: "batiments" },
        { src: "../Photo Madagascar/jardin les Franjipanier de MmJacta 42.jpg", title: "Le jardin de Mme Jacta", desc: "Les frangipaniers du jardin créé par Cécile Cocteau", category: "villa" },
        { src: "../Photo Madagascar/lapetite villa des annee 30.jpg", title: "La petite villa des années 30", desc: "Première habitation de la famille Jacta avenue Lyautey", category: "villa" },
        { src: "../Photo Madagascar/piscine fianar - Copie1960.png", title: "La Piscine — 1960", desc: "Agrandissement de la piscine inaugurée en 1960", category: "vie" },
        { src: "../Hafa koa/1076 INOGURATION DE L AGRADISSEMENT DE LA PISCINE 1960.jpg", title: "Inauguration piscine — 1960", desc: "L'inauguration de l'agrandissement de la piscine", category: "evenements" },

        // Les Courses Automobiles
        { src: "../Photos/02-Courses-Automobiles/course-poseurs-voiture-46.jpg", title: "Voiture n°46 — Poseurs", desc: "Deux hommes posant devant la Dauphine n°46 avec les montagnes", category: "courses" },
        { src: "../Photos/02-Courses-Automobiles/course-voiture-8-route.jpg", title: "Voiture n°8 en course", desc: "Voiture de course n°8 sur la route", category: "courses" },
        { src: "../Photos/02-Courses-Automobiles/reception-danse-betsileo-bus.jpg", title: "Réception — Danse", desc: "Scène de danse lors d'une réception après les courses", category: "courses" },
        { src: "../Photos/02-Courses-Automobiles/course-homme-voiture-46-coupe.jpg", title: "Voiture n°46 — Coupe", desc: "Un homme pose avec la coupe et la Dauphine n°46", category: "courses" },
        { src: "../Hafa koa/7e rallye de mada 1957 50511 (2).jpg", title: "7ème Rallye de Madagascar — 1957", desc: "Le grand rallye automobile de l'île", category: "courses" },
        { src: "../Hafa koa/RALLYE CONSOMATION 1959 FIANAT RANOMAFANO MR LAIR ET COP.jpg", title: "Rallye Consommation — 1959", desc: "Fianarantsoa–Ranomafana. M. Lair et Cop au départ.", category: "courses" },
        { src: "../Vaovao/2° edition des courses 1954 depard voitures tourismes.jpg", title: "Courses — Départ tourisme 1954", desc: "Le départ des voitures tourisme lors de la 2ème édition", category: "courses" },
        { src: "../Vaovao/course Fianar 57.jpg", title: "Course Fianarantsoa — 1957", desc: "La 3ème édition des courses de vitesse", category: "courses" },
        { src: "../SARY/liste des concurrants.jpg", title: "Liste des concurrents", desc: "Programme officiel des courses automobiles", category: "courses" },
        { src: "../SARY/programme course 1957.jpg", title: "Programme — 1957", desc: "Le programme officiel de la course de 1957", category: "courses" },

        // Événements
        { src: "../Photo Madagascar/general de GAULLE 1953.jpg", title: "Général de Gaulle — 1953", desc: "Visite du Général de Gaulle à Fianarantsoa", category: "evenements" },
        { src: "../Photos/04-Evenements/cyclone-1953-rue-inondee.jpg", title: "Cyclone 1953 — Rue inondée", desc: "Les rues d'Ampasambazaha submergées lors du cyclone", category: "evenements" },
        { src: "../Photos/04-Evenements/cyclone-1953-passant-inondation.jpg", title: "Cyclone 1953 — Passant", desc: "Un passant dans les eaux d'inondation", category: "evenements" },
        { src: "../Photos/04-Evenements/cyclone-1953-place-inondee.jpg", title: "Cyclone 1953 — Place inondée", desc: "La place principale sous les eaux", category: "evenements" },
        { src: "../Photos/04-Evenements/cyclone-1953-eglise-inondation.jpg", title: "Cyclone 1953 — Église", desc: "L'église et les bâtiments dans l'inondation", category: "evenements" },

        // Bâtiments
        { src: "../Vaovao/Ancienne MAIRIE.jpg", title: "L'ancienne Mairie", desc: "Aujourd'hui disparue — lieu du mariage de Jacqueline en 1956", category: "batiments" },
        { src: "../SARY/Ancienne MAIRIE.jpg", title: "La Mairie — autre vue", desc: "La Mairie de Fianarantsoa à l'époque coloniale", category: "batiments" },
        { src: "../Vaovao/CITE MALAISE.jpg", title: "Cité Malaise", desc: "Les trois grosses maisons construites par M. Malaise dans les années 49-50", category: "batiments" },
        { src: "../SARY/batiment club lyautey 1994.jpg", title: "Club Lyautey — 1994", desc: "Le bâtiment du club dans les années 1990", category: "aujourdhui" },
        { src: "../SARY/1952 garage ISAHA.jpg", title: "Garage Isaha — 1952", desc: "Le garage « Tout pour l'Auto » construit par Albert Jacta", category: "villa" },

        // Vie quotidienne et divers
        { src: "../SARY/danceur bar fete national 1948.jpg", title: "Fête nationale — 1948", desc: "Danseurs au bar lors de la fête nationale", category: "vie" },
        { src: "../Hafa koa/Photo Madagascar 1937.jpg", title: "Madagascar — 1937", desc: "Fianarantsoa dans les années 1930", category: "vie" },

        // Aujourd'hui
        { src: "../20200429_091755.jpg", title: "Fianarantsoa aujourd'hui", desc: "Un bâtiment historique de la ville tel qu'il apparaît aujourd'hui", category: "aujourdhui" },

        // Sous-dossiers Vaovao
        { src: "../Vaovao/ROVA 2012/DSCF4605.jpg", title: "Le Rova — 2012", desc: "Le palais royal de Fianarantsoa", category: "aujourdhui" },
        { src: "../Vaovao/TRANSUD 1940/TRANSUD 1940.jpg", title: "Le Transud — 1940", desc: "Le bâtiment du Transud, dirigé par M. Moutel", category: "batiments" },
        { src: "../Vaovao/MAISON A GALLIENI/SDC11737.JPG", title: "Maison Gallieni", desc: "Construction des années 1878-1900, époque de la conquête", category: "batiments" },
        { src: "../Vaovao/Yannick en compétition 1963/yannick maillot jaune.jpg", title: "Yannick en compétition — 1963", desc: "Yannick en maillot jaune lors d'une compétition cycliste", category: "courses" },
        { src: "../Vaovao/varanga ecole zou gare/ecole zou.JPG", title: "L'école", desc: "Bâtiment scolaire de Fianarantsoa", category: "batiments" },
        { src: "../Vaovao/varanga ecole zou gare/depot gare 12.JPG", title: "La Gare", desc: "Le dépôt de la gare de Fianarantsoa", category: "batiments" },
        { src: "../Vaovao/la gare face dos  innondation 1950  les jardin 1930.jpg", title: "La Gare et les jardins", desc: "La gare de Fianarantsoa et inondation de 1950", category: "evenements" },
        { src: "../Vaovao/les dauphines de Mr saget et cerati.jpg", title: "Les Dauphines", desc: "Les Dauphines de M. Saget et Cerati au départ des courses", category: "courses" },
        { src: "../Vaovao/mercedes de Mr SHEILLER.jpg", title: "Mercedes de M. Sheiller", desc: "Voiture de course de M. Sheiller", category: "courses" },
        { src: "../Vaovao/jardin   Magasin VENOT   immeuble PACHOU.jpg", title: "Magasin Venot & Immeuble Pachou", desc: "Les commerces emblématiques de Fianarantsoa", category: "batiments" },
        { src: "../Vaovao/represantant des commerces de fianar.jpg", title: "Commerces de Fianarantsoa", desc: "Les représentants des commerces de la ville", category: "vie" },
        { src: "../Vaovao/M.M. et GEORGETTE.jpg", title: "M.M. et Georgette", desc: "Portraits de la communauté de Fianarantsoa", category: "vie" },
        { src: "../Vaovao/cloture de la course buvet cristal.jpg", title: "Clôture des courses", desc: "Buvette Cristal lors de la clôture des courses automobiles", category: "courses" },
        { src: "../Vaovao/voiture n°14 mrde tourris porsche super 1300 cm3.jpg", title: "Porsche Super 1300", desc: "Voiture n°14 de M. de Tourris — Porsche Super 1300 cm3", category: "courses" },
        { src: "../Vaovao/depard de la cource 3° catégorie.jpg", title: "Départ 3ème catégorie", desc: "Le départ de la course, 3ème catégorie", category: "courses" },
        { src: "../Vaovao/ROVA 2012/SDC11738.JPG", title: "Le Rova — 2012", desc: "Le palais royal de Fianarantsoa", category: "aujourdhui" },
        { src: "../Vaovao/ROVA 2012/SDC11740.JPG", title: "Le Rova — vue panoramique", desc: "Vue panoramique depuis le Rova", category: "aujourdhui" },

        // Photos supplémentaires Hafa koa - Picardy et Sud Hôtel
        { src: "../Hafa koa/1088 SUD HOTEL TERMINE 1949 50.jpg", title: "Sud Hôtel terminé — 1949-50", desc: "L'hôtel Sud dans sa version achevée", category: "batiments" },
        { src: "../Hafa koa/1093 FASSADE SUD HOTEL 1948.jpg", title: "Façade Sud Hôtel — 1948", desc: "La façade de l'hôtel Sud en 1948", category: "batiments" },
        { src: "../Hafa koa/1099 SECOND ETAGE DU PICARDY 1949.jpg", title: "Picardy 2ème étage — 1949", desc: "Le deuxième étage du Picardy en construction", category: "batiments" },
        { src: "../Hafa koa/1114 SALLE DE RESCEPTION PYCARDY.jpg", title: "Salle de réception Picardy", desc: "La salle de réception où avaient lieu les remises de coupes", category: "batiments" },
        { src: "../Hafa koa/1120 DEBUT DES TRAVAUX PICARDY 1948.jpg", title: "Travaux Picardy — 1948", desc: "Le début des travaux du Picardy", category: "batiments" },
        { src: "../Hafa koa/1143  LE PICARDY TERMINE 1950.jpg", title: "Le Picardy terminé — 1950", desc: "Le Picardy dans sa version finale", category: "batiments" },
        { src: "../Hafa koa/1170 - Copie CINEMA  REX CONSTRUCTION 1930.jpg", title: "Cinéma Rex — 1930", desc: "La construction du cinéma Rex dans les années 1930", category: "batiments" },

        // Bâtiments historiques
        { src: "../Hafa koa/1058 MAISON DE L EPOQUE GALLIENI DEMEURA.jpg", title: "Maison époque Gallieni", desc: "Demeure de l'époque Gallieni, architecture coloniale", category: "batiments" },
        { src: "../Hafa koa/ob_483d65_cercle-francais-2 1930.jpg", title: "Le Cercle Français — 1930", desc: "Le Cercle Français où se retrouvait la communauté européenne", category: "batiments" },
        { src: "../Hafa koa/ob_c3f635_residence TRANOPOKOLOLONA 1900.jpg", title: "Trano Pokolona — 1900", desc: "La Trano Pokolona, cœur de la vie communautaire", category: "batiments" },
        { src: "../Hafa koa/ob_7d4754_la-piscine 1943 FOND MAISON LYAUTEY 1900 ET MUSE.jpg", title: "La Piscine — 1943", desc: "La piscine avec en fond la maison Lyautey de 1900", category: "vie" },
        { src: "../Hafa koa/ob_2b5559_concours-agricole-2 MAISON AGRICULTURE 1920.jpg", title: "Maison de l'Agriculture — 1920", desc: "La maison de l'agriculture lors d'un concours agricole", category: "batiments" },
        { src: "../Hafa koa/ob_3fa96a_champ-de-coursesLAC ANOSY FIANAR 1940.jpg", title: "Lac Anosy — Courses 1940", desc: "Le champ de courses près du lac Anosy", category: "courses" },
        { src: "../Hafa koa/ob_04cc25_avenue-besson.jpg", title: "Avenue Besson", desc: "L'avenue Besson, artère principale de Fianarantsoa", category: "batiments" },

        // Présentations automobiles
        { src: "../Hafa koa/Numérisation_20150928 (2) PRESENTATION AUTO 1952.png", title: "Présentation Auto — 1952", desc: "Les nouvelles collections de voitures avec les élégantes", category: "courses" },
        { src: "../Hafa koa/Numérisation_20151020 (3) PRESENTATION VOITURES 1953.jpg", title: "Présentation Voitures — 1953", desc: "Présentation des voitures neuves à Fianarantsoa", category: "courses" },
        { src: "../Hafa koa/Numérisation_20151020 (5) PRESENTATION 1955.jpg", title: "Présentation — 1955", desc: "Les voitures de 1955 présentées au public", category: "courses" },

        // Courses - détails
        { src: "../Hafa koa/lever drapeau mr jacta50520 (2).jpg", title: "Levée du drapeau — M. Jacta", desc: "Albert Jacta lève le drapeau pour le départ des courses", category: "courses" },
        { src: "../Hafa koa/mme sheiller et depard des voiture tourisme 0150520 (4).jpg", title: "Départ voitures tourisme", desc: "Mme Sheiller et le départ des voitures tourisme", category: "courses" },
        { src: "../Hafa koa/remise des cadeaux a mm sheiller et saulnier c20150520 (6).jpg", title: "Remise des cadeaux", desc: "Remise des prix à Mmes Sheiller et Saulnier", category: "courses" },
        { src: "../Hafa koa/Numérisation_20160308 - Copie REMISE COUPE RALLYE CONSOMATION RANOMAFANA 59.jpg", title: "Remise coupe rallye — 1959", desc: "Remise de la coupe du rallye consommation Ranomafana", category: "courses" },
        { src: "../Hafa koa/presentation automobile 1952 51007 (2).jpg", title: "Présentation automobile — 1952", desc: "Élégance et automobiles à Fianarantsoa", category: "courses" },

        // Vie quotidienne
        { src: "../Hafa koa/1070   PISCINE 1960 .jpg", title: "La Piscine — 1960", desc: "La piscine municipale de Fianarantsoa en 1960", category: "vie" },
        { src: "../Hafa koa/1073point de vue 1965.jpg", title: "Point de vue — 1965", desc: "Vue panoramique sur Fianarantsoa", category: "vie" },
        { src: "../Hafa koa/anosy padokdes cheveaux tribune.jpg", title: "Lac Anosy — Courses de chevaux", desc: "Le paddock et les tribunes des courses de chevaux au lac Anosy", category: "vie" },
        { src: "../Hafa koa/1082 MM MELINE  VAROVERT.jpg", title: "MM. Méline & Varovert", desc: "Personnalités de la communauté de Fianarantsoa", category: "vie" },

        // Portraits et famille
        { src: "../Photo Madagascar/1943 ANNIE SAINTY SUD HOTEL JACQUELINE JACTA GARGE CITROEN.jpg", title: "Jacqueline et Annie Sainty — 1943", desc: "Jacqueline Jacta enfant avec son amie Annie Sainty, fille du professeur Sainty", category: "vie" },
        { src: "../Photo Madagascar/Mr PAPILLON Pycardy 1950.jpg", title: "M. Papillon au Picardy — 1950", desc: "M. Papillon et le personnel du Picardy en 1950", category: "vie" },
        { src: "../Photo Madagascar/1e transformation Sud Hotel.jpg", title: "1ère transformation Sud Hôtel", desc: "Les premières transformations du Sud Hôtel", category: "batiments" },
        { src: "../Photo Madagascar/7è rallye de mada 1957 50511 (2) M JACTA.jpg", title: "7ème Rallye — M. Jacta 1957", desc: "M. Jacta lors du 7ème rallye de Madagascar", category: "courses" },
        { src: "../Photo Madagascar/la 203 en cource et les petits bolides,dans le virage singer0150520 (5).jpg", title: "La 203 en course", desc: "La Peugeot 203 et les petits bolides dans le virage de Singer", category: "courses" },
        { src: "../Photo Madagascar/mercedes de mm saulnier  sheiller 50520 (3).jpg", title: "Mercedes Saulnier & Sheiller", desc: "La Mercedes de Mmes Saulnier et Sheiller", category: "courses" },

        // Photos numérotées intéressantes
        { src: "../Hafa koa/1134  PAPILLON  1952 ENTRE AU PICARDY.jpg", title: "Papillon au Picardy — 1952", desc: "L'entrée du Picardy en 1952", category: "batiments" },
        { src: "../Hafa koa/1137SALLE RESTAURANT  PICARDY.jpg", title: "Restaurant du Picardy", desc: "La salle de restaurant du Picardy", category: "batiments" },
        { src: "../Hafa koa/1117 PROLONGEMENT LA TERASSE SUD HOTEL1944 45.jpg", title: "Terrasse Sud Hôtel — 1944-45", desc: "Le prolongement de la terrasse du Sud Hôtel", category: "batiments" },

        // Courses supplémentaires
        { src: "../Vaovao/course tana 54.jpg", title: "Course Tananarive — 1954", desc: "Course automobile à Tananarive en 1954", category: "courses" },
        { src: "../Vaovao/mR LEROY COURSE 1954.jpg", title: "M. Leroy — Course 1954", desc: "M. Leroy lors de la course de 1954", category: "courses" },
        { src: "../Vaovao/quelques voitures en courses.jpg", title: "Voitures en course", desc: "Quelques voitures lors des courses de Fianarantsoa", category: "courses" },
        { src: "../Vaovao/mr hart tank panhard 850 cm3.jpg", title: "Panhard 850 cm3 — M. Hart", desc: "Le tank Panhard 850 cm3 de M. Hart", category: "courses" }
    ];

    const galerieGrid = document.getElementById('galerie-grid');
    let currentLightboxIndex = 0;

    function renderGalerie(filter = 'all') {
        galerieGrid.innerHTML = '';
        const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);

        filtered.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'galerie-item';
            item.dataset.index = index;
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.title}" loading="lazy" onerror="this.parentElement.style.display='none'">
                <div class="galerie-item-caption">
                    <h4>${photo.title}</h4>
                    <p>${photo.desc}</p>
                </div>
            `;
            item.addEventListener('click', () => openLightbox(photos.indexOf(photo)));
            galerieGrid.appendChild(item);
        });
    }

    renderGalerie();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGalerie(btn.dataset.filter);
        });
    });

    // =====================
    // LIGHTBOX
    // =====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const photo = photos[currentLightboxIndex];
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.title;
        lightboxCaption.textContent = `${photo.title} — ${photo.desc}`;
    }

    function nextPhoto() {
        currentLightboxIndex = (currentLightboxIndex + 1) % photos.length;
        updateLightbox();
    }

    function prevPhoto() {
        currentLightboxIndex = (currentLightboxIndex - 1 + photos.length) % photos.length;
        updateLightbox();
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-next').addEventListener('click', nextPhoto);
    document.querySelector('.lightbox-prev').addEventListener('click', prevPhoto);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });

    // =====================
    // SMOOTH SCROLL
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
