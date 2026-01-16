import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Briefcase, Mic, Frown, Clock, Brain, ChevronLeft, 
  Heart, Sparkles, CloudRain, Flame, 
  Play, Pause, Sun, Mic2, RefreshCcw, Flower2, Volume2, VolumeX
} from 'lucide-react';

// --- Scientific Calming Colors Configuration ---
const THEMES = {
  meeting: { tint: '#6366f1' },
  presentation: { tint: '#14b8a6' },
  anxiety: { tint: '#10b981' },
  upset: { tint: '#a855f7' },
  daily: { tint: '#0ea5e9' },
  voice: { tint: '#f59e0b' },
  stretch: { tint: '#0ea5e9' } 
};

const translations = {
  en: {
    title: "BREATHE", subtitle: "Hey friend, take a breather.", poweredBy: "Powered by Beeple", back: "Back", start: "Start", stop: "Stop", sounds: "Soundscape", dailyInsight: "Today's Mindful Insight", minutes: "min", stretchingTitle: "Mindful Stretching", stretchingDesc: "Physical release for a calm mind.",
    menu: { meeting: "Nervous before a meeting", presentation: "Nervous before a presentation", anxiety: "General anxiety", upset: "Upset after a meeting", daily: "Daily Meditation", voice: "Guided Affirmations (Voice)" },
    voiceSessions: {
      title: "Guided Affirmations", desc: "Close your eyes. Continuous positivity.",
      themes: [
        { title: "Self Worth", text: "I am enough just as I am. I do not need to prove myself to anyone. My worth is not defined by my productivity. I breathe in confidence, and I breathe out doubt. I am capable, I am strong, and I am worthy of good things. Challenges are simply opportunities for me to grow." },
        { title: "Calmness", text: "I am calm and centered. The world around me may be chaotic, but my inner world is peaceful. I release tension from my shoulders, my jaw, and my forehead. Thoughts come and go like clouds, but I remain the blue sky behind them. I choose peace over worry." },
        { title: "Resilience", text: "I have survived 100% of my bad days. I am stronger than I think. This difficulty is temporary. I possess the resources to handle whatever comes my way. I am like water, flowing around obstacles. My courage is louder than my fear." }
      ]
    },
    content: {
      meeting: { title: "Pre-Meeting Calm", desc: "Center yourself.", methods: [{ name: "Box Breathing", text: "Inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4. Repeat this cycle to lower your cortisol levels." }, { name: "Visual Success", text: "Close your eyes. Picture the meeting going perfectly. See yourself smiling, speaking clearly, and being heard." }, { name: "Sip of Water", text: "Take a slow, deliberate sip of water. Feel the cool sensation. It forces a reset of your swallowing reflex and calms nerves." }, { name: "Shoulder Drop", text: "Pull your shoulders up to your ears as tight as you can, then drop them suddenly. Repeat this 3 times to release physical tension." }] },
      presentation: { title: "Stage Ready", desc: "Focus your energy.", methods: [{ name: "Straw Breath", text: "Inhale quickly through your nose, then exhale very slowly through pursed lips, as if you are breathing through a straw." }, { name: "Power Pose", text: "Stand up straight, feet wide, and hands on your hips. Hold this for 2 minutes to boost your confidence and lower stress." }, { name: "Excitement Reframe", text: "Say out loud: 'I am not nervous, I am excited.' This tricks your brain into using that nervous energy positively." }, { name: "Peripheral Vision", text: "Soften your gaze. Without moving your eyes, try to see the walls to your left and right. This enables parasympathetic calm." }] },
      anxiety: { title: "Grounding", desc: "Return to now.", methods: [{ name: "5-4-3-2-1", text: "Find 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste." }, { name: "Body Scan", text: "Start from your toes. Tense them for 5 seconds, then release. Move up slowly to your calves, knees, and eventually your face." }, { name: "Butterfly Hug", text: "Cross your arms over your chest. Tap your alternate shoulders rhythmically. Left, right, left, right, until you feel grounded." }, { name: "Ice Shock", text: "Splash cold water on your face or hold an ice cube in your hand. This shocks the vagus nerve into resetting your system." }] },
      upset: { title: "Cool Down", desc: "Let go.", methods: [{ name: "Shake It Out", text: "Literally shake your hands and legs vigorously for 30 seconds. This helps your body shake off the adrenaline of being upset." }, { name: "Balloon Release", text: "Visualize your anger as a red balloon. Mentally cut the string and watch it float away until it disappears in the sky." }, { name: "Write & Rip", text: "Write down exactly what upset you on a piece of paper, then rip it up into tiny pieces physically or mentally." }, { name: "Walk Away", text: "Physically change your environment. Walk to a window or step outside for a moment. Distance creates mental perspective." }] },
      daily: { title: "Daily Reset", desc: "Daily peace.", methods: [{ name: "Silent Focus", text: "Focus solely on the sensation of air entering and leaving your nostrils. If your mind wanders, gently bring it back." }, { name: "Gratitude Loop", text: "Inhale and think 'I am', Exhale and think 'Grateful'. Think of 3 small things you truly appreciate today." }, { name: "Sound Awareness", text: "Close your eyes. Listen to the furthest sound you can possibly hear. Then, listen to the closest sound." }, { name: "Heart Hand", text: "Place your hand on your heart. Feel the warmth and the steady beat. Connect with your life force and inner peace." }] },
      stretch: { title: "Physical Release", desc: "Relax and follow the guide.", methods: [
        { name: "Neck & Shoulders", text: "Gently drop your chin to your chest. Slowly roll your head to the left shoulder, then back to center, and over to the right shoulder. Keep your breath steady and slow.", id: 'neck' },
        { name: "Seated Twist", text: "Sit tall with your feet flat. Place your right hand on your left knee and your left hand behind you. Exhale as you gently twist your torso to the left side.", id: 'twist' },
        { name: "Chest Opener", text: "Reach your hands behind your back and clasp them together. Squeeze your shoulder blades and lift your heart toward the ceiling. Breathe into the space.", id: 'chest' },
        { name: "Forward Fold", text: "Exhale and lean forward from your hips, letting your upper body hang heavy toward your lap. Relax your neck and let your head dangle.", id: 'fold' }
      ]}
    }
  },
  fr: { subtitle: "Hé l'ami, fais une pause.", poweredBy: "Propulsé par Beeple", back: "Retour", start: "Lancer", stop: "Arrêter", sounds: "Ambiance", dailyInsight: "L'info du jour", minutes: "min", stretchingTitle: "Étirements Conscients", stretchingDesc: "Libération physique pour un esprit calme.", menu: { meeting: "Nerveux avant une réunion", presentation: "Avant une présentation", anxiety: "Anxiété générale", upset: "Contrarié après réunion", daily: "Méditation quotidienne", voice: "Affirmations Guidées" }, voiceSessions: { title: "Affirmations Guidées", desc: "Fermez les yeux. Positivité continue.", themes: [ { title: "Estime de Soi", text: "Je suis assez tel que je suis. Je n'ai besoin de rien prouver à personne. Ma valeur n'est pas définie par ma productivité ou l'opinion des autres. J'inspire la confiance et j'expire le doute. Je suis capable et fort." }, { title: "Calme", text: "Je suis calme et centré. Le monde peut être chaotique, maar mijn innerlijke wereld is vredig. Je relâche la tension de mes épaules, de ma mâchoire et de mon front. Mes pensées passent comme des nuages." }, { title: "Résilience", text: "J'ai survécu à 100% de mes mauvais jours. Je suis plus fort que je ne le pense. Cette difficulté est temporaire. Je possède les ressources pour gérer ce qui arrive. Mon courage est plus fort que ma peur." } ] }, content: { meeting: { title: "Calme Pré-Réunion", desc: "Centrez-vous.", methods: [{ name: "Respiration Carrée", text: "Inspirez pendant 4 secondes, retenez pendant 4, expirez pendant 4, et retenez pendant 4. Répétez ce cycle pour abaisser votre taux de cortisol." }, { name: "Succès Visuel", text: "Fermez les yeux. Visualisez la réunion se déroulant parfaitement. Voyez-vous sourire, parler avec clarté et être entendu." }, { name: "Gorgée d'Eau", text: "Prenez une gorgée d'eau lente et délibérée. Ressentez la fraîcheur. Cela réinitialise votre réflexe de déglutition et calme les nerfs." }, { name: "Relâchement", text: "Montez les épaules vers les oreilles aussi fort que possible, puis relâchez-les brusquement. Répétez 3 fois pour libérer la tension physique." }] }, stretch: { title: "Libération Physique", desc: "Relaxez-vous et suivez le guide.", methods: [ { name: "Cou et Épaules", text: "Laissez doucement tomber votre menton vers votre poitrine. Roulez lentement votre tête vers l'épaule gauche, revenez au centre, puis vers la droite.", id: 'neck' }, { name: "Torsion Assise", text: "Asseyez-vous droit, les pieds à plat. Placez votre main droite sur votre genou gauche et votre main gauche derrière vous. Pivotez doucement le torse.", id: 'twist' }, { name: "Ouverture du Cœur", text: "Joignez vos mains derrière votre dos. Resserrez vos omoplates et levez votre poitrine vers le plafond. Respirez profondément dans cet espace.", id: 'chest' }, { name: "Flexion Avant", text: "Expirez et penchez-vous vers l'avant à partir des hanches. Laissez votre buste pendre lourdement vers votre lap. Relâchez le cou.", id: 'fold' } ]} } },
  nl: { subtitle: "Hé vriend, neem een pauze.", poweredBy: "Beeple", back: "Terug", start: "Start", stop: "Stop", sounds: "Sfeer", dailyInsight: "Inzicht van de Dag", minutes: "min", stretchingTitle: "Mindful Rekken", stretchingDesc: "Fysieke ontspanning voor een kalme geest.", menu: { meeting: "Zenuwachtig voor meeting", presentation: "Voor een presentatie", anxiety: "Algemene angst", upset: "Overstuur na meeting", daily: "Dagelijkse Meditatie", voice: "Geleide Affirmaties" }, voiceSessions: { title: "Geleide Affirmaties", desc: "Sluit je ogen. Continue positiviteit.", themes: [ { title: "Eigenwaarde", text: "Ik ben genoeg zoals ik ben. Ik hoef me aan niemand te bewijzen. Mijn waarde wordt niet bepaald door productiviteit. Ik adem vertrouwen in en twijfel uit. Ik ben sterk en waardevol." }, { title: "Kalmte", text: "Ik ben kalm and gecentreerd. De world is chaotisch, maar mijn innerlijke wereld is vredig. Ik laat de spanning in mijn schouders, kaken en voorhoofd los. Gedachten zijn als wolken." }, { title: "Veerkracht", text: "Ik heb 100% van mijn slechte dagen overleefd. Ik ben sterker dan ik denk. Deze moeilijkheid is tijdelijk. Ik bezit de middelen om alles aan te kunnen wat op mijn pad komt." } ] }, content: { meeting: { title: "Rust voor de Meeting", desc: "Centreer jezelf.", methods: [{ name: "Vierkant Ademhalen", text: "Adem 4 seconden in, houd 4 seconden vast, adem 4 seconden uit, en houd 4 seconden vast. Herhaal dit om je cortisol te verlagen." }, { name: "Visualisatie", text: "Sluit je ogen. Stel je voor dat de vergadering perfect verloopt. Zie jezelf glimlachen, duidelijk spreken og gehoord worden." }, { name: "Slok Water", text: "Neem een langzame, bewuste slok water. Voel de koelte. Dit reset je slikreflex en kalmeert je zenuwstelsel onmiddellijk." }, { name: "Schouder Drop", text: "Trek je schouders zo hoog mogelijk op naar je oren, houd vast, en laat ze dan plotseling vallen. Doe dit 3 keer om spanning los te laten." }] }, stretch: { title: "Fysieke Ontspanning", desc: "Ontspan og volg de gids.", methods: [ { name: "Nek & Schouders", text: "Laat je kin voorzichtig op je borst zakken. Rol je hoofd langzaam naar je linkerschouder, terug naar het midden, og dan naar rechts.", id: 'neck' }, { name: "Zittende Draai", text: "Zit rechtop met je voeten plat op de grond. Plaats je rechterhand op je linkerknie and je linkerhand achter je. Draai je torso rustig.", id: 'twist' }, { name: "Borst Opener", text: "Breng je handen achter je rug og verstrengel je vingers. Trek je schouderbladen naar elkaar toe og til je borst op naar het plafond.", id: 'chest' }, { name: "Vooroverbuiging", text: "Adem uit og buig vanuit je heupen naar voren. Laat je bovenlichaam zwaar hangen naar je schoot. Ontspan je nek volledig.", id: 'fold' } ]} } },
  uk: { subtitle: "Привіт друже, зроби паузу.", poweredBy: "Beeple", back: "Назад", start: "Старт", stop: "Стоп", sounds: "Звуки", dailyInsight: "Порада дня", minutes: "хв", stretchingTitle: "Усвідомлена Розминка", stretchingDesc: "Фізичне розслаблення для спокою розуму.", menu: { meeting: "Хвилювання перед зустріччю", presentation: "Перед презентацією", anxiety: "Загальна тривога", upset: "Розлад після розмови", daily: "Щоденна медитація", voice: "Афірмації" }, voiceSessions: { title: "Афірмації", desc: "Слухайте позитив.", themes: [ { title: "Самоцінність", text: "Я достатній такий, який я є. Мені не потрібно нікому нічого доводити. Моя цінність не визначається моєю продуктивністю. Я вдихаю впевненість і видихаю сумніви." }, { title: "Спокій", text: "Я спокійний і зосереджений. Світ навколо може бути хаотичним, але мій внутрішній світ мирний. Я знімаю напругу з плечей, щелепи та чола. Я в мирі." }, { title: "Стійкість", text: "Я пережив 100% своїх поганих днів. Я сильніший, ніж думаю. Ці труднощі тимчасові. У мене є ресурси, щоб впоратися з усім. Я продовжую рухатися вперед." } ] }, content: { meeting: { title: "Спокій перед зустріччю", desc: "Центруйтеся.", methods: [{ name: "Квадратне дихання", text: "Вдих на 4 секунди, затримка на 4, видих на 4, затримка на 4. Повторюйте цей цикл для зниження рівня кортизолу." }, { name: "Ковток води", text: "Зробіть повільний ковток води. Відчуйте прохолоду. Це заспокоює нервову систему та рефлекси." }] }, stretch: { title: "Фізичне розслаблення", desc: "Розслабтеся та слухайте гіда.", methods: [ { name: "Шия та плечі", text: "Обережно опустіть підборіддя до грудей. Повільно повертайте голову до лівого плеча, потім назад до центру, і до правого плеча.", id: 'neck' }, { name: "Скручування", text: "Сядьte рівно, стопи на підлозі. Покладіть праву руку на ліве коліно, а ліву — за спину. Видихніть і м'яко поверніть тулуб вбік.", id: 'twist' }, { name: "Розкриття грудей", text: "Зчепіть руки за спиною. Зведіть лопатки разом та підніміть серце вгору до стелі. Дихайте глибоко.", id: 'chest' }, { name: "Нахил вперед", text: "На видиху нахиліться вперед від стегон. Дозвольте верхній частині тіла вільно звисати. Розслабте шию.", id: 'fold' } ]} } },
  pt: { subtitle: "Ei amigo, tire um momento.", poweredBy: "Beeple", back: "Voltar", start: "Iniciar", stop: "Parar", sounds: "Sons", dailyInsight: "Insight do Dia", minutes: "min", stretchingTitle: "Alongamento Consciente", stretchingDesc: "Liberação física para uma mente calma.", menu: { meeting: "Nervoso antes de reunião", presentation: "Antes de apresentação", anxiety: "Ansiedade geral", upset: "Chateado após reunião", daily: "Meditação Diária", voice: "Afirmações Guiadas" }, voiceSessions: { title: "Afirmações Guiadas", desc: "Feche os olhos. Positividade contínua.", themes: [ { title: "Valor Próprio", text: "Sou suficiente exatamente como sou. Não preciso provar nada a ninguém. Meu valor não é definido pela minha produtividade. Inspiro confiança e expiro as dúvidas." }, { title: "Calma", text: "Estou calmo e centrado. O mundo pode estar caótico, mas meu interior está em paz. Libero a tensão dos ombros e da mandíbula. Meus pensamentos são como nuvens." }, { title: "Resiliência", text: "Sobrevivi a 100% dos meus dias ruins. Sou mais forte do que penso. Esta dificuldade é temporária. Possuo os recursos para lidar com tudo. Continuo em frente." } ] }, content: { meeting: { title: "Calma Pré-Reunião", desc: "Concentre-se.", methods: [{ name: "Respiração Quadrada", text: "Inspire por 4s, segure 4s, expire 4s, segure 4s. Repita este ciclo para baixar os seus níveis de cortisol rapidamente." }, { name: "Gole de Água", text: "Dê um gole lento e deliberado de água. Sinta o frescor. Isso reseta os seus nervos e acalma o sistema instantaneamente." }] }, stretch: { title: "Liberação Física", desc: "Relaxe e siga o guia.", methods: [ { name: "Pescoço e Ombros", text: "Deixe cair suavemente o queixo no peito. Rode lentamente a cabeça para o ombro esquerdo, volte ao centro e para o direito. Respire fundo.", id: 'neck' }, { name: "Torção Sentada", text: "Sente-se direito with os pés no chão. Coloque a mão direita no joelho esquerdo e a mão esquerda atrás de si. Rode o tronco suavemente.", id: 'twist' }, { name: "Abrir o Peito", text: "Entrelace as manos atrás das costas. Aperte as omoplatas e eleve o coração em direção ao teto. Respire.", id: 'chest' }, { name: "Flexão à Frente", text: "Expire e incline-se para a frente a partir das ancas. Deixe o tronco pender e relaxe completamente o pescoço e a cabeça.", id: 'fold' } ]} } },
  es: { subtitle: "Hola amigo, tómate un respiro.", poweredBy: "Beeple", back: "Atrás", start: "Iniciar", stop: "Parar", sounds: "Sonidos", dailyInsight: "Reflexión del Día", minutes: "min", stretchingTitle: "Estiramiento Consciente", stretchingDesc: "Liberación física para una mente calma.", menu: { meeting: "Nervoso por una reunión", presentation: "Antes de presentar", anxiety: "Ansiedad general", upset: "Molesto tras una reunión", daily: "Meditación Diaria", voice: "Afirmaciones Guiadas" }, voiceSessions: { title: "Afirmaciones Guiadas", desc: "Cierra los ojos. Positividad continua.", themes: [ { title: "Valor Próprio", text: "Soy suficiente tal como soy. No necesito demostrar nada a nadie. Mi valor no depende de mi productividad. Inhalo confianza y exhalo todas mis dudas." }, { title: "Calma", text: "Estoy tranquilo y centrado. El mundo puede ser caótico, pero mi paz interior es constante. Relajo mis hombros, mi mandíbula y mi frente. Soy como el cielo." }, { title: "Resiliencia", text: "He sobrevivido al 100% de mis días malos. Soy más fuerte de lo que creo. Esta dificultad es temporal. Tengo los recursos necesarios para avanzar paso a paso." } ] }, content: { meeting: { title: "Calma Pre-Reunión", desc: "Céntrate.", methods: [{ name: "Respiración Cuadrada", text: "Inhala durante 4 segundos, mantén 4, exhala 4 y mantén 4. Repite este ciclo para reducir tus niveles de cortisol." }, { name: "Sorbos de Agua", text: "Bebe un poco de agua lentamente. Siente el frescor. Esto calma tus nervios y reinicia tu reflejo de relajación." }] }, stretch: { title: "Libération Física", desc: "Relájate y sigue la guía.", methods: [ { name: "Cuello y Hombros", text: "Baja suavemente la barbilla hacia el pecho. Gira la cabeza lentamente hacia el hombro izquierdo, vuelve al centro y hacia el derecho.", id: 'neck' }, { name: "Giro Sentado", text: "Siéntate derecho con los pies planos. Pon la mano derecha en la rodilla izquierda y la otra detrás. Gira el torso suavemente.", id: 'twist' }, { name: "Apertura de Pecho", text: "Cruza las manos por detrás de la espalda. Junta los omóplatos y eleva el pecho hacia el techo. Respira profundamente.", id: 'chest' }, { name: "Flexion Adelante", text: "Exhala e inclínate hacia adelante from the cadera. Deja que el cuerpo cuelgue pesado y relaja completamente el cuello.", id: 'fold' } ]} } },
  cs: { subtitle: "Ahoj příteli, vydechni si.", poweredBy: "Poháněno Beeple", back: "Zpět", start: "Start", stop: "Stop", sounds: "Zvuky", dailyInsight: "Dnešní postřeh", minutes: "min", stretchingTitle: "Všímavé protahování", stretchingDesc: "Fyzické uvolnění pro klidnou mysl.", menu: { meeting: "Nervozita před schůzkou", presentation: "Nervozita před prezentací", anxiety: "Obecná úzkost", upset: "Rozrušení po schůzce", daily: "Denní meditace", voice: "Vedené afirmace" }, voiceSessions: { title: "Vedené afirmace", desc: "Zavřete oči. Buďте pozitivní.", themes: [ { title: "Vlastní hodnota", text: "Jsem dostatečný přesně takový, jaký jsem. Nemusím nikomu nic dokazovat. Moje hodnota není definována mou produktivitou. Nadechuji sebedůvěru a vydechuji pochybnosti. Jsem schopný, silný a hodný dobrých věcí." }, { title: "Klid", text: "Jsem klidný a soustředěný. Svět kolem mě může být chaotický, maar mijn innerlijke wereld is vredig. Uvolňuji napětí z ramen, čelistí a čela. Myšlenky přicházejí a odcházejí jako mraky, ale já zůstávám modrou oblohou za nimi." }, { title: "Odolnost", text: "Přežil jsem sto procent svých špatných dnů. Jsem silnější, než si myslím. Tato obtíž je doчасná. Mám schopnosti zvládnout cokoli, co mi přijde do cesty." } ] }, content: { meeting: { title: "Klid před schůzkou", desc: "Soustřeďte se.", methods: [{ name: "Krabicové dýchání", text: "Nadechujte se 4 sekundy, držte 4, vydechujte 4 a držte 4. Opakujte tento cyklus pro snížení hladiny kortizolu." }, { name: "Lok vody", text: "Pomalu a vědomě se napijte vody. Vnímejte chlad. To vynutí reset polykacího reflexu a uklidní nervy." }] }, stretch: { title: "Fyzické uvolnění", desc: "Relaxujte a sledujte průvodce.", methods: [ { name: "Krk a ramena", text: "Jemně spusťte bradu k hrudníku. Pomalu otočte hlavu k levému rameni, pak zpět do středu a k pravému rameni.", id: 'neck' }, { name: "Torze vsedě", text: "Seďte vzpřímeně s nohama na zemi. Položte pravou ruku na levé koleno a levou ruku za sebe. S výdechem se jemně otočte.", id: 'twist' }, { name: "Otevření hrudníku", text: "Spojte ruce za zády. Stiskněte lopatky a zvedněte srdce ke stropu. Dýchejte do volného prostoru.", id: 'chest' }, { name: "Předklon", text: "S výдеchem se předkloňte z kyčlí a nechte hornі část těla těžce viset. Uvolněte krk a nechte hlavu volně.", id: 'fold' } ]} } }
};

