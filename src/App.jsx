import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Briefcase, Mic, Frown, Clock, Brain, ChevronLeft, 
  Heart, Sparkles, CloudRain, Flame, 
  Play, Pause, Sun, Mic2, RefreshCcw
} from 'lucide-react';

// --- Data & Translations ---
const translations = {
  en: {
    title: "BREATHE",
    subtitle: "Hey friend, take a breather.",
    poweredBy: "Powered by Beeple",
    back: "Back",
    start: "Start",
    stop: "Stop",
    sounds: "Soundscape",
    dailyInsight: "Today's Mindful Insight",
    minutes: "min",
    menu: {
      meeting: "Nervous before a meeting",
      presentation: "Nervous before a presentation",
      anxiety: "General anxiety",
      upset: "Upset after a meeting",
      daily: "Daily Meditation",
      voice: "Guided Affirmations (Voice)",
    },
    voiceSessions: {
      title: "Guided Affirmations",
      desc: "Close your eyes. 3 minutes of continuous positivity.",
      themes: [
        { 
          title: "Self Worth", 
          text: "I am enough just as I am. I do not need to prove myself to anyone. My worth is not defined by my productivity or the opinions of others. I breathe in confidence, and I breathe out doubt. I am capable, I am strong, and I am worthy of good things. Challenges are simply opportunities for me to grow. I trust my intuition. I am at peace with my journey. I celebrate my small wins. I forgive myself for my mistakes, knowing they are part of learning. I am loved. I am safe. I am grounded." 
        },
        { 
          title: "Calmness", 
          text: "I am calm and centered. The world around me may be chaotic, but my inner world is peaceful. I release tension from my shoulders, my jaw, and my forehead. I am like a mountain, strong and unshakeable. Thoughts come and go like clouds, but I remain the blue sky behind them. I choose peace over worry. I am present in this moment. Nowhere to go, nothing to do, just being here. Breathing in peace, breathing out stress. All is well." 
        },
        { 
          title: "Resilience", 
          text: "I have survived 100% of my bad days. I am stronger than I think. This difficulty is temporary. I possess the resources to handle whatever comes my way. I adapt with ease. I am like water, flowing around obstacles, not crashing into them. My courage is louder than my fear. I trust in my ability to figure things out. I am resilient. I am persistent. I keep moving forward, one step at a time." 
        }
      ]
    },
    content: {
      meeting: { 
        title: "Pre-Meeting Calm", 
        desc: "Center yourself before the team gathers.",
        methods: [
          { name: "Box Breathing", text: "Inhale (4s) - Hold (4s) - Exhale (4s) - Hold (4s). Repeat to lower cortisol." },
          { name: "Visual Success", text: "Close your eyes. Picture the meeting going perfectly. See yourself smiling and speaking clearly." },
          { name: "Sip of Water", text: "Take a slow sip of water. Feel the cool sensation. It forces a reset of your swallowing reflex and calms nerves." },
          { name: "Shoulder Drop", text: "Pull your shoulders up to your ears tight, then drop them suddenly. Repeat 3 times." }
        ]
      },
      presentation: { 
        title: "Stage Ready", 
        desc: "Channel that energy into focus.",
        methods: [
          { name: "Straw Breath", text: "Inhale quickly through nose, exhale very slowly through pursed lips like a straw." },
          { name: "Power Pose", text: "Stand up, feet wide, hands on hips. Hold for 2 minutes to boost testosterone." },
          { name: "Excitement Reframe", text: "Say out loud: 'I am not nervous, I am excited.' Trick your brain into using the energy positively." },
          { name: "Peripheral Vision", text: "Soften your gaze. Try to see the walls to your left and right without moving your eyes. This enables parasympathetic calm." }
        ]
      },
      anxiety: { 
        title: "Grounding", 
        desc: "Return to the present moment.",
        methods: [
          { name: "5-4-3-2-1", text: "Find 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste." },
          { name: "Body Scan", text: "Start from toes. Tense for 5s, release. Move up to calves, knees, etc." },
          { name: "Butterfly Hug", text: "Cross arms over chest. Tap alternate shoulders rhythmically. Left, right, left, right." },
          { name: "Ice Shock", text: "Splash cold water on your face or hold an ice cube. It shocks the vagus nerve into resetting." }
        ]
      },
      upset: { 
        title: "Cool Down", 
        desc: "Let go of the tension.",
        methods: [
          { name: "Shake It Out", text: "Literally shake your hands and legs vigorously for 30 seconds. Shake off the adrenaline." },
          { name: "Balloon Release", text: "Visualize the anger as a red balloon. Cut the string. Watch it float away." },
          { name: "Write & Rip", text: "Write down what upset you on a piece of paper (or pretend to). Then rip it up mentally or physically." },
          { name: "Walk Away", text: "Physically change your environment. Walk to a window or outside. Distance creates perspective." }
        ]
      },
      daily: { 
        title: "Daily Reset", 
        desc: "Your daily peace.",
        methods: [
          { name: "Silent Focus", text: "Focus solely on the sensation of air entering and leaving your nostrils." },
          { name: "Gratitude Loop", text: "Inhale 'I am', Exhale 'Grateful'. Think of 3 things you appreciate today." },
          { name: "Sound Awareness", text: "Close eyes. Listen to the furthest sound you can hear. Then the closest. Don't judge, just listen." },
          { name: "Heart Hand", text: "Place hand on heart. Feel the warmth and the beat. Connect with your life force." }
        ]
      }
    }
  },
  fr: {
    title: "RESPIRE",
    subtitle: "Hé l'ami, une pause ?",
    poweredBy: "Propulsé par Beeple",
    back: "Retour",
    start: "Lancer",
    stop: "Arrêter",
    sounds: "Ambiance",
    dailyInsight: "L'info du jour",
    minutes: "min",
    menu: {
      meeting: "Nerveux avant réunion",
      presentation: "Avant une présentation",
      anxiety: "Anxiété générale",
      upset: "Contrarié",
      daily: "Méditation quotidienne",
      voice: "Affirmations Guidées (Voix)",
    },
    voiceSessions: {
      title: "Affirmations",
      desc: "Écoutez 3 minutes de positivité.",
      themes: [
        { title: "Estime de soi", text: "Je suis assez comme je suis. Je n'ai besoin de prouver ma valeur à personne. Ma valeur ne dépend pas de ma productivité. J'inspire la confiance et j'expire le doute. Je suis capable, je suis fort et je mérite de bonnes choses. Je fais confiance à mon intuition. Je suis en paix avec mon parcours. Je célèbre mes petites victoires. Je suis aimé. Je suis en sécurité." }, 
        { title: "Calme", text: "Je suis calme et centré. Le monde autour de moi peut être chaotique, mais mon monde intérieur est paisible. Je relâche la tension de mes épaules, de ma mâchoire et de mon front. Je suis comme une montagne, fort et inébranlable. Les pensées vont et viennent comme des nuages, mais je reste le ciel bleu derrière elles. Je choisis la paix plutôt que l'inquiétude. Tout va bien." }, 
        { title: "Résilience", text: "J'ai survécu à 100 % de mes mauvais jours. Je suis plus fort que je ne le pense. Cette difficulté est temporaire. Je possède les ressources nécessaires pour gérer tout ce qui arrive. Je m'adapte avec facilité. Je suis comme l'eau, je contourne les obstacles. Mon courage est plus fort que ma peur. Je continue d'avancer, un pas à la fois." }
      ]
    },
    content: {
      meeting: { title: "Calme Pré-Réunion", desc: "Centrez-vous.", methods: [{ name: "Respiration Carrée", text: "Inspirez (4s) - Retenez (4s) - Expirez (4s)." }, { name: "Succès Visuel", text: "Imaginez que tout se passe bien." }, { name: "Gorgée d'eau", text: "Buvez lentement pour calmer le réflexe." }, { name: "Épaules", text: "Montez les épaules, relâchez brusquement." }] },
      presentation: { title: "Prêt", desc: "Canalisez l'énergie.", methods: [{ name: "Paille", text: "Expirez lentement comme dans une paille." }, { name: "Posture", text: "Mains sur les hanches, tenez 2 minutes." }, { name: "Excitation", text: "Dites: 'Je suis excité', pas nerveux." }, { name: "Vision Périphérique", text: "Regardez les murs sans bouger les yeux." }] },
      anxiety: { title: "Ancrage", desc: "Le présent.", methods: [{ name: "5-4-3-2-1", text: "5 vues, 4 sensations, 3 sons..." }, { name: "Scan Corporel", text: "Contractez et relâchez les muscles." }, { name: "Câlin Papillon", text: "Croisez les bras, tapotez les épaules." }, { name: "Choc Froid", text: "Eau froide sur le visage." }] },
      upset: { title: "Apaisement", desc: "Relâchez.", methods: [{ name: "Secouez-vous", text: "Secouez les mains vigoureusement." }, { name: "Ballon", text: "Imaginez la colère s'envoler." }, { name: "Écrire & Jeter", text: "Écrivez le problème, jetez le papier." }, { name: "Marcher", text: "Changez de pièce." }] },
      daily: { title: "Reset", desc: "Paix.", methods: [{ name: "Focus", text: "Concentrez-vous sur l'air." }, { name: "Gratitude", text: "Inspirez 'Je suis', Expirez 'Reconnaissant'." }, { name: "Sons", text: "Écoutez les sons lointains." }, { name: "Cœur", text: "Main sur le cœur." }] }
    }
  },
  nl: { 
    title: "ADEM", subtitle: "Hé vriend, pauze?", poweredBy: "Beeple", back: "Terug", start: "Start", stop: "Stop", sounds: "Sfeer", dailyInsight: "Inzicht", minutes: "min",
    menu: { meeting: "Vergadering", presentation: "Presentatie", anxiety: "Angst", upset: "Overstuur", daily: "Dagelijks", voice: "Geleide Affirmaties" }, 
    voiceSessions: { 
        title: "Affirmaties", desc: "Luister naar positiviteit.", 
        themes: [
            {title: "Eigenwaarde", text: "Ik ben genoeg zoals ik ben. Ik hoef me aan niemand te bewijzen. Mijn waarde wordt niet bepaald door mijn productiviteit. Ik adem vertrouwen in en twijfel uit. Ik ben in staat, ik ben sterk en ik verdien goede dingen. Uitdagingen zijn kansen om te groeien. Ik vertrouw op mijn intuïtie. Ik heb vrede met mijn reis. Ik vier mijn kleine overwinningen. Ik ben geliefd. Ik ben veilig."}, 
            {title: "Kalmte", text: "Ik ben kalm en gecentreerd. De wereld om mij heen mag dan chaotisch zijn, mijn binnenwereld is vredig. Ik laat de spanning los van mijn schouders, mijn kaak en mijn voorhoofd. Ik ben als een berg, sterk en onwankelbaar. Gedachten komen en gaan als wolken, maar ik blijf de blauwe lucht erachter. Ik kies voor vrede boven zorgen. Ik ben hier en nu. Alles is goed."}, 
            {title: "Veerkracht", text: "Ik heb 100% van mijn slechte dagen overleefd. Ik ben sterker dan ik denk. Deze moeilijkheid is tijdelijk. Ik bezit de middelen om alles aan te kunnen wat op mijn pad komt. Ik pas me gemakkelijk aan. Ik ben als water, ik stroom om obstakels heen. Mijn moed is luider dan mijn angst. Ik blijf vooruitgaan, stap voor stap."}
        ] 
    }, 
    content: { meeting: { title: "Rust", desc: "Centreer.", methods: [{ name: "Vierkant", text: "Adem in 4s, vast 4s..." }, { name: "Visualisatie", text: "Zie succes." }, { name: "Water", text: "Drink water." }, { name: "Schouders", text: "Schouders laag." }] }, presentation: { title: "Klaar", desc: "Focus.", methods: [{ name: "Rietje", text: "Adem uit als door rietje." }, { name: "Power Pose", text: "Handen in zij." }, { name: "Spanning", text: "Ik ben enthousiast." }, { name: "Visie", text: "Kijk breed." }] }, anxiety: { title: "Aarding", desc: "Hier zijn.", methods: [{ name: "5-4-3-2-1", text: "5 dingen zien..." }, { name: "Body Scan", text: "Span aan, laat los." }, { name: "Vlinder", text: "Tik op schouders." }, { name: "Kou", text: "Koud water." }] }, upset: { title: "Afkoelen", desc: "Loslaten.", methods: [{ name: "Schudden", text: "Schud alles los." }, { name: "Ballon", text: "Laat ballon gaan." }, { name: "Schrijf", text: "Schrijf en verscheur." }, { name: "Loop", text: "Ga weg." }] }, daily: { title: "Reset", desc: "Vrede.", methods: [{ name: "Focus", text: "Adem focus." }, { name: "Dank", text: "Wees dankbaar." }, { name: "Geluid", text: "Luister." }, { name: "Hart", text: "Hand op hart." }] } } 
  },
  uk: { 
    title: "ДИХАЙ", subtitle: "Привіт друже.", poweredBy: "Beeple", back: "Назад", start: "Почати", stop: "Стоп", sounds: "Звуки", dailyInsight: "Інсайт", minutes: "хв",
    menu: { meeting: "Зустріч", presentation: "Презентація", anxiety: "Тривога", upset: "Розлад", daily: "Щоденно", voice: "Афірмації" }, 
    voiceSessions: { 
        title: "Афірмації", desc: "Слухайте позитив.", 
        themes: [
            {title: "Самоцінність", text: "Я достатній такий, який я є. Мені не потрібно нікому нічого доводити. Моя цінність не визначається моєю продуктивністю. Я вдихаю впевненість і видихаю сумніви. Я здібний, я сильний і я гідний хороших речей. Виклики - це просто можливості для мого зростання. Я довіряю своїй інтуїції. Я в мирі зі своїм шляхом. Я святкую свої маленькі перемоги. Мене люблять. Я в безпеці."}, 
            {title: "Спокій", text: "Я спокійний і зосереджений. Світ навколо мене може бути хаотичним, але мій внутрішній світ мирний. Я знімаю напругу з плечей, щелепи та чола. Я як гора, сильна і непохитна. Думки приходять і йдуть, як хмари, але я залишаюся блакитним небом за ними. Я обираю мир, а не хвилювання. Я присутній у цьому моменті. Все добре."}, 
            {title: "Стійкість", text: "Я пережив 100% своїх поганих днів. Я сильніший, ніж думаю. Ці труднощі тимчасові. У мене є ресурси, щоб впоратися з усім, що трапляється на моєму шляху. Я легко адаптуюся. Я як вода, течу навколо перешкод. Моя мужність гучніша за мій страх. Я продовжую рухатися вперед, крок за кроком."}
        ] 
    }, 
    content: { meeting: { title: "Спокій", desc: "Центр.", methods: [{ name: "Квадрат", text: "Вдих 4с, затримка 4с..." }, { name: "Візуалізація", text: "Уявіть успіх." }, { name: "Вода", text: "Пийте воду." }, { name: "Плечі", text: "Опустіть плечі." }] }, presentation: { title: "Готовність", desc: "Фокус.", methods: [{ name: "Соломинка", text: "Видих через рот." }, { name: "Поза сили", text: "Руки на стегна." }, { name: "Радість", text: "Я радий." }, { name: "Зір", text: "Дивіться широко." }] }, anxiety: { title: "Заземлення", desc: "Тут.", methods: [{ name: "5-4-3-2-1", text: "5 речей..." }, { name: "Тіло", text: "Напружте, розслабте." }, { name: "Метелик", text: "Стукайте по плечах." }, { name: "Холод", text: "Холодна вода." }] }, upset: { title: "Охолодження", desc: "Відпусти.", methods: [{ name: "Трясти", text: "Потрусіть руками." }, { name: "Кулька", text: "Кулька летить." }, { name: "Писати", text: "Напишіть і порвіть." }, { name: "Йти", text: "Ідіть геть." }] }, daily: { title: "Щоденно", desc: "Спокій.", methods: [{ name: "Фокус", text: "Дихання." }, { name: "Вдячність", text: "Дякую." }, { name: "Звуки", text: "Слухайте." }, { name: "Серце", text: "Рука на серці." }] } } 
  },
  pt: { 
    title: "RESPIRE", subtitle: "Ei amigo.", poweredBy: "Beeple", back: "Voltar", start: "Iniciar", stop: "Parar", sounds: "Sons", dailyInsight: "Insight", minutes: "min",
    menu: { meeting: "Reunião", presentation: "Apresentação", anxiety: "Ansiedade", upset: "Chateado", daily: "Diário", voice: "Afirmações" }, 
    voiceSessions: { 
        title: "Afirmações", desc: "Ouça.", 
        themes: [
            {title: "Valor", text: "Sou suficiente exatamente como sou. Não preciso provar nada a ninguém. Meu valor não é definido pela minha produtividade. Inspiro confiança e expiro dúvidas. Sou capaz, sou forte e mereço coisas boas. Desafios são oportunidades de crescimento. Confio na minha intuição. Estou em paz com minha jornada. Celebro minhas pequenas vitórias. Sou amado. Estou seguro."}, 
            {title: "Calma", text: "Estou calmo e centrado. O mundo ao meu redor pode ser caótico, mas meu mundo interior é pacífico. Libero a tensão dos meus ombros, do meu maxilar e da minha testa. Sou como uma montanha, forte e inabalável. Pensamentos vêm e vão como nuvens, mas continuo sendo o céu azul por trás deles. Escolho a paz em vez da preocupação. Tudo está bem."}, 
            {title: "Força", text: "Sobrevivi a 100% dos meus dias ruins. Sou mais forte do que penso. Essa dificuldade é temporária. Possuo os recursos para lidar com o que vier. Adapto-me com facilidade. Sou como a água, fluo ao redor dos obstáculos. Minha coragem é mais alta que meu medo. Continuo seguindo em frente, um passo de cada vez."}
        ] 
    }, 
    content: { meeting: { title: "Calma", desc: "Concentre-se.", methods: [{ name: "Quadrada", text: "Inspire 4s..." }, { name: "Visualização", text: "Sucesso." }, { name: "Água", text: "Beba água." }, { name: "Ombros", text: "Solte os ombros." }] }, presentation: { title: "Pronto", desc: "Foco.", methods: [{ name: "Palhinha", text: "Expire lento." }, { name: "Poder", text: "Mãos na cintura." }, { name: "Ânimo", text: "Estou animado." }, { name: "Visão", text: "Olhar difuso." }] }, anxiety: { title: "Aterrar", desc: "Agora.", methods: [{ name: "5-4-3-2-1", text: "5 coisas..." }, { name: "Corpo", text: "Tensione e solte." }, { name: "Borboleta", text: "Toque ombros." }, { name: "Gelo", text: "Água fria." }] }, upset: { title: "Calma", desc: "Solte.", methods: [{ name: "Sacudir", text: "Sacuda mãos." }, { name: "Balão", text: "Balão voa." }, { name: "Escrever", text: "Escreva e rasgue." }, { name: "Andar", text: "Saia." }] }, daily: { title: "Reset", desc: "Paz.", methods: [{ name: "Foco", text: "Respire." }, { name: "Gratidão", text: "Sou grato." }, { name: "Sons", text: "Ouça." }, { name: "Coração", text: "Mão no peito." }] } } 
  },
  es: { 
    title: "RESPIRA", subtitle: "Oye amigo.", poweredBy: "Beeple", back: "Atrás", start: "Iniciar", stop: "Parar", sounds: "Sonidos", dailyInsight: "Insight", minutes: "min",
    menu: { meeting: "Reunión", presentation: "Presentación", anxiety: "Ansiedad", upset: "Molesto", daily: "Diario", voice: "Afirmaciones" }, 
    voiceSessions: { 
        title: "Afirmaciones", desc: "Escucha.", 
        themes: [
            {title: "Valor", text: "Soy suficiente tal como soy. No necesito probar nada a nadie. Mi valor no se define por mi productividad. Inspiro confianza y expiro dudas. Soy capaz, soy fuerte y merezco cosas buenas. Los desafíos son oportunidades para crecer. Confío en mi intuición. Estoy en paz con mi camino. Celebro mis pequeñas victorias. Soy amado. Estoy a salvo."}, 
            {title: "Calma", text: "Estoy tranquilo y centrado. El mundo a mi alrededor puede ser caótico, pero mi mundo interior es pacífico. Libero la tensión de mis hombros, mi mandíbula y mi frente. Soy como una montaña, fuerte e inquebrantable. Los pensamientos van y vienen como nubes, pero yo sigo siendo el cielo azul detrás de ellos. Elijo la paz sobre la preocupación. Todo está bien."}, 
            {title: "Fuerza", text: "He sobrevivido al 100% de mis días malos. Soy más fuerte de lo que creo. Esta dificultad es temporal. Poseo los recursos para manejar lo que venga. Me adapto con facilidad. Soy como el agua, fluyo alrededor de los obstáculos. Mi valentía es más fuerte que mi miedo. Sigo adelante, paso a paso."}
        ] 
    }, 
    content: { meeting: { title: "Calma", desc: "Céntrate.", methods: [{ name: "Cuadrada", text: "Inhala 4s..." }, { name: "Visualización", text: "Éxito." }, { name: "Agua", text: "Bebe agua." }, { name: "Hombros", text: "Baja hombros." }] }, presentation: { title: "Listo", desc: "Enfoque.", methods: [{ name: "Pajita", text: "Exhala lento." }, { name: "Poder", text: "Manos cintura." }, { name: "Ánimo", text: "Estoy animado." }, { name: "Visión", text: "Mirada suave." }] }, anxiety: { title: "Conexión", desc: "Ahora.", methods: [{ name: "5-4-3-2-1", text: "5 cosas..." }, { name: "Cuerpo", text: "Tensa y suelta." }, { name: "Mariposa", text: "Toca hombros." }, { name: "Hielo", text: "Agua fría." }] }, upset: { title: "Enfriar", desc: "Suelta.", methods: [{ name: "Sacudir", text: "Sacude manos." }, { name: "Globo", text: "Globo vuela." }, { name: "Escribir", text: "Escribe y rompe." }, { name: "Caminar", text: "Vete." }] }, daily: { title: "Reinicio", desc: "Paz.", methods: [{ name: "Foco", text: "Respira." }, { name: "Gratitud", text: "Soy grato." }, { name: "Sonidos", text: "Escucha." }, { name: "Corazón", text: "Mano pecho." }] } } 
  }
};