const facts = [
  "Deep breathing triggers the vagus nerve, lowering heart rate instantly.",
  "Looking at the color blue can naturally induce a state of calm.",
  "Regular meditation changes the brain's neuroplasticity in 8 weeks.",
  "Your breath is the only part of the autonomic nervous system you can control consciously.",
  "Stretching for just 5 minutes increases blood flow and calms the nervous system."
];

// --- Audio Guidance Manager (Advanced Ukrainian & Multi-lang Fix) ---
const langMap = {
  en: 'en-GB', fr: 'fr-FR', nl: 'nl-NL', uk: 'uk-UA', pt: 'pt-PT', es: 'es-ES', cs: 'cs-CZ'
};

const getBestVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = (langMap[lang] || 'en-GB').split('-')[0].toLowerCase();
  
  // Normalize search for language matches
  const langVoices = voices.filter(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang.startsWith(targetPrefix);
  });

  if (langVoices.length === 0) return null;

  // 1. High-priority native Ukrainian names (to avoid American fallback)
  if (lang === 'uk') {
    const ukNativeNames = ["Lesya", "Lado", "Mariya", "Yuliya", "Polina", "Українська", "Ukrainian"];
    const nativeMatch = langVoices.find(v => ukNativeNames.some(name => v.name.includes(name)));
    if (nativeMatch) return nativeMatch;
  }

  // 2. High quality "Premium" check for all languages
  const premiumKeywords = ["natural", "neural", "google", "premium", "enhanced", "siri", "online"];
  let premiumVoice = langVoices.find(v => premiumKeywords.some(k => v.name.toLowerCase().includes(k)));
  
  return premiumVoice || langVoices[0];
};