const facts = [
  "Deep breathing triggers the vagus nerve, lowering heart rate instantly.",
  "Looking at the color blue can naturally induce a state of calm.",
  "Regular meditation changes the brain's neuroplasticity in 8 weeks.",
  "Writing down worries before a meeting frees up working memory.",
  "A 20-minute nap can improve alertness and performance without grogginess.",
  "Physical clutter often leads to mental clutter. Try organizing one small space.",
  "Your breath is the only part of the autonomic nervous system you can control consciously.",
  "Spending 20 minutes in nature significantly lowers stress hormones.",
  "Humming stimulates the vagus nerve and creates internal calming vibrations."
];

// --- Audio Helper (Lazy Loaded & Robust) ---
let globalAudioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return globalAudioCtx;
};

// --- SOFT PING SOUND (Bell) ---
const playBell = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Bell-like Sine wave
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
  
  // Envelope for "ping" sound (instant attack, slow decay)
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05); // Attack
  gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 2); // Decay

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 2.5);
};

const playNoise = (type) => {
  const ctx = getAudioContext();
  if (!ctx) return null;
  
  // Ensure we are running
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'white') { // Rain (White)
      data[i] = white; 
    } else if (type === 'pink') { // Fire (Approximation)
      const b0 = 0.99886 * (i > 0 ? data[i-1] : 0) + white * 0.0555179;
      data[i] = b0; 
    }
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  
  // Gain Node for Volume
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0.001; // Start silent
  
  // Filter for tone
  const biquadFilter = ctx.createBiquadFilter();
  if (type === 'white') {
     biquadFilter.type = "lowpass";
     biquadFilter.frequency.value = 800;
  } else if (type === 'pink') { 
     biquadFilter.type = "highpass";
     biquadFilter.frequency.value = 500;
  }

  noise.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(ctx.destination);
  noise.start();
  
  // Fade in
  gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 1);

  return { source: noise, gain: gainNode, ctx };
};