const speakText = (text, lang, rate = 0.8) => {
  window.speechSynthesis.cancel();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // CRITICAL: Set lang before choosing voice to force the correct accent engine
  const targetLang = langMap[lang] || 'en-GB';
  utterance.lang = targetLang;

  const voice = getBestVoice(lang);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang; 
  }
  
  utterance.rate = rate;
  utterance.pitch = 1.0; 
  window.speechSynthesis.speak(utterance);
  return utterance;
};

// --- SVG Illustration Components ---
const PoseIllustration = ({ poseId, active }) => {
  const color = "text-sky-500";
  switch(poseId) {
    case 'neck': return (
      <svg viewBox="0 0 100 100" className={`w-48 h-48 transition-all duration-700 ${active ? 'scale-110' : 'scale-100'}`}>
        <path d="M50 90 L50 70 M30 75 Q50 65 70 75" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-700" />
        <circle cx="50" cy="35" r="10" fill="currentColor" className="text-white" />
        <path d="M40 35 Q50 20 60 35" stroke="currentColor" strokeWidth="3" fill="none" className={color} />
        {active && <circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="1" fill="none" className={`${color} animate-ping opacity-30`} />}
      </svg>
    );
    case 'twist': return (
      <svg viewBox="0 0 100 100" className={`w-48 h-48 transition-all duration-700 ${active ? 'scale-110' : 'scale-100'}`}>
        <path d="M50 90 L50 40 M30 50 Q50 35 70 50" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-700" />
        <circle cx="50" cy="25" r="10" fill="currentColor" className="text-white" />
        <path d="M35 50 Q50 65 65 50" stroke="currentColor" strokeWidth="3" fill="none" className={color} />
        <path d="M30 40 A20 20 0 0 1 70 40" stroke="currentColor" strokeWidth="2" fill="none" className={`${color} opacity-40`} strokeDasharray="4 2" />
      </svg>
    );
    case 'chest': return (
      <svg viewBox="0 0 100 100" className={`w-48 h-48 transition-all duration-700 ${active ? 'scale-110' : 'scale-100'}`}>
        <path d="M50 90 L50 40 M20 50 Q50 40 80 50" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-700" />
        <circle cx="50" cy="25" r="10" fill="currentColor" className="text-white" />
        <path d="M50 45 Q80 30 85 50 M50 45 Q20 30 15 50" stroke="currentColor" strokeWidth="3" fill="none" className={color} />
      </svg>
    );
    case 'fold': return (
      <svg viewBox="0 0 100 100" className={`w-48 h-48 transition-all duration-700 ${active ? 'scale-110' : 'scale-100'}`}>
        <path d="M20 90 L40 90 L60 50 Q70 40 55 30" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-700" />
        <circle cx="50" cy="25" r="10" fill="currentColor" className="text-white" />
        <path d="M45 35 L20 70" stroke="currentColor" strokeWidth="3" fill="none" className={color} />
      </svg>
    );
    default: return null;
  }
};