const playDrone = () => {
    const ctx = getAudioContext();
    if (!ctx) return null;
    
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'triangle';
    osc2.type = 'triangle'; 
    
    osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
    osc2.frequency.setValueAtTime(112, ctx.currentTime); 

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2); 
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    
    return { 
        source: { stop: () => { 
             try { osc1.stop(); osc2.stop(); } catch(e){} 
        }}, 
        gain: gain, 
        ctx 
    };
};

// --- Components ---

const BreathingCircle = ({ active }) => {
  return (
    <div className="relative flex items-center justify-center h-56 w-56 md:h-72 md:w-72 mt-4 mb-4">
      <div className={`absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-20 ${active ? 'animate-pulse' : ''}`}></div>
      {/* Wave Layers */}
      <div className={`absolute inset-0 border border-cyan-500/30 rounded-full transition-all duration-[4000ms] ease-in-out ${active ? 'scale-150 opacity-0' : 'scale-90 opacity-100'}`}></div>
      <div className={`absolute inset-4 border border-purple-500/30 rounded-full transition-all duration-[4000ms] delay-300 ease-in-out ${active ? 'scale-125 opacity-0' : 'scale-90 opacity-100'}`}></div>
      <div className={`absolute inset-8 border border-blue-500/30 rounded-full transition-all duration-[4000ms] delay-700 ease-in-out ${active ? 'scale-125 opacity-0' : 'scale-90 opacity-100'}`}></div>
      
      {/* Core */}
      <div className={`h-32 w-32 md:h-40 md:w-40 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-full shadow-2xl shadow-cyan-900/50 flex items-center justify-center z-10 transition-transform duration-[4000ms] ease-in-out ${active ? 'scale-110' : 'scale-100'}`}>
        <Wind className={`w-10 h-10 transition-colors duration-1000 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
      </div>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const [activeScenario, setActiveScenario] = useState(null);
  const [activeMethodIndex, setActiveMethodIndex] = useState(0);
  
  const [isBreathing, setIsBreathing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [selectedDuration, setSelectedDuration] = useState(null); // null, 60, 180, 300

  const [currentFact, setCurrentFact] = useState(facts[0]);

  // Voice Section State
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Sound State
  const [activeSound, setActiveSound] = useState(null); // 'rain', 'drone'
  const soundNodeRef = useRef(null);

  const timerRef = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    shuffleFact();
    
    const handleVoicesChanged = () => {
        setVoicesLoaded(true);
    };
    
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
        if (window.speechSynthesis.getVoices().length > 0) {
            setVoicesLoaded(true);
        }
    }
    
    return () => {
        if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null;
    }
  }, []);

  const shuffleFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setCurrentFact(randomFact);
  };

  const langCodes = { en: "EN", fr: "FR", nl: "NL", uk: "UK", pt: "PT", es: "ES" };

  const scenarios = [
    { id: 'meeting', icon: Briefcase, color: 'from-blue-600 to-blue-400' },
    { id: 'presentation', icon: Mic, color: 'from-indigo-600 to-indigo-400' },
    { id: 'anxiety', icon: Wind, color: 'from-teal-600 to-teal-400' },
    { id: 'upset', icon: Frown, color: 'from-rose-600 to-rose-400' },
    { id: 'daily', icon: Clock, color: 'from-violet-600 to-violet-400' },
    { id: 'voice', icon: Mic2, color: 'from-amber-500 to-orange-400' }, 
  ];

  // --- Sound Logic ---
  const toggleSound = (type) => {
    if (activeSound === type) {
       // Stop
       if (soundNodeRef.current && soundNodeRef.current.gain) {
         soundNodeRef.current.gain.gain.exponentialRampToValueAtTime(0.001, soundNodeRef.current.ctx.currentTime + 0.5);
         setTimeout(() => {
             try { soundNodeRef.current.source.stop(); } catch(e){}
         }, 600);
       }
       setActiveSound(null);
    } else {
       if (soundNodeRef.current && soundNodeRef.current.source) {
         try { soundNodeRef.current.source.stop(); } catch (e) { /* ignore */ }
       }
       
       let node;
       if (type === 'drone') node = playDrone();
       else node = playNoise(type); 

       soundNodeRef.current = node;
       setActiveSound(type);
    }
  };

  // --- Voice Logic (Language Aware) ---
  const toggleVoiceSession = () => {
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
    } else {
      const text = t.voiceSessions.themes[currentThemeIndex].text;
      const longText = `${text} ... ${text} ... ${text}`; 
      
      const utterance = new SpeechSynthesisUtterance(longText);
      utterance.rate = 0.85; 
      utterance.pitch = 1;
      
      const voices = window.speechSynthesis.getVoices();
      
      const langMap = {
        'en': 'en-GB', 
        'fr': 'fr',
        'nl': 'nl',
        'uk': 'uk',
        'pt': 'pt',
        'es': 'es'
      };
      
      const targetLang = langMap[lang] || lang;
      
      let selectedVoice = voices.find(v => v.lang.startsWith(targetLang) && v.name.includes("Google"));
      if (!selectedVoice) {
         selectedVoice = voices.find(v => v.lang.startsWith(targetLang));
      }
      if (!selectedVoice && lang === 'en') {
         selectedVoice = voices.find(v => v.name.includes("Samantha"));
      }

      if (selectedVoice) {
          utterance.voice = selectedVoice;
      }
      
      utterance.onend = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingVoice(true);
    }
  };

  const selectDuration = (minutes) => {
      if (isBreathing) return; // Prevent changing while running
      const seconds = minutes * 60;
      setSelectedDuration(seconds);
      setTimeLeft(seconds);
  };

  const handleStartBreathing = () => {
    if (isBreathing) {
        // User pressed Stop
        setIsBreathing(false);
        clearInterval(timerRef.current);
        // Do not reset timeLeft here so they can see where they stopped, 
        // or optionally reset it. Let's keep it to allow Resume or manual reset.
    } else {
        // User pressed Start
        if (timeLeft <= 0 && selectedDuration) {
             setTimeLeft(selectedDuration); // Reset if finished
        }
        setIsBreathing(true);
        
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Timer finished
                    clearInterval(timerRef.current);
                    setIsBreathing(false);
                    playBell(); // Play Ping Sound
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
  };

  const handleBack = () => {
      setActiveScenario(null);
      if (activeSound) {
          toggleSound(activeSound);
      }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (soundNodeRef.current && soundNodeRef.current.source) {
        try { soundNodeRef.current.source.stop(); } catch(e) {}
      }
    };
  }, []);

  // Reset state when scenario changes
  useEffect(() => {
    setIsBreathing(false);
    clearInterval(timerRef.current);
    setSelectedDuration(null); // No timer selected by default
    setTimeLeft(0);
    setActiveMethodIndex(0);
    setIsPlayingVoice(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, [activeScenario]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden flex flex-col">
      
      {/* Modern Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col flex-1 h-full p-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 shrink-0">
          {activeScenario ? (
             <button 
               onClick={handleBack}
               className="flex items-center text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm border border-white/5"
             >
               <ChevronLeft className="w-4 h-4 mr-1" />
               <span className="font-medium text-xs tracking-wide uppercase">{t.back}</span>
             </button>
          ) : (
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{t.title}</h1>
            </div>
          )}

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 active:scale-95 flex items-center justify-center text-xs font-bold tracking-wide"
            >
              {langCodes[lang]}
            </button>
            
            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)}></div>
                <div className="absolute right-0 top-12 w-20 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50 py-1 grid grid-cols-1 gap-1">
                  {Object.entries(langCodes).map(([code, label]) => (
                    <button 
                      key={code} 
                      onClick={() => { setLang(code); setLangMenuOpen(false); }}
                      className={`w-full text-center py-2 text-xs font-medium hover:bg-slate-700 transition-colors ${lang === code ? 'text-cyan-400 bg-slate-700/50' : 'text-slate-400'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col">
          {!activeScenario ? (
            // --- Dashboard Grid View ---
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-light text-slate-300 leading-tight">
                  <span className="font-semibold text-white block mb-1">
                    {t.subtitle}
                  </span>
                </h2>
              </div>

              {/* UPDATED Grid Layout: Bigger Icons, Centered Text */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {scenarios.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveScenario(item.id)}
                    className="relative group bg-slate-800 hover:bg-slate-700/80 transition-transform duration-200 transform hover:-translate-y-1 hover:scale-[1.02] p-4 rounded-2xl border border-white/5 shadow-lg flex flex-col items-center justify-center gap-4 h-36 overflow-hidden text-center"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <span className="font-medium text-slate-200 text-sm leading-snug">{t.menu[item.id]}</span>
                    
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
                  </button>
                ))}
              </div>

              {/* Daily Insight Card with Shuffle */}
              <div className="mt-auto bg-gradient-to-br from-[#0e0f11]/60 to-[#121215]/60 rounded-2xl p-6 border border-white/5 relative overflow-hidden group shadow-[0_10px_30px_rgba(2,6,23,0.5)]">
                 <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Brain className="w-20 h-20" />
                 </div>
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> {t.dailyInsight}
                        </h3>
                        <button onClick={shuffleFact} className="text-slate-600 hover:text-cyan-400 transition-colors">
                            <RefreshCcw className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-sm text-slate-400 italic leading-relaxed animate-in fade-in duration-500" key={currentFact}>"{currentFact}"</p>
                 </div>
              </div>
            </div>
          ) : activeScenario === 'voice' ? (
            
            // --- VOICE SESSION VIEW ---
            <div className="flex flex-col items-center h-full animate-in slide-in-from-right duration-300">
               <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mb-6 animate-pulse">
                  <Mic2 className="w-8 h-8 text-amber-500" />
               </div>
               
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.voiceSessions.title}</h2>
               <p className="text-slate-400 text-center text-sm mb-8 px-4">{t.voiceSessions.desc}</p>

               {/* Theme Selection */}
               <div className="w-full space-y-3 mb-8">
                 {t.voiceSessions.themes.map((theme, idx) => (
                   <button
                     key={idx}
                     onClick={() => { setCurrentThemeIndex(idx); setIsPlayingVoice(false); window.speechSynthesis.cancel(); }}
                     className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${currentThemeIndex === idx ? 'bg-amber-900/20 border-amber-500/50 text-amber-100' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                   >
                     <span className="font-medium">{theme.title}</span>
                     {currentThemeIndex === idx && <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
                   </button>
                 ))}
               </div>

               <div className="mt-auto w-full">
                  <button
                    onClick={toggleVoiceSession}
                    className="w-full py-4 md:py-5 rounded-2xl font-bold text-sm md:text-base tracking-widest uppercase shadow-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                  >
                    {isPlayingVoice ? <><Pause className="w-5 h-5"/> {t.stop}</> : <><Play className="w-5 h-5"/> {t.start}</>}
                  </button>
               </div>
            </div>

          ) : (
            
            // --- STANDARD SCENARIO VIEW ---
            <div className="flex flex-col items-center h-full animate-in zoom-in-95 duration-300 pb-4 overflow-y-auto scrollbar-hide">
              
              {/* Sound Controls */}
              <div className="w-full flex justify-between items-center mb-4 bg-[#0f1113] p-3 rounded-2xl border border-white/5 shadow-sm">
                 <span className="text-[10px] uppercase tracking-widest text-slate-500 ml-2 font-bold">{t.sounds}</span>
                 <div className="flex gap-1">
                   {[
                        { id: 'white', icon: CloudRain, label: 'Rain' }, 
                        { id: 'drone', icon: Sun, label: 'Om' },
                        { id: 'pink', icon: Flame, label: 'Fire' }
                    ].map((s) => (
                        <button 
                            key={s.id}
                            onClick={() => toggleSound(s.id)}
                            className={`p-2 rounded-lg transition-all relative ${activeSound === s.id ? 'bg-cyan-900/50 text-cyan-400' : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'}`}
                            title={s.label}
                        >
                            <s.icon className="w-4 h-4" />
                            {activeSound === s.id && <span className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>}
                        </button>
                    ))}
                 </div>
              </div>

              {/* Title Section */}
              <div className="text-center mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{t.content[activeScenario].title}</h2>
                  <p className="text-slate-400 text-sm">{t.content[activeScenario].desc}</p>
              </div>

              {/* Visualization */}
              <BreathingCircle active={isBreathing} />
              
              {/* Timer Display (Shows if active OR if duration selected) */}
              {(isBreathing || selectedDuration) && (
                <div className="text-5xl font-light text-slate-200 font-mono mb-6 tracking-wider animate-in fade-in">
                  {formatTime(timeLeft)}
                </div>
              )}

              {/* Methods Scrollable Horizontal List */}
              <div className="w-full overflow-x-auto pb-4 mb-2 flex gap-3 snap-x scrollbar-hide">
                 {t.content[activeScenario].methods.map((method, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveMethodIndex(idx); setIsBreathing(false); }}
                        className={`snap-center shrink-0 w-40 p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-28 ${activeMethodIndex === idx ? 'bg-slate-800 border-cyan-500/50 shadow-[0_15px_30px_rgba(6,182,212,0.06)]' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}
                    >
                        <span className={`text-xs font-bold uppercase ${activeMethodIndex === idx ? 'text-cyan-400' : 'text-slate-600'}`}>0{idx + 1}</span>
                        <span className={`text-xs font-medium leading-tight ${activeMethodIndex === idx ? 'text-white' : 'text-slate-500'}`}>{method.name}</span>
                    </button>
                 ))}
              </div>

              {/* Instruction Card */}
              <div className="flex-1 w-full mb-4">
                <div className="h-full p-6 bg-[#131316] rounded-2xl border border-white/5 w-full text-center relative overflow-hidden group flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-3 relative z-10">{t.content[activeScenario].methods[activeMethodIndex].name}</h4>
                  <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed relative z-10">
                    {t.content[activeScenario].methods[activeMethodIndex].text}
                  </p>
                </div>
              </div>

              {/* TIMER OPTIONS & ACTION BUTTON */}
              <div className="w-full bg-[#0a0a0c]/80 backdrop-blur-md pt-2">
                
                {/* Timer Duration Selector (Only show if not currently breathing) */}
                {!isBreathing && (
                    <div className="flex justify-center gap-3 mb-4">
                        {[1, 3, 5].map((min) => (
                            <button
                                key={min}
                                onClick={() => selectDuration(min)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                                    selectedDuration === min * 60 
                                    ? 'bg-cyan-500 text-white border-cyan-500' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                                }`}
                            >
                                {min} {t.minutes}
                            </button>
                        ))}
                    </div>
                )}

                {/* Action Button (Hidden if no duration selected) */}
                {(selectedDuration !== null || isBreathing) && (
                    <button
                        onClick={handleStartBreathing}
                        className={`w-full py-4 md:py-5 rounded-3xl font-bold text-sm md:text-base tracking-widest uppercase shadow-2xl hover:scale-[1.01] transition-all duration-300 transform flex items-center justify-center gap-2 ${
                        isBreathing 
                            ? 'bg-rose-900/20 text-rose-400 border border-rose-900/50' 
                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-500/50'
                        }`}
                    >
                        {isBreathing ? <><Pause className="w-4 h-4"/> {t.stop}</> : <><Play className="w-4 h-4"/> {t.start}</>}
                    </button>
                )}
              </div>

            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-4 text-center py-2 border-t border-white/5 shrink-0">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
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