// --- Audio Context Helper ---
let globalAudioCtx = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return globalAudioCtx;
};

const playBell = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 2);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 2.5);
};

const playNoise = (type) => {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === 'suspended') ctx.resume();
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'white') data[i] = white;
    else if (type === 'pink') data[i] = 0.99886 * (i > 0 ? data[i-1] : 0) + white * 0.0555179;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer; noise.loop = true;
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0.001;
  const filter = ctx.createBiquadFilter();
  filter.type = type === 'white' ? "lowpass" : "highpass";
  filter.frequency.value = type === 'white' ? 800 : 500;
  noise.connect(filter); filter.connect(gainNode); gainNode.connect(ctx.destination);
  noise.start();
  gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 1);
  return { source: noise, gain: gainNode, ctx };
};

const playDrone = () => {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === 'suspended') ctx.resume();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = 'triangle'; osc2.type = 'triangle'; 
  osc1.frequency.setValueAtTime(110, ctx.currentTime);
  osc2.frequency.setValueAtTime(112, ctx.currentTime); 
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2); 
  osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
  osc1.start(); osc2.start();
  return { source: { stop: () => { try { osc1.stop(); osc2.stop(); } catch(e){} }}, gain, ctx };
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [activeMethodIndex, setActiveMethodIndex] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [currentFact, setCurrentFact] = useState(facts[0]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [activeSound, setActiveSound] = useState(null);
  const soundNodeRef = useRef(null);
  const timerRef = useRef(null);

  const t = translations[lang] || translations['en'];
  const activeTheme = activeScenario ? THEMES[activeScenario] : null;

  // --- Voice Sync & Multi-Language Support ---
  useEffect(() => {
    const loadVoices = () => { window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    if (isMuted) {
      window.speechSynthesis.cancel();
      return;
    }

    if (activeScenario === 'stretch' && isBreathing) {
      const text = t.content?.stretch?.methods[activeMethodIndex]?.text;
      if (text) speakText(text, lang, 0.85);
    } 
    else if (activeScenario === 'voice' && isPlayingVoice) {
      const text = t.voiceSessions?.themes[currentThemeIndex]?.text;
      if (text) {
        const utt = speakText(text, lang, 0.8);
        if (utt) utt.onend = () => setIsPlayingVoice(false);
      }
    } 
    else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if (activeScenario !== 'voice' || !isPlayingVoice) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeMethodIndex, isBreathing, isPlayingVoice, activeScenario, lang, isMuted, currentThemeIndex, t]);

  // --- Timer Logic ---
  useEffect(() => {
    if (isBreathing && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsBreathing(false);
            playBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isBreathing, timeLeft]);

  const toggleSound = (type) => {
    if (activeSound === type) {
       if (soundNodeRef.current) {
         soundNodeRef.current.gain.gain.exponentialRampToValueAtTime(0.001, soundNodeRef.current.ctx.currentTime + 0.5);
         setTimeout(() => { try { soundNodeRef.current.source.stop(); } catch(e){} }, 600);
       }
       setActiveSound(null);
    } else {
       if (soundNodeRef.current?.source) try { soundNodeRef.current.source.stop(); } catch (e) {}
       soundNodeRef.current = type === 'drone' ? playDrone() : playNoise(type);
       setActiveSound(type);
    }
  };

  const handleBack = () => {
    setIsBreathing(false);
    setIsPlayingVoice(false);
    setActiveScenario(null);
    setActiveMethodIndex(0);
    if (activeSound) toggleSound(activeSound);
    window.speechSynthesis.cancel();
    setTimeLeft(0);
    setSelectedDuration(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-slate-200 font-sans selection:bg-sky-500/30 overflow-x-hidden flex flex-col">
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col flex-1 h-full p-6">
        <header className="flex justify-between items-center mb-8 shrink-0">
          {activeScenario ? (
             <button onClick={handleBack} className="flex items-center text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm border border-white/5">
               <ChevronLeft className="w-4 h-4 mr-1" />
               <span className="font-medium text-xs tracking-wide uppercase">{t.back}</span>
             </button>
          ) : (
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">BREATHE</h1>
            </div>
          )}
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-700">
              {lang.toUpperCase()}
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-12 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50 py-1 flex flex-col min-w-[60px]">
                {Object.keys(translations).map(l => (
                  <button key={l} onClick={() => { setLang(l); setLangMenuOpen(false); }} className={`px-4 py-2 text-xs hover:bg-slate-700 ${lang === l ? 'text-sky-400' : 'text-slate-400'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col h-full">
          {!activeScenario ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white block mb-1">{t.subtitle}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'meeting', icon: Briefcase, color: 'from-blue-600 to-blue-400' },
                  { id: 'presentation', icon: Mic, color: 'from-indigo-600 to-indigo-400' },
                  { id: 'anxiety', icon: Wind, color: 'from-teal-600 to-teal-400' },
                  { id: 'upset', icon: Frown, color: 'from-rose-600 to-rose-400' },
                  { id: 'daily', icon: Clock, color: 'from-violet-600 to-violet-400' },
                  { id: 'voice', icon: Mic2, color: 'from-amber-500 to-orange-400' }, 
                ].map((item) => (
                  <button key={item.id} onClick={() => setActiveScenario(item.id)} className="relative group bg-slate-800/60 hover:bg-slate-700 transition-all p-4 rounded-2xl border border-white/5 shadow-lg flex flex-col items-center justify-center gap-4 h-36 text-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <span className="font-medium text-slate-200 text-sm leading-snug">{t.menu?.[item.id] || item.id}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center mb-8">
                <button onClick={() => setActiveScenario('stretch')} className="w-full max-w-sm bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-sky-500/20 rounded-3xl p-6 hover:bg-slate-800/80 transition-all group flex flex-col items-center justify-center text-center shadow-2xl">
                  <div className="p-4 rounded-full bg-sky-500 text-white shadow-lg group-hover:scale-110 transition-transform mb-4">
                    <Flower2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{t.stretchingTitle}</h3>
                    <p className="text-sm text-slate-400">{t.stretchingDesc}</p>
                  </div>
                </button>
              </div>
              <div className="mt-auto bg-slate-900/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden shadow-xl">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sky-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                       <Sparkles className="w-3 h-3" /> {t.dailyInsight}
                    </h3>
                    <button onClick={() => setCurrentFact(facts[Math.floor(Math.random() * facts.length)])} className="text-slate-600 hover:text-sky-400"><RefreshCcw className="w-4 h-4" /></button>
                 </div>
                 <p className="text-sm text-slate-400 italic leading-relaxed">"{currentFact}"</p>
              </div>
            </div>
          ) : activeScenario === 'voice' ? (
            <div className="flex flex-col items-center h-full animate-in slide-in-from-right duration-300">
               <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mb-6 animate-pulse">
                  <Mic2 className="w-8 h-8 text-amber-500" />
               </div>
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.voiceSessions?.title}</h2>
               <p className="text-slate-400 text-center text-sm mb-8 px-4">{t.voiceSessions?.desc}</p>
               <div className="w-full space-y-3 mb-8">
                 {t.voiceSessions?.themes.map((theme, idx) => (
                   <button key={idx} onClick={() => { setCurrentThemeIndex(idx); setIsPlayingVoice(false); window.speechSynthesis.cancel(); }} className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${currentThemeIndex === idx ? 'bg-amber-900/20 border-amber-500/50 text-amber-100' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                     <span className="font-medium">{theme.title}</span>
                     {currentThemeIndex === idx && <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
                   </button>
                 ))}
               </div>
               <div className="mt-auto w-full">
                  <button onClick={() => setIsPlayingVoice(!isPlayingVoice)} className="w-full py-4 rounded-2xl font-bold tracking-widest uppercase shadow-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center justify-center gap-3 transition-transform">
                    {isPlayingVoice ? <><Pause className="w-5 h-5"/> {t.stop}</> : <><Play className="w-4 h-4"/> {t.start}</>}
                  </button>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center h-full animate-in zoom-in-95 duration-300">
              <div className="w-full flex justify-between items-center mb-4 bg-white/5 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                 <div className="flex items-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">{t.sounds}</span>
                    <button onClick={() => setIsMuted(!isMuted)} className="ml-4 text-slate-500 hover:text-sky-400 transition-colors">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                 </div>
                 <div className="flex gap-1">
                    {[{ id: 'white', icon: CloudRain }, { id: 'drone', icon: Sun }, { id: 'pink', icon: Flame }].map((s) => (
                        <button key={s.id} onClick={() => toggleSound(s.id)} className={`p-2 rounded-lg transition-all ${activeSound === s.id ? 'bg-sky-500/20 text-sky-400' : 'text-slate-600'}`}>
                           <s.icon className="w-4 h-4" />
                        </button>
                    ))}
                 </div>
              </div>
              <div className="text-center mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{t.content?.[activeScenario]?.title || ""}</h2>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">{t.content?.[activeScenario]?.desc || ""}</p>
              </div>
              {activeScenario === 'stretch' ? (
                <PoseIllustration poseId={t.content?.stretch?.methods[activeMethodIndex]?.id} active={isBreathing} />
              ) : (
                <div className="relative flex items-center justify-center h-56 w-56 md:h-72 md:w-72 mt-4 mb-4">
                  <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 transition-all duration-1000 ${isBreathing ? 'scale-125' : 'scale-75'}`} style={{ backgroundColor: isBreathing ? activeTheme?.tint || '#0ea5e9' : 'rgba(71, 85, 105, 0.2)' }}></div>
                  <div className={`absolute inset-0 border rounded-full transition-all duration-[4000ms] ease-in-out ${isBreathing ? 'scale-150 opacity-0' : 'scale-90 opacity-100'}`} style={{ borderColor: isBreathing ? activeTheme?.tint : 'rgba(255,255,255,0.1)' }}></div>
                  <div className={`h-32 w-32 md:h-40 md:w-40 bg-slate-900 border border-slate-700 rounded-full shadow-2xl flex items-center justify-center z-10 transition-transform duration-[4000ms] ease-in-out ${isBreathing ? 'scale-110' : 'scale-100'}`}>
                    <Wind className="w-10 h-10 transition-colors duration-1000" style={{ color: isBreathing ? activeTheme?.tint : '#64748b' }} />
                  </div>
                </div>
              )}
              {(isBreathing || selectedDuration) && (
                <div className="text-5xl font-light text-slate-200 font-mono mb-6 tracking-widest">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              )}
              <div className="w-full overflow-x-auto pb-4 flex gap-3 snap-x scrollbar-hide">
                 {(t.content?.[activeScenario]?.methods || []).map((method, idx) => (
                    <button key={idx} onClick={() => { setActiveMethodIndex(idx); setIsBreathing(false); }} className={`snap-center shrink-0 w-40 p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-28 ${activeMethodIndex === idx ? 'bg-slate-800 border-sky-500/50 shadow-xl' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                        <span className={`text-xs font-bold uppercase ${activeMethodIndex === idx ? 'text-sky-400' : 'text-slate-600'}`}>0{idx + 1}</span>
                        <span className={`text-xs font-medium leading-tight ${activeMethodIndex === idx ? 'text-white' : ''}`}>{method.name}</span>
                    </button>
                 ))}
              </div>
              <div className="flex-1 w-full mb-4">
                <div className="h-full p-6 bg-slate-900/60 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
                  <h4 className="text-sky-500 text-xs font-bold uppercase tracking-widest mb-3">{(t.content?.[activeScenario]?.methods[activeMethodIndex] || {}).name}</h4>
                  <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
                    {(t.content?.[activeScenario]?.methods[activeMethodIndex] || {}).text}
                  </p>
                </div>
              </div>
              <div className="w-full bg-[#0a0a0c]/80 pt-2">
                {!isBreathing && (
                    <div className="flex justify-center gap-3 mb-4">
                        {[1, 3, 5].map((min) => (
                            <button key={min} onClick={() => { setTimeLeft(min * 60); setSelectedDuration(min * 60); }} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedDuration === min * 60 ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                {min} {t.minutes}
                            </button>
                        ))}
                    </div>
                )}
                {(selectedDuration !== null || isBreathing) && (
                    <button onClick={() => { if (!isBreathing && timeLeft <= 0) setTimeLeft(selectedDuration); setIsBreathing(!isBreathing); }} className={`w-full py-4 rounded-3xl font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 ${isBreathing ? 'bg-rose-900/20 text-rose-400 border border-rose-900/50' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sky-900/20'}`}>
                        {isBreathing ? <><Pause className="w-4 h-4"/> {t.stop}</> : <><Play className="w-4 h-4"/> {t.start}</>}
                    </button>
                )}
              </div>
            </div>
          )}
        </main>
        <footer className="mt-4 text-center py-2 shrink-0 border-t border-white/5">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
            {t.poweredBy} <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </footer>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;